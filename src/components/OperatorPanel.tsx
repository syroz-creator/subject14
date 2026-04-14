import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "../context/SiteContentContext";
import type { SiteContent } from "../site-content";

type OperatorPanelProps = {
  onLogout: () => void;
};

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
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary/40";

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

export default function OperatorPanel({ onLogout }: OperatorPanelProps) {
  const { siteContent, setSiteContent, reloadSiteContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(siteContent));
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(cloneContent(siteContent));
  }, [siteContent]);

  const update = (updater: (current: SiteContent) => SiteContent) => {
    setDraft((current) => updater(cloneContent(current)));
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/operator/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(draft),
      });

      const data = (await response.json()) as { content?: SiteContent; message?: string };
      if (!response.ok || !data.content) {
        setStatus(data.message || "Unable to save operator content.");
        return;
      }

      setSiteContent(data.content);
      setStatus("Saved. The app content updated immediately.");
    } catch {
      setStatus("Operator server unavailable. Check that `npm run dev` is running.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSave}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Edit the site here, then save to update the app content immediately.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              void reloadSiteContent();
              setStatus("Reloaded the latest saved content.");
            }}
            className="border-white/15 text-white hover:bg-white/5"
          >
            Reload
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onLogout}
            className="border-primary/40 text-primary hover:bg-primary/10"
          >
            Log Out
          </Button>
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
