import { motion } from "motion/react";
import { Eye, Zap, BookOpen, Map, Volume2, Skull } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Eye,
      title: t.features.f1.title,
      description: t.features.f1.desc,
    },
    {
      icon: Zap,
      title: t.features.f2.title,
      description: t.features.f2.desc,
    },
    {
      icon: BookOpen,
      title: t.features.f3.title,
      description: t.features.f3.desc,
    },
    {
      icon: Map,
      title: t.features.f4.title,
      description: t.features.f4.desc,
    },
    {
      icon: Volume2,
      title: t.features.f5.title,
      description: t.features.f5.desc,
    },
    {
      icon: Skull,
      title: t.features.f6.title,
      description: t.features.f6.desc,
    },
  ];

  return (
    <section id="features" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="section-frame relative z-10">
        <div className="mb-16 text-center">
          <p className="section-copy-kicker mb-4">Core Features</p>
          <h2 className="section-heading mb-4">{t.features.title}</h2>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="panel-film border-horror h-full rounded-[1.35rem] bg-card/35 transition-colors duration-300 group hover:bg-card/50">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg uppercase tracking-[0.08em]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-light text-white/68">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
