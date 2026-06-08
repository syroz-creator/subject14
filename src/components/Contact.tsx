import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { RadioTower, Send, ShieldAlert, Signal, Terminal } from "lucide-react";

type ContactPayload = {
  name: string;
  email: string;
  sector: string;
  message: string;
};

type ContactResponse = {
  email?: {
    sent?: boolean;
    reason?: string;
  };
};

const sectors = [
  "SECTOR-01: RESEARCH",
  "SECTOR-04: CONTAINMENT",
  "SECTOR-09: RESIDENTIAL",
  "ANOMALY REPORT",
  "PSYCHOLOGICAL EVALUATION",
];

const inputClass =
  "w-full rounded-md border border-white/10 bg-[#151515] px-4 py-3 font-mono text-sm text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-primary/70 focus:ring-1 focus:ring-primary/50";

const labelClass = "font-mono text-[0.7rem] font-bold uppercase tracking-[0.24em] text-primary";

function CornerAccent({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClass = {
    "top-left": "left-3 top-3 border-l-2 border-t-2",
    "top-right": "right-3 top-3 border-r-2 border-t-2",
    "bottom-left": "bottom-3 left-3 border-b-2 border-l-2",
    "bottom-right": "bottom-3 right-3 border-b-2 border-r-2",
  }[position];

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 h-8 w-8 border-primary/95 shadow-[0_0_16px_rgba(179,32,32,0.28)] ${positionClass}`}
    />
  );
}

function saveFallbackMessage(payload: ContactPayload) {
  const storageKey = "subject14-contact-messages";
  const current = JSON.parse(window.localStorage.getItem(storageKey) || "[]") as ContactPayload[];
  current.unshift(payload);
  window.localStorage.setItem(storageKey, JSON.stringify(current.slice(0, 25)));
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState(sectors[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      sector,
      message: message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Complete name, comm ID, and situation report before transmitting.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact endpoint unavailable.");
      }

      const result = (await response.json()) as ContactResponse;
      if (result.email?.sent) {
        setStatus("Transmission received. Command has logged and emailed your report.");
      } else if (result.email?.reason === "smtp_not_configured") {
        setStatus("Transmission logged. Email delivery is not configured on the server yet.");
      } else {
        setStatus("Transmission logged. Email delivery failed, so check the SMTP settings.");
      }
    } catch {
      try {
        saveFallbackMessage(payload);
        setStatus("Transmission stored in this browser. Server uplink is currently offline.");
      } catch {
        setStatus("Unable to transmit. Try again when the uplink stabilizes.");
      }
    } finally {
      setSubmitting(false);
      setName("");
      setEmail("");
      setSector(sectors[0]);
      setMessage("");
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/site-images/07-gallery-3.jpg"
          alt="Contact command corridor"
          className="h-full w-full scale-105 object-cover object-center opacity-30 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(179,32,32,0.18),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.78),rgba(0,0,0,0.92))]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 max-w-2xl text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2 text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <p className="font-mono text-xs uppercase tracking-[0.34em]">Secure Channel 09-B</p>
          </div>
          <h2 className="text-glow-red font-heading text-5xl uppercase tracking-[0.08em] text-white sm:text-6xl md:text-7xl">
            Contact Command
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/64">
            Report anomalies, technical failures, or psychological distress. Your transmission will be logged for
            personnel evaluation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="panel-film border-horror relative w-full max-w-xl overflow-hidden rounded-[1.15rem] border border-primary/20 border-t-primary/55 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.58),0_0_46px_rgba(179,32,32,0.12)] sm:p-9"
        >
          <div className="pointer-events-none absolute inset-3 z-10 rounded-[0.75rem] border border-white/8" />
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
          <CornerAccent position="top-left" />
          <CornerAccent position="top-right" />
          <CornerAccent position="bottom-left" />
          <CornerAccent position="bottom-right" />

          <form className="relative z-30 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className={labelClass}>Survivor Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
                  placeholder="TYPE NAME..."
                  type="text"
                  autoComplete="name"
                />
              </label>

              <label className="space-y-2">
                <span className={labelClass}>Comm ID</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  placeholder="USER@FACILITY.NET"
                  type="email"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className={labelClass}>Sector</span>
              <select value={sector} onChange={(event) => setSector(event.target.value)} className={inputClass}>
                {sectors.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Situation Report</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${inputClass} min-h-36 resize-y`}
                placeholder="DESCRIBE THE DISTURBANCE..."
                rows={5}
              />
            </label>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-primary" />
                Encryption: AES-256
              </span>
              <span className="flex items-center gap-2">
                <Signal className="h-3.5 w-3.5 text-primary" />
                Uplink: 88%
              </span>
            </div>

            {status ? (
              <p className="rounded-md border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary" aria-live="polite">
                {status}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-heading text-xl uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-primary/85 hover:shadow-[0_0_28px_rgba(179,32,32,0.38)] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {submitting ? (
                <>
                  <RadioTower className="h-5 w-5 animate-pulse" />
                  Uploading
                </>
              ) : (
                <>
                  Initiate Transmission
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="mt-8 grid w-full max-w-5xl gap-4 opacity-60 md:grid-cols-3">
          {[
            ["Data Nodes", "All terminals are monitored. Do not disclose classified protocols over public channels."],
            ["Response Time", "Expect delays due to facility-wide interference."],
            ["Security Warning", "Unauthorized transmissions may terminate access privileges."],
          ].map(([title, copy]) => (
            <div key={title} className="border-l border-primary/35 px-4 py-3">
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.22em] text-primary">{title}</p>
              <p className="font-mono text-xs uppercase leading-5 text-white/52">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/35">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          Contact channel available to all players
        </div>
      </div>
    </section>
  );
}
