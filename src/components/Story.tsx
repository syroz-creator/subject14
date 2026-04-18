import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function Story() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section id="story" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
      
      <div className="section-frame relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 xl:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <img
                src={siteContent.story.imageUrl}
                alt="Story Atmosphere"
                className="panel-film border-horror relative rounded-[1.6rem] grayscale transition-all duration-700 hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <p className="section-copy-kicker mb-4">Case File</p>
            <h2 className="section-heading mb-8 max-w-xl">{t.story.title}</h2>
            <div className="space-y-6 text-lg leading-relaxed text-white/68">
              <p className="border-l-2 border-primary/30 pl-6 font-mono text-white/84 italic">{t.story.p1}</p>
              <p>{t.story.p2}</p>
              <p className="text-primary/80">{t.story.p3}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
