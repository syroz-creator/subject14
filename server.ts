import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { defaultSiteContent, type SiteContent } from "./src/site-content.ts";
import {
  REVIEW_MESSAGE_MAX_LENGTH,
  REVIEW_MESSAGE_MIN_LENGTH,
  REVIEW_NAME_MAX_LENGTH,
  REVIEW_STORAGE_LIMIT,
  BLOCKED_REVIEW_WARNING,
  findBlockedReviewWord,
  type PlayerReview,
} from "./src/reviews.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3001);
const SESSION_COOKIE = "subject14_operator_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const SITE_CONTENT_PATH = path.resolve(__dirname, "data/site-content.json");
const LEGACY_REVIEWS_PATH = path.resolve(__dirname, "data/reviews.json");
const REVIEWS_DATABASE_PATH = path.resolve(
  __dirname,
  process.env.REVIEWS_DATABASE_PATH || "data/reviews.sqlite"
);

app.use(express.json());

type SessionPayload = {
  username: string;
  gmail: string;
  exp: number;
};

type ReviewRow = {
  id: string;
  rating: number;
  name: string;
  message: string;
  created_at: string;
};

let reviewsDatabase: DatabaseSync | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function normalizeUsername(value: string): string {
  return value.replace(/\s+/g, "").toLowerCase();
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizePasscode(value: string): string {
  return value.trim();
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", requiredEnv("OPERATOR_SESSION_SECRET"))
    .update(value)
    .digest("base64url");
}

function serializeSession(payload: SessionPayload): string {
  const raw = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${raw}.${sign(raw)}`;
}

function parseSession(token?: string): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [raw, signature] = token.split(".");
  if (!raw || !signature) {
    return null;
  }

  if (!safeEqual(sign(raw), signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as SessionPayload;
    if (payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function getCookie(req: express.Request, name: string): string | undefined {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return undefined;
  }

  const parts = cookieHeader.split(";").map((part) => part.trim());
  const cookie = parts.find((part) => part.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined;
}

function setSessionCookie(res: express.Response, payload: SessionPayload) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(serializeSession(payload))}; Max-Age=${SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; SameSite=Strict;${secure}`
  );
}

