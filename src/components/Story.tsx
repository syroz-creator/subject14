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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,12,16,0.84),rgba(9,12,16,0.46)_52%,rgba(4,5,6,0.74)),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.56))]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="readable-surface max-w-3xl rounded-md p-5 text-left sm:p-7 lg:p-9"
        >
          <p className="section-copy-kicker mb-4 text-primary/85">Case File</p>
          <h2 className="section-heading mb-7 max-w-2xl">
            {t.story.title}
          </h2>
          <div className="space-y-5 text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            <p className="max-w-2xl rounded-md border border-primary/24 bg-primary/8 px-5 py-4 font-mono text-sm uppercase tracking-[0.04em] text-white/88 sm:text-base">
              {t.story.p1}
            </p>
            <p className="max-w-2xl">{t.story.p2}</p>
            <p className="max-w-2xl border-l border-primary/45 pl-4 text-primary/84">{t.story.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
