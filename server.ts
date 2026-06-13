import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
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
const CONTACT_MESSAGES_PATH = path.resolve(__dirname, "data/contact-messages.json");
const CONTACT_EMAIL_ENABLED =
  Boolean(process.env.SMTP_HOST) &&
  Boolean(process.env.SMTP_USER) &&
  Boolean(process.env.SMTP_PASS) &&
  Boolean(process.env.CONTACT_TO_EMAIL);

app.set("trust proxy", true);
app.use(express.json());

type SessionPayload = {
  username: string;
  gmail: string;
  exp: number;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  sector: string;
  message: string;
  createdAt: string;
};

type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
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

function normalizeRequestIp(req: express.Request): string {
  const forwardedFor = String(req.headers["x-forwarded-for"] ?? "")
    .split(",")[0]
    .trim();
  const rawIp = forwardedFor || req.ip || req.socket.remoteAddress || "";

  return rawIp.replace(/^::ffff:/, "");
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

function readContactMessages(): ContactMessage[] {
  try {
    const file = fs.readFileSync(CONTACT_MESSAGES_PATH, "utf8");
    return JSON.parse(file) as ContactMessage[];
  } catch {
    return [];
  }
}

function writeContactMessages(messages: ContactMessage[]) {
  fs.mkdirSync(path.dirname(CONTACT_MESSAGES_PATH), { recursive: true });
  fs.writeFileSync(CONTACT_MESSAGES_PATH, JSON.stringify(messages, null, 2));
}

function normalizeContactField(value: unknown, maxLength: number): string {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isValidContactEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function optionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function getSmtpSettings(): SmtpSettings | null {
  const host = optionalEnv("SMTP_HOST");
  const user = optionalEnv("SMTP_USER");
  const pass = optionalEnv("SMTP_PASS");
  const to = optionalEnv("CONTACT_TO_EMAIL");

  if (!host || !user || !pass || !to) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  return {
    host,
    port,
    secure,
    user,
    pass,
    from: optionalEnv("CONTACT_FROM_EMAIL") || user,
    to,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendContactEmail(contactMessage: ContactMessage) {
  const settings = getSmtpSettings();
  if (!settings) {
    return { sent: false, reason: "smtp_not_configured" };
  }

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.user,
      pass: settings.pass,
    },
  });

  const subject = `[Subject 14 Support] ${contactMessage.sector} - ${contactMessage.name}`;
  const text = [
    "New Subject 14 contact transmission",
    "",
    `Name: ${contactMessage.name}`,
    `Email: ${contactMessage.email}`,
    `Sector: ${contactMessage.sector}`,
    `Created: ${contactMessage.createdAt}`,
    "",
    "Message:",
    contactMessage.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; background: #090909; color: #f5f5f5; padding: 24px;">
      <div style="max-width: 640px; border: 1px solid rgba(179,32,32,0.45); padding: 20px;">
        <p style="margin: 0 0 12px; color: #b32020; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Subject 14 Contact Transmission</p>
        <h1 style="margin: 0 0 20px; font-size: 24px;">${escapeHtml(contactMessage.sector)}</h1>
        <p><strong>Name:</strong> ${escapeHtml(contactMessage.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contactMessage.email)}</p>
        <p><strong>Created:</strong> ${escapeHtml(contactMessage.createdAt)}</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 20px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(contactMessage.message)}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Subject 14 Support" <${settings.from}>`,
    to: settings.to,
    replyTo: contactMessage.email,
    subject,
    text,
    html,
  });

  try {
    await transporter.sendMail({
      from: `"Subject 14 Support" <${settings.from}>`,
      to: contactMessage.email,
      replyTo: settings.to,
      subject: "Subject 14 Support // Transmission Received",
      text: [
        `Hi ${contactMessage.name},`,
        "",
        "You reached Subject 14 Support.",
        "Your transmission has been received and logged. Stand by while our team reviews your report.",
        "If a response is needed, we will contact you through this email address.",
        "",
        "Logged transmission:",
        contactMessage.message,
        "",
        "Subject 14 Support // Command Channel",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; background: #090909; color: #f5f5f5; padding: 24px;">
          <div style="max-width: 640px; border: 1px solid rgba(179,32,32,0.45); padding: 20px;">
            <p style="margin: 0 0 12px; color: #b32020; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">Subject 14 Support</p>
            <h1 style="margin: 0 0 16px; font-size: 24px;">Transmission Received</h1>
            <p>Hi ${escapeHtml(contactMessage.name)},</p>
            <p>You reached <strong>Subject 14 Support</strong>. Your transmission has been received and logged. Stand by while our team reviews your report.</p>
            <p>If a response is needed, we will contact you through this email address.</p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 20px 0;" />
            <p style="margin-bottom: 8px;"><strong>Logged transmission:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(contactMessage.message)}</p>
            <p style="margin-top: 20px; color: #b32020; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;">Subject 14 Support // Command Channel</p>
          </div>
        </div>
      `,
    });

    return { sent: true, autoReply: { sent: true } };
  } catch (error) {
    console.error("Unable to send contact auto-reply", error);
    return { sent: true, autoReply: { sent: false, reason: "auto_reply_failed" } };
  }
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

app.get("/api/public-ip", (req, res) => {
  const ip = normalizeRequestIp(req);
  return res.status(200).json({ ip: ip || "unknown" });
});

app.post("/api/contact", async (req, res) => {
  const name = normalizeContactField(req.body?.name, 80);
  const email = normalizeContactField(req.body?.email, 120);
  const sector = normalizeContactField(req.body?.sector, 80);
  const message = normalizeContactField(req.body?.message, 2000);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  if (!isValidContactEmail(email)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  const nextMessage: ContactMessage = {
    id: crypto.randomUUID(),
    name,
    email,
    sector: sector || "GENERAL TRANSMISSION",
    message,
    createdAt: new Date().toISOString(),
  };

  const messages = readContactMessages();
  messages.unshift(nextMessage);
  writeContactMessages(messages.slice(0, 250));

  try {
    const emailResult = await sendContactEmail(nextMessage);
    return res.status(201).json({ ok: true, message: nextMessage, email: emailResult });
  } catch (error) {
    console.error("Unable to send contact email", error);
    return res.status(201).json({
      ok: true,
      message: nextMessage,
      email: { sent: false, reason: "smtp_send_failed" },
    });
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
  if (!CONTACT_EMAIL_ENABLED) {
    console.log("Contact email delivery is disabled until SMTP env vars are configured.");
  }
});
