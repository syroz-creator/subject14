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
          className="h-full w-full scale-105 object-cover object-center brightness-100 contrast-110 saturate-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42),rgba(0,0,0,0.24)_44%,rgba(0,0,0,0.04)_78%),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.44))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(179,32,32,0.10),transparent_34%)]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-copy-kicker mb-4 text-primary/85">Case File</p>
          <h2 className="text-glow-red mx-auto mb-7 max-w-2xl font-heading text-4xl uppercase leading-none tracking-[0.08em] text-white sm:text-5xl lg:text-6xl">
            {t.story.title}
          </h2>
          <div className="space-y-5 text-base leading-7 text-white/86 [text-shadow:0_2px_18px_rgba(0,0,0,0.85)] sm:text-lg sm:leading-8">
            <p className="mx-auto max-w-2xl border-y border-primary/35 bg-black/20 px-5 py-4 font-mono text-sm uppercase tracking-[0.08em] text-white/95 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-[2px] sm:text-base">
              {t.story.p1}
            </p>
            <p className="mx-auto max-w-2xl">{t.story.p2}</p>
            <p className="mx-auto max-w-2xl text-primary/82">{t.story.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
