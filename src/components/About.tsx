import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading mb-8 text-glow-red">{t.about.title}</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p className="font-mono text-sm border-s-2 border-primary/20 ps-4 py-2 bg-primary/5">
                [LOG_ENTRY_014]: {t.about.p1}
              </p>
              <p>
                <span className="text-primary font-medium">Subject 14</span> {t.about.p2.split("Subject 14")[1]}
              </p>
              <p className="italic opacity-80">
                {t.about.p3}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden border-horror">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1974&auto=format&fit=crop"
                alt="Asylum Corridor"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
