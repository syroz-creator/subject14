import { motion } from "motion/react";
import { Eye, Zap, BookOpen, Map, Volume2, Skull } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "../context/SiteContentContext";

export default function Features() {
  const { siteContent } = useSiteContent();

  const features = [
    {
      icon: Eye,
      title: siteContent.features.items[0]?.title ?? "",
      description: siteContent.features.items[0]?.description ?? "",
    },
    {
      icon: Zap,
      title: siteContent.features.items[1]?.title ?? "",
      description: siteContent.features.items[1]?.description ?? "",
    },
    {
      icon: BookOpen,
      title: siteContent.features.items[2]?.title ?? "",
      description: siteContent.features.items[2]?.description ?? "",
    },
    {
      icon: Map,
      title: siteContent.features.items[3]?.title ?? "",
      description: siteContent.features.items[3]?.description ?? "",
    },
    {
      icon: Volume2,
      title: siteContent.features.items[4]?.title ?? "",
      description: siteContent.features.items[4]?.description ?? "",
    },
    {
      icon: Skull,
      title: siteContent.features.items[5]?.title ?? "",
      description: siteContent.features.items[5]?.description ?? "",
    },
  ];

  return (
    <section id="features" className="min-h-[calc(100vh-8rem)] py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="max-w-[92rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-glow-red">{siteContent.features.title}</h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm">{siteContent.features.subtitle}</p>
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
              <Card className="h-full bg-card/35 border-horror hover:bg-card/50 transition-colors duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading tracking-widest text-lg uppercase">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-light">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
