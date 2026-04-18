import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AlertTriangle, LockKeyhole, LogOut, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "../context/SiteContentContext";
import type { SiteContent } from "../site-content";

type OperatorPanelProps = {
  onCloseMode?: () => void;
};

const OPERATOR_AUTH_STORAGE_KEY = "subject14-operator-authenticated";
const HARDCODED_OPERATOR_ID = "Ahmad Uwaida";
const HARDCODED_OPERATOR_PASSCODE = "AhmadApp4616!!";

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

export default function OperatorPanel({ onCloseMode }: OperatorPanelProps) {
  const { siteContent, reloadSiteContent, saveSiteContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(siteContent));
  const [operatorId, setOperatorId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [accessMessage, setAccessMessage] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const credentials = useMemo(
    () => ({
      operatorId: HARDCODED_OPERATOR_ID,
      passcode: HARDCODED_OPERATOR_PASSCODE,
    }),
    []
  );

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

  const handleAuthenticate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedOperator = operatorId.trim().toLowerCase();
    const normalizedConfiguredOperator = credentials.operatorId.toLowerCase();

    if (normalizedOperator === normalizedConfiguredOperator && passcode.trim() === credentials.passcode) {
      setAuthenticated(true);
      setAccessMessage("");
      try {
        window.localStorage.setItem(OPERATOR_AUTH_STORAGE_KEY, "true");
      } catch {
        // Ignore storage failures and continue for this session.
      }
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
            Update the live content here. If the site is running without the API server, changes still save in this browser.
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

      <div className="max-h-[62vh] space-y-5 overflow-y-auto pe-1">
        <Section title="Hero">
          <Field label="Title" value={draft.hero.title} onChange={(value) => update((content) => ({ ...content, hero: { ...content.hero, title: value } }))} />
          <Field label="Tagline" value={draft.hero.tagline} onChange={(value) => update((content) => ({ ...content, hero: { ...content.hero, tagline: value } }))} />
          <Field label="Description" multiline value={draft.hero.description} onChange={(value) => update((content) => ({ ...content, hero: { ...content.hero, description: value } }))} />
          <Field label="Background Image URL" value={draft.hero.backgroundUrl} onChange={(value) => update((content) => ({ ...content, hero: { ...content.hero, backgroundUrl: value } }))} />
        </Section>

        <Section title="About">
          <Field label="Title" value={draft.about.title} onChange={(value) => update((content) => ({ ...content, about: { ...content.about, title: value } }))} />
          <Field label="Log Entry Text" multiline value={draft.about.p1} onChange={(value) => update((content) => ({ ...content, about: { ...content.about, p1: value } }))} />
          <Field label="Paragraph Two" multiline value={draft.about.p2} onChange={(value) => update((content) => ({ ...content, about: { ...content.about, p2: value } }))} />
          <Field label="Paragraph Three" multiline value={draft.about.p3} onChange={(value) => update((content) => ({ ...content, about: { ...content.about, p3: value } }))} />
          <Field label="About Image URL" value={draft.about.imageUrl} onChange={(value) => update((content) => ({ ...content, about: { ...content.about, imageUrl: value } }))} />
        </Section>

        <Section title="Story">
          <Field label="Title" value={draft.story.title} onChange={(value) => update((content) => ({ ...content, story: { ...content.story, title: value } }))} />
          <Field label="Story Paragraph One" multiline value={draft.story.p1} onChange={(value) => update((content) => ({ ...content, story: { ...content.story, p1: value } }))} />
          <Field label="Story Paragraph Two" multiline value={draft.story.p2} onChange={(value) => update((content) => ({ ...content, story: { ...content.story, p2: value } }))} />
          <Field label="Story Paragraph Three" multiline value={draft.story.p3} onChange={(value) => update((content) => ({ ...content, story: { ...content.story, p3: value } }))} />
          <Field label="Story Image URL" value={draft.story.imageUrl} onChange={(value) => update((content) => ({ ...content, story: { ...content.story, imageUrl: value } }))} />
        </Section>

        <Section title="Gallery">
          <Field label="Gallery Title" value={draft.gallery.title} onChange={(value) => update((content) => ({ ...content, gallery: { ...content.gallery, title: value } }))} />
          <Field label="Gallery Subtitle" value={draft.gallery.subtitle} onChange={(value) => update((content) => ({ ...content, gallery: { ...content.gallery, subtitle: value } }))} />
          {draft.gallery.items.map((item, index) => (
            <div key={index} className="grid gap-4 rounded-xl border border-white/8 bg-black/20 p-4">
              <Field
                label={`Image ${index + 1} Title`}
                value={item.title}
                onChange={(value) =>
                  update((content) => {
                    content.gallery.items[index].title = value;
                    return content;
                  })
                }
              />
              <Field
                label={`Image ${index + 1} URL`}
                value={item.url}
                onChange={(value) =>
                  update((content) => {
                    content.gallery.items[index].url = value;
                    return content;
                  })
                }
              />
            </div>
          ))}
        </Section>

        <Section title="Trailer">
          <Field label="Trailer Title" value={draft.trailer.title} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, title: value } }))} />
          <Field label="Trailer Subtitle" value={draft.trailer.subtitle} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, subtitle: value } }))} />
          <Field label="Trailer Thumbnail URL" value={draft.trailer.thumbnailUrl} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, thumbnailUrl: value } }))} />
          <Field label="Trailer Video URL" value={draft.trailer.videoUrl} onChange={(value) => update((content) => ({ ...content, trailer: { ...content.trailer, videoUrl: value } }))} />
        </Section>

        <Section title="Features Panels">
          <Field label="Features Title" value={draft.features.title} onChange={(value) => update((content) => ({ ...content, features: { ...content.features, title: value } }))} />
          <Field label="Features Subtitle" value={draft.features.subtitle} onChange={(value) => update((content) => ({ ...content, features: { ...content.features, subtitle: value } }))} />
          {draft.features.items.map((item, index) => (
            <div key={index} className="grid gap-4 rounded-xl border border-white/8 bg-black/20 p-4">
              <Field
                label={`Panel ${index + 1} Title`}
                value={item.title}
                onChange={(value) =>
                  update((content) => {
                    content.features.items[index].title = value;
                    return content;
                  })
                }
              />
              <Field
                label={`Panel ${index + 1} Description`}
                multiline
                value={item.description}
                onChange={(value) =>
                  update((content) => {
                    content.features.items[index].description = value;
                    return content;
                  })
                }
              />
            </div>
          ))}
        </Section>

        <Section title="Download">
          <Field label="Download Title" value={draft.download.title} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, title: value } }))} />
          <Field label="Download Subtitle" multiline value={draft.download.subtitle} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, subtitle: value } }))} />
          <Field label="Demo Download URL" value={draft.download.demoUrl} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, demoUrl: value } }))} />
          <Field label="Steam / Wishlist URL" value={draft.download.steamUrl} onChange={(value) => update((content) => ({ ...content, download: { ...content.download, steamUrl: value } }))} />
        </Section>

        <Section title="Footer">
          <Field label="Credits Text" value={draft.footer.credits} onChange={(value) => update((content) => ({ ...content, footer: { ...content.footer, credits: value } }))} />
        </Section>
      </div>

      {status ? <p className="text-sm text-primary">{status}</p> : null}

      <Button type="submit" disabled={saving} className="w-full bg-primary text-white hover:bg-primary/80">
        {saving ? "Saving..." : "Save Site Content"}
      </Button>
    </form>
  );
}
