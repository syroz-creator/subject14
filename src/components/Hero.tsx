import { motion } from "motion/react";
import { Play, Download, ShoppingCart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";
import type { SectionId } from "../App";

type HeroProps = {
  onNavigate: (section: SectionId) => void;
};

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();
  const [titleTop, ...titleRest] = siteContent.hero.title.split(" ");
  const titleBottom = titleRest.join(" ") || titleTop;
  const statusItems = [t.hero.statusDemo, t.hero.statusPlatform, t.hero.statusTrailer];

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={siteContent.hero.backgroundUrl}
          alt="Horror Background"
          className="h-full w-full scale-[1.03] object-cover object-center opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(64,118,118,0.16),transparent_24rem),radial-gradient(circle_at_20%_46%,rgba(179,32,32,0.12),transparent_22rem),linear-gradient(90deg,rgba(7,10,13,0.86)_0%,rgba(7,10,13,0.58)_46%,rgba(4,5,6,0.72)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      <div className="section-frame relative z-10 flex w-full items-center pt-24 lg:min-h-screen lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="grid w-full items-center gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.55fr)] lg:py-0"
        >
          <div className="max-w-4xl text-left">
            <div className="case-strip mb-6 inline-flex items-center gap-3 rounded-md px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_rgba(198,48,38,0.7)]" />
              <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/72">
                Playable investigation dossier
              </span>
            </div>

            <div className="mb-5 w-full leading-none uppercase">
              <h1 className="text-glow-red font-heading text-6xl tracking-[0.03em] text-foreground sm:text-7xl md:text-8xl xl:text-9xl">
                {titleTop}
              </h1>
              {titleRest.length > 0 ? (
                <h1 className="text-glow-red font-heading -mt-1 text-6xl tracking-[0.03em] text-primary sm:text-7xl md:text-8xl xl:text-9xl">
                  {titleBottom}
                </h1>
              ) : null}
            </div>

            <p className="mb-4 max-w-2xl font-mono text-xs uppercase leading-6 tracking-[0.18em] text-primary/90 sm:text-sm">
              {t.hero.tagline}
            </p>
            <p className="mb-8 max-w-3xl text-base leading-8 text-white/78 sm:text-lg">
              {t.hero.description}
            </p>

            <div className="flex w-full max-w-[36rem] flex-col items-stretch gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate("trailer")}
                className="hero-button-solid group w-full sm:flex-1"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>{t.hero.trailer}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("download")}
                className="hero-button-ghost group w-full sm:flex-1"
              >
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                <span>{t.download.demo}</span>
              </button>
            </div>
          </div>

          <div className="readable-surface w-full max-w-md rounded-md p-5 lg:justify-self-end">
            <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/48">
              {t.hero.statusKicker}
            </p>
            <div className="grid gap-3 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white/70">
              {statusItems.map((text, index) => (
                <span key={text} className="flex items-center gap-3 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
                  <span className="font-mono text-primary/80">{String(index + 1).padStart(2, "0")}</span>
                  {text}
                </span>
              ))}
            </div>
            <div className="soft-divider my-5" />

            <button
              type="button"
              onClick={() => onNavigate("download")}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-white/64 transition-colors hover:text-white"
            >
              <ShoppingCart className="h-4 w-4 text-primary/85" />
              {t.hero.wishlist}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
