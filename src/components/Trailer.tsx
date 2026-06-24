import { motion } from "motion/react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

type TrailerSource =
  | { type: "embed"; url: string }
  | { type: "video"; url: string }
  | { type: "empty" };

function getYouTubeId(url: URL): string | null {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] || null;
  }

  if (url.hostname.includes("youtube.com")) {
    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/")[2] || null;
    }

    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/")[2] || null;
    }

    return url.searchParams.get("v");
  }

  return null;
}

function getVimeoId(url: URL): string | null {
  if (!url.hostname.includes("vimeo.com")) {
    return null;
  }

  return url.pathname.split("/").filter(Boolean)[0] || null;
}

function getTrailerSource(value: string): TrailerSource {
  const rawUrl = value.trim();
  if (!rawUrl) {
    return { type: "empty" };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(rawUrl)) {
    return { type: "video", url: rawUrl };
  }

  try {
    const url = new URL(rawUrl);
    const youtubeId = getYouTubeId(url);
    if (youtubeId) {
      return {
        type: "embed",
        url: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`,
      };
    }

    const vimeoId = getVimeoId(url);
    if (vimeoId) {
      return {
        type: "embed",
        url: `https://player.vimeo.com/video/${vimeoId}`,
      };
    }

    return { type: "embed", url: rawUrl };
  } catch {
    return { type: "empty" };
  }
}

export default function Trailer() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();
  const trailerSource = getTrailerSource(siteContent.trailer.videoUrl);

  return (
    <section id="trailer" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.05] to-transparent pointer-events-none" />
      <div className="section-frame relative z-10">
        <div className="mb-16 text-center">
          <p className="section-copy-kicker mb-4">Official Footage</p>
          <h2 className="section-heading mb-4">{t.trailer.title}</h2>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">{t.trailer.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="wide-media-panel panel-film border-horror group relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] shadow-[0_0_50px_rgba(139,0,0,0.16)]"
        >
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 bg-black">
              {trailerSource.type === "embed" ? (
                <iframe
                  title={siteContent.trailer.title}
                  src={trailerSource.url}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : trailerSource.type === "video" ? (
                <video
                  controls
                  playsInline
                  poster={siteContent.trailer.thumbnailUrl}
                  className="h-full w-full bg-black object-contain"
                >
                  <source src={trailerSource.url} />
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={siteContent.trailer.thumbnailUrl}
                    alt="Trailer Thumbnail"
                    className="h-full w-full object-contain p-12 opacity-80 transition-opacity duration-500 group-hover:opacity-65 sm:p-20"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/80 text-white shadow-lg shadow-primary/40 sm:h-20 sm:w-20">
                      <Play className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8" />
                    </div>
                    <p className="max-w-xs px-4 font-mono text-xs uppercase tracking-[0.22em] text-white/72">
                      Add a trailer video URL in the operator panel to play it here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AspectRatio>
          
          <div className="pointer-events-none absolute inset-0 border-[10px] border-black/40 sm:border-[20px]" />
        </motion.div>
      </div>
    </section>
  );
}
