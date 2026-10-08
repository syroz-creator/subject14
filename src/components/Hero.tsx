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
    <section id="home" className="hero-stage relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={siteContent.hero.backgroundUrl}
          alt="Horror Background"
          className="h-full w-full object-cover object-center opacity-72 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(214,38,38,0.20),transparent_22%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_14%),linear-gradient(90deg,rgba(1,3,7,0.82)_0%,rgba(6,2,3,0.48)_45%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80" />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute inset-0 hero-scanlines pointer-events-none" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      <div className="section-frame relative z-10 flex w-full items-center justify-center pt-24 lg:min-h-screen lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="hero-content flex w-full max-w-[62rem] flex-col items-center py-12 text-center sm:py-16 lg:py-0"
        >
          <div className="hero-title-stack animate-flicker mb-5 w-full leading-none uppercase">
            <h1 className="text-glow-red hero-title-word font-heading text-[clamp(3.8rem,17vw,10.8rem)] tracking-[0.03em] text-white">
              {titleTop}
            </h1>
            {titleRest.length > 0 ? (
              <h1 className="text-glow-red hero-title-word hero-title-word-danger font-heading -mt-1 text-[clamp(3.8rem,17vw,10.8rem)] tracking-[0.03em] text-primary">
                {titleBottom}
              </h1>
            ) : null}
          </div>

          <p className="mb-4 max-w-2xl font-mono text-xs uppercase tracking-[0.22em] text-primary sm:text-sm sm:tracking-[0.32em]">
            {t.hero.tagline}
          </p>
          <p className="mb-8 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
            {t.hero.description}
          </p>

          <div className="flex w-full max-w-[44rem] flex-col items-stretch justify-center gap-4 sm:flex-row">
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

          <div className="mt-7 w-full max-w-[44rem] border-t border-white/10 pt-4">
            <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/38">
              {t.hero.statusKicker}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/58">
              {statusItems.map((text, index) => (
                <span key={text} className="inline-flex items-center gap-3">
                  {index > 0 ? <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" /> : null}
                  {text}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("download")}
            className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            {t.hero.wishlist}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