function clearSessionCookie(res: express.Response) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict;${secure}`
  );
}

function readSiteContent(): SiteContent {
  try {
    const file = fs.readFileSync(SITE_CONTENT_PATH, "utf8");
    return JSON.parse(file) as SiteContent;
  } catch {
    return defaultSiteContent;
  }
}

function writeSiteContent(content: SiteContent) {
  fs.mkdirSync(path.dirname(SITE_CONTENT_PATH), { recursive: true });
  fs.writeFileSync(SITE_CONTENT_PATH, JSON.stringify(content, null, 2));
}

function normalizeStoredReview(value: unknown): PlayerReview | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const review = value as Partial<PlayerReview>;
  const rating = Number(review.rating);
  const message = String(review.message ?? "").trim();
  const createdAt = String(review.createdAt ?? "");

  if (!Number.isFinite(rating) || rating < 1 || rating > 5 || !message || !createdAt) {
    return null;
  }

  return {
    id: String(review.id ?? crypto.randomUUID()),
    rating: Math.min(5, Math.max(1, Math.round(rating))),
    name: String(review.name ?? "").trim().slice(0, REVIEW_NAME_MAX_LENGTH),
    message: message.slice(0, REVIEW_MESSAGE_MAX_LENGTH),
    createdAt,
  };
}

function readLegacyReviews(): PlayerReview[] {
  try {
    const file = fs.readFileSync(LEGACY_REVIEWS_PATH, "utf8");
    const data = JSON.parse(file) as unknown;

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(normalizeStoredReview).filter(Boolean).slice(0, REVIEW_STORAGE_LIMIT) as PlayerReview[];
  } catch {
    return [];
  }
}

function createReviewsDatabase() {
  fs.mkdirSync(path.dirname(REVIEWS_DATABASE_PATH), { recursive: true });

  const database = new DatabaseSync(REVIEWS_DATABASE_PATH);
  database.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      name TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS reviews_created_at_idx
      ON reviews (created_at DESC);
  `);

  const existing = database.prepare("SELECT COUNT(*) AS count FROM reviews").get() as { count: number };

  if (existing.count === 0) {
    const seedReviews = readLegacyReviews();
    const insert = database.prepare(`
      INSERT OR IGNORE INTO reviews (id, rating, name, message, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const review of seedReviews) {
      insert.run(review.id, review.rating, review.name, review.message, review.createdAt);
    }
  }

  return database;
}

function getReviewsDatabase() {
  if (!reviewsDatabase) {
    reviewsDatabase = createReviewsDatabase();
  }

  return reviewsDatabase;
}

function readReviews(): PlayerReview[] {
  const rows = getReviewsDatabase()
    .prepare(
      `
        SELECT id, rating, name, message, created_at
        FROM reviews
        ORDER BY created_at DESC
        LIMIT ?
      `
    )
    .all(REVIEW_STORAGE_LIMIT) as ReviewRow[];

  return rows.map((row) => ({
    id: row.id,
    rating: row.rating,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  }));
}

function insertReview(review: PlayerReview) {
  const database = getReviewsDatabase();
  database
    .prepare(
      `
        INSERT INTO reviews (id, rating, name, message, created_at)
        VALUES (?, ?, ?, ?, ?)
      `
    )
    .run(review.id, review.rating, review.name, review.message, review.createdAt);
}

function requireOperator(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const session = parseSession(getCookie(req, SESSION_COOKIE));
  if (!session) {
    return res.status(401).json({ authenticated: false, message: "Operator authentication required." });
  }

  return next();
}

app.get("/api/site-content", (_req, res) => {
  return res.status(200).json(readSiteContent());
});

app.get("/api/reviews", (_req, res) => {
  try {
    return res.status(200).json(readReviews());
  } catch (error) {
    console.error("Failed to read reviews database:", error);
    return res.status(500).json({ message: "Reviews database is unavailable." });
  }
});

app.post("/api/reviews", (req, res) => {
  const rating = Number(req.body?.rating);
  const name = String(req.body?.name ?? "").trim().slice(0, REVIEW_NAME_MAX_LENGTH);
  const message = String(req.body?.message ?? "").trim().slice(0, REVIEW_MESSAGE_MAX_LENGTH);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Choose a rating from 1 to 5 stars." });
  }

  if (message.length < REVIEW_MESSAGE_MIN_LENGTH) {
    return res.status(400).json({ message: "Write at least 8 characters before sending." });
  }

  if (findBlockedReviewWord(`${name} ${message}`)) {
    return res.status(400).json({ message: BLOCKED_REVIEW_WARNING });
  }

  const review: PlayerReview = {
    id: crypto.randomUUID(),
    rating: Math.round(rating),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    insertReview(review);
    return res.status(201).json({ review, reviews: readReviews() });
  } catch (error) {
    console.error("Failed to save review:", error);
    return res.status(500).json({ message: "Reviews database is unavailable." });
  }
});

app.get("/api/operator/session", (req, res) => {
  const session = parseSession(getCookie(req, SESSION_COOKIE));

  if (!session) {
    return res.status(200).json({ authenticated: false });
  }

  return res.status(200).json({
    authenticated: true,
    operator: session.username,
    gmail: session.gmail,
  });
});

app.post("/api/operator/login", (req, res) => {
  const username = normalizeUsername(String(req.body?.username ?? ""));
  const passcode = normalizePasscode(String(req.body?.passcode ?? ""));
  const gmail = normalizeEmail(String(req.body?.gmail ?? ""));

  const expectedUsername = normalizeUsername(requiredEnv("OPERATOR_USERNAME"));
  const expectedPasscode = normalizePasscode(requiredEnv("OPERATOR_PASSCODE"));
  const expectedGmail = normalizeEmail(requiredEnv("OPERATOR_GMAIL"));

  const isValid =
    safeEqual(username, expectedUsername) &&
    safeEqual(passcode, expectedPasscode) &&
    safeEqual(gmail.toLowerCase(), expectedGmail.toLowerCase());

  if (!isValid) {
    clearSessionCookie(res);
    return res.status(401).json({
      authenticated: false,
      message: "Invalid operator credentials.",
    });
  }

  setSessionCookie(res, {
    username: requiredEnv("OPERATOR_USERNAME"),
    gmail: requiredEnv("OPERATOR_GMAIL"),
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  });

  return res.status(200).json({
    authenticated: true,
    operator: requiredEnv("OPERATOR_USERNAME"),
  });
});

app.post("/api/operator/logout", (_req, res) => {
  clearSessionCookie(res);
  return res.status(200).json({ authenticated: false });
});

app.put("/api/operator/content", requireOperator, (req, res) => {
  const content = req.body as SiteContent | undefined;

  if (!content) {
    return res.status(400).json({ message: "Missing site content payload." });
  }

  writeSiteContent(content);
  return res.status(200).json({ ok: true, content });
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "dist");
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Subject 14 operator server running on http://127.0.0.1:${PORT}`);
});
