import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Activity, AlertTriangle, LockKeyhole, LogOut, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "../context/SiteContentContext";
import type { SiteContent } from "../site-content";

type OperatorPanelProps = {
  onCloseMode?: () => void;
};

type VisitorStats = {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  today: string;
  lastVisitAt: string | null;
};

const OPERATOR_AUTH_STORAGE_KEY = "subject14-operator-authenticated";
const OPERATOR_CREDENTIALS = [
  { operatorId: "Ahmad Uwaida", passcode: "AhmadApp4616!!" },
  { operatorId: "ahmad", passcode: "ahmad 4616 !!" },
];

function normalizeOperatorId(value: string): string {
  return value.trim().toLowerCase();
}

function normalizePasscode(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  const className =
    "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary/40";

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className={`${className} min-h-28 resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

function AccessField({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-white/55">{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/45 px-4 py-4 transition-colors focus-within:border-primary/45">
        <span className="text-white/45">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent font-mono text-xl uppercase tracking-[0.22em] text-white outline-none placeholder:text-white/35"
        />
      </div>
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="mt-2 font-heading text-3xl uppercase tracking-[0.08em] text-white">{value}</p>
    </div>
  );
}

export default function OperatorPanel({ onCloseMode }: OperatorPanelProps) {
  const { siteContent, reloadSiteContent, saveSiteContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(siteContent));
  const [operatorId, setOperatorId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [accessMessage, setAccessMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statsStatus, setStatsStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    setDraft(cloneContent(siteContent));
  }, [siteContent]);

  useEffect(() => {
    try {
      setAuthenticated(window.localStorage.getItem(OPERATOR_AUTH_STORAGE_KEY) === "true");
    } catch {
      setAuthenticated(false);
    }
  }, []);

  const update = (updater: (current: SiteContent) => SiteContent) => {
    setDraft((current) => updater(cloneContent(current)));
  };

  const loadVisitorStats = async () => {
    setStatsStatus("");

    try {
      const response = await fetch("/api/visitor-stats", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to load visitor stats.");
      }

      const data = (await response.json()) as VisitorStats;
      setVisitorStats(data);
    } catch {
      setStatsStatus("Visitor stats are unavailable on this deployment.");
    }
  };

  const handleAuthenticate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedOperator = normalizeOperatorId(operatorId);
    const normalizedPasscode = normalizePasscode(passcode);

    const hasValidCredentials = OPERATOR_CREDENTIALS.some(
      (credential) =>
        normalizedOperator === normalizeOperatorId(credential.operatorId) &&
        normalizedPasscode === normalizePasscode(credential.passcode)
    );

    if (hasValidCredentials) {
      setAuthenticated(true);
      setAccessMessage("");
      try {
        window.localStorage.setItem(OPERATOR_AUTH_STORAGE_KEY, "true");
      } catch {
        // Ignore storage failures and continue for this session.
      }
      void loadVisitorStats();
      return;
    }

    setAccessMessage("Authorization denied. Check your operator ID and passcode.");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setOperatorId("");
    setPasscode("");
    setAccessMessage("");
    setStatus("");
    try {
      window.localStorage.removeItem(OPERATOR_AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const result = await saveSiteContent(cloneContent(draft));
      setStatus(
        result.mode === "server"
          ? "Saved to the live site."
          : "Saved in this browser. This works on the published page too, but only on this device/browser."
      );
    } catch {
      setStatus("Unable to save operator content.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      void loadVisitorStats();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-[40rem]">
        <div className="border-horror panel-film rounded-[1.8rem] border-t border-t-primary/50 px-6 py-8 sm:px-10 sm:py-10">
          <div className="mx-auto mb-8 flex h-22 w-22 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <LockKeyhole className="h-10 w-10" />
          </div>

          <div className="text-center">
            <h3 className="font-heading text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">
              Restricted Access
            </h3>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-white/42">
              Authorization Required // Level 4 Clearance
            </p>
          </div>

          <form className="mt-10 space-y-8" onSubmit={handleAuthenticate}>
            <AccessField
              label="Operator ID"
              placeholder="Enter Codename"
              value={operatorId}
              onChange={setOperatorId}
              icon={<User className="h-5 w-5" />}
            />

            <AccessField
              label="Passcode"
              placeholder="Enter Security Code"
              value={passcode}
              onChange={setPasscode}
              type="password"
              icon={<ShieldCheck className="h-5 w-5" />}
            />

            {accessMessage ? (
              <p className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary">
                {accessMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              className="h-16 w-full rounded-xl bg-primary text-xl uppercase tracking-[0.14em] text-white hover:bg-primary/85"
            >
              Authenticate
            </Button>

            <div className="mx-auto flex max-w-max items-center gap-2 border border-amber-600/35 bg-amber-500/8 px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-amber-500/75">
              <AlertTriangle className="h-4 w-4" />
              Unauthorized access attempts will be logged
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSave}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Operator Access Granted</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Update game links and trailer settings, then review visitor stats from one focused page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void reloadSiteContent();
              setStatus("Reloaded the latest available content.");
            }}
            className="border-white/15 text-white hover:bg-white/5"
          >
            Reload
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="border-white/15 text-white hover:bg-white/5"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Lock
          </Button>
          {onCloseMode ? (
            <Button
              type="button"
              variant="outline"
              onClick={onCloseMode}
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              Close
            </Button>
          ) : null}
        </div>
      </div>

      <div className="space-y-5">
        <Section title="Visitor Stats">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Total Visits" value={visitorStats?.totalVisits ?? "-"} />
            <StatCard label="Unique Visitors" value={visitorStats?.uniqueVisitors ?? "-"} />
            <StatCard label="Today" value={visitorStats?.todayVisits ?? "-"} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/20 px-4 py-3">
            <p className="flex items-center gap-2 text-sm text-white/55">
              <Activity className="h-4 w-4 text-primary" />
              {visitorStats?.lastVisitAt
                ? `Last visit: ${new Date(visitorStats.lastVisitAt).toLocaleString()}`
                : "No visits recorded yet."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void loadVisitorStats()}
              className="border-white/15 text-white hover:bg-white/5"
            >
              Refresh Stats
            </Button>
          </div>
          {statsStatus ? <p className="text-sm text-primary">{statsStatus}</p> : null}
        </Section>

        <Section title="Game Links">
          <Field label="Download Title" value={draft.download.title} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, title: value } }))} />
          <Field label="Download Subtitle" multiline value={draft.download.subtitle} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, subtitle: value } }))} />
          <Field label="Demo Download URL" value={draft.download.demoUrl} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, demoUrl: value } }))} />
          <Field label="Steam / Wishlist URL" value={draft.download.steamUrl} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, steamUrl: value } }))} />
        </Section>

        <Section title="Trailer Settings">
          <Field label="Trailer Title" value={draft.trailer.title} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, title: value } }))} />
          <Field label="Trailer Subtitle" value={draft.trailer.subtitle} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, subtitle: value } }))} />
          <Field label="Trailer Thumbnail URL" value={draft.trailer.thumbnailUrl} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, thumbnailUrl: value } }))} />
          <Field label="Trailer Video URL" value={draft.trailer.videoUrl} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, videoUrl: value } }))} />
        </Section>
      </div>

      {status ? <p className="text-sm text-primary">{status}</p> : null}

      <Button type="submit" disabled={saving} className="w-full bg-primary text-white hover:bg-primary/80">
        {saving ? "Saving..." : "Save Site Content"}
      </Button>
    </form>
  );
}
