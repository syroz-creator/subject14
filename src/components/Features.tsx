import { motion } from "motion/react";
import { Eye, Zap, BookOpen, Map, Volume2, Skull } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function Features() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  const fallbackFeatures = [
    { title: t.features.f1.title, description: t.features.f1.desc },
    { title: t.features.f2.title, description: t.features.f2.desc },
    { title: t.features.f3.title, description: t.features.f3.desc },
    { title: t.features.f4.title, description: t.features.f4.desc },
    { title: t.features.f5.title, description: t.features.f5.desc },
    { title: t.features.f6.title, description: t.features.f6.desc },
  ];
  const icons = [Eye, Zap, BookOpen, Map, Volume2, Skull];
  const featureItems = siteContent.features.items.length ? siteContent.features.items : fallbackFeatures;
  const features = featureItems.map((feature, index) => ({
    ...feature,
    icon: icons[index % icons.length],
    signal: `${String(index + 1).padStart(2, "0")} / ${String(featureItems.length).padStart(2, "0")}`,
  }));

  return (
    <section id="features" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(179,32,32,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%,rgba(179,32,32,0.05))]" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="section-frame relative z-10">
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-copy-kicker mb-4 text-primary/85">Core Features</p>
            <h2 className="section-heading mb-4">{siteContent.features.title || t.features.title}</h2>
            <p className="max-w-2xl font-mono text-sm uppercase leading-6 tracking-[0.24em] text-muted-foreground">
              {siteContent.features.subtitle || t.features.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 border border-white/10 bg-black/28 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/62 backdrop-blur-sm sm:w-[26rem]">
            <span className="border-r border-white/10 px-3 py-3 text-center">AI Hunt</span>
            <span className="border-r border-white/10 px-3 py-3 text-center">Puzzles</span>
            <span className="px-3 py-3 text-center">UE5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                tabIndex={0}
                aria-label={`${feature.title}: ${feature.description}`}
                className="group/feature panel-film border-horror h-full min-h-60 overflow-hidden rounded-lg bg-card/35 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-card/55 focus-visible:-translate-y-1 focus-visible:border-primary/45 focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <CardHeader className="relative z-10 gap-5 pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/12 transition-all duration-300 group-hover/feature:bg-primary/20 group-focus-visible/feature:bg-primary/20">
                      <feature.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover/feature:scale-110 group-focus-visible/feature:scale-110" />
                    </div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary/70">
                      {feature.signal}
                    </span>
                  </div>
                  <CardTitle className="text-balance font-heading text-xl uppercase leading-tight tracking-[0.08em] text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 mt-auto">
                  <p className="border-t border-white/10 pt-4 text-sm leading-6 text-white/68 sm:text-[0.95rem]">
                    {feature.description}
                  </p>
                  <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all duration-500 group-hover/feature:bg-primary group-focus-visible/feature:bg-primary"
                      style={{ width: `${Math.max(32, ((index + 1) / features.length) * 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
