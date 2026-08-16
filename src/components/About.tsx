import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function About() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-0 py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={siteContent.about.imageUrl}
          alt="Asylum Corridor"
          className="h-full w-full scale-[1.02] object-cover object-center brightness-105 contrast-105 saturate-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,12,16,0.82),rgba(9,12,16,0.48)_55%,rgba(5,6,7,0.72)),linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.58))]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="readable-surface max-w-4xl rounded-md p-5 text-left sm:p-7 lg:p-9"
        >
          <p className="section-copy-kicker mb-4 text-primary/85">Gameplay Overview</p>
          <h2 className="section-heading mb-7 max-w-2xl">
            Survive the System
          </h2>
          <div className="space-y-6 text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
            <p className="max-w-2xl">{t.about.p2}</p>
            <div className="grid max-w-4xl gap-3 text-left sm:grid-cols-3">
              {[
                ["Explore", "Search connected rooms for keys, evidence, and routes back to safety."],
                ["Solve", "Restore power, open locked paths, and read the environment before moving."],
                ["Survive", "Stay ahead of the entity while the facility reacts to your choices."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-4">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-primary">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/72">{copy}</p>
                </div>
              ))}
            </div>
            <p className="max-w-2xl border-l border-primary/45 pl-4 text-white/76 italic">{t.about.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
