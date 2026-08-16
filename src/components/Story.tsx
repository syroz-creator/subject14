import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function Story() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section
      id="story"
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={siteContent.story.imageUrl}
          alt="Story Atmosphere"
          className="h-full w-full scale-[1.02] object-cover object-center brightness-105 contrast-105 saturate-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.70),rgba(0,0,0,0.34)_52%,rgba(0,0,0,0.62)),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.50))]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-left"
        >
          <p className="section-copy-kicker mb-4 text-primary/85">Case File</p>
          <h2 className="text-glow-red mb-7 max-w-2xl font-heading text-5xl uppercase leading-none tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
            {t.story.title}
          </h2>
          <div className="space-y-5 text-base leading-7 text-white/84 [text-shadow:0_2px_18px_rgba(0,0,0,0.85)] sm:text-lg sm:leading-8">
            <p className="max-w-2xl border-l-2 border-primary bg-black/18 px-5 py-4 font-mono text-sm uppercase tracking-[0.04em] text-white/92 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-[2px] sm:text-base">
              {t.story.p1}
            </p>
            <p className="max-w-2xl">{t.story.p2}</p>
            <p className="max-w-2xl text-primary/82">{t.story.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
