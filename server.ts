import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { defaultSiteContent, type SiteContent } from "./src/site-content.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3001);
const SESSION_COOKIE = "subject14_operator_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const SITE_CONTENT_PATH = path.resolve(__dirname, "data/site-content.json");

app.use(express.json());

type SessionPayload = {
  username: string;
  gmail: string;
  exp: number;
};

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
