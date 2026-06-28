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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68),rgba(0,0,0,0.36)_54%,rgba(0,0,0,0.58)),linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.50))]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-left"
        >
          <p className="section-copy-kicker mb-4 text-primary/85">Gameplay Overview</p>
          <h2 className="text-glow-red mb-7 max-w-2xl font-heading text-5xl uppercase leading-none tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
            Survive the System
          </h2>
          <div className="space-y-6 text-base leading-7 text-white/86 [text-shadow:0_2px_18px_rgba(0,0,0,0.85)] sm:text-lg sm:leading-8">
            <p className="max-w-2xl">{t.about.p2}</p>
            <div className="grid max-w-4xl gap-3 text-left sm:grid-cols-3">
              {[
                ["Explore", "Search connected rooms for keys, evidence, and routes back to safety."],
                ["Solve", "Restore power, open locked paths, and read the environment before moving."],
                ["Survive", "Stay ahead of the entity while the facility reacts to your choices."],
              ].map(([title, copy]) => (
                <div key={title} className="border-l border-primary/40 bg-black/22 px-4 py-4 backdrop-blur-[2px]">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-primary">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/78">{copy}</p>
                </div>
              ))}
            </div>
            <p className="max-w-2xl text-white/78 italic">{t.about.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
