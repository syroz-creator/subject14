import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function About() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(170,35,35,0.12),transparent_28%)]" />
      <div className="section-frame">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-copy-kicker mb-4">Facility Overview</p>
            <h2 className="section-heading mb-8 max-w-xl">{t.about.title}</h2>
            <div className="space-y-6 text-lg leading-relaxed text-white/68">
              <p className="border-l-2 border-primary/40 bg-primary/[0.07] px-5 py-4 font-mono text-base uppercase tracking-[0.08em] text-white/82">
                [LOG_ENTRY_014]: {t.about.p1}
              </p>
              <p>{t.about.p2}</p>
              <p className="italic opacity-80">{t.about.p3}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="panel-film border-horror aspect-[4/5] overflow-hidden rounded-[1.6rem]">
              <img
                src={siteContent.about.imageUrl}
                alt="Asylum Corridor"
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-5 -right-5 h-24 w-24 border-r border-t border-primary/50" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-primary/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
