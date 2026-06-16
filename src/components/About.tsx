import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function About() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden px-0 py-20 sm:py-24 lg:items-center"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={siteContent.about.imageUrl}
          alt="Asylum Corridor"
          className="h-full w-full scale-105 object-cover object-center grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.58)_48%,rgba(0,0,0,0.30)),linear-gradient(180deg,rgba(0,0,0,0.52),rgba(0,0,0,0.86))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_34%,rgba(179,32,32,0.24),transparent_30%)]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="section-copy-kicker mb-4 text-primary/85">Facility Overview</p>
          <h2 className="text-glow-red mb-7 max-w-2xl font-heading text-4xl uppercase leading-[0.98] tracking-[0.08em] text-white sm:text-6xl lg:text-7xl">
            {t.about.title}
          </h2>
          <div className="space-y-5 text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
            <p className="border-l-2 border-primary/70 bg-black/45 px-5 py-4 font-mono text-sm uppercase tracking-[0.08em] text-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:text-base">
              [LOG_ENTRY_014]: {t.about.p1}
            </p>
            <p className="max-w-2xl">{t.about.p2}</p>
            <p className="max-w-2xl text-white/64 italic">{t.about.p3}</p>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/68 sm:grid-cols-3">
            <span className="border border-white/12 bg-black/35 px-4 py-3 backdrop-blur-sm">UE5 Facility</span>
            <span className="border border-white/12 bg-black/35 px-4 py-3 backdrop-blur-sm">Adaptive Threat</span>
            <span className="border border-white/12 bg-black/35 px-4 py-3 backdrop-blur-sm">Puzzle Access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
