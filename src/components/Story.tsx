import { motion } from "motion/react";
import { useSiteContent } from "../context/SiteContentContext";

export default function Story() {
  const { siteContent } = useSiteContent();

  return (
    <section id="story" className="min-h-[calc(100vh-8rem)] py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
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
                className="relative rounded-lg border-horror grayscale hover:grayscale-0 transition-all duration-700"
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
            <h2 className="text-4xl md:text-5xl font-heading mb-8 text-glow-red">{siteContent.story.title}</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-mono">
              <p className="border-s-2 border-primary/30 ps-6 italic">
                {siteContent.story.p1}
              </p>
              <p>
                {siteContent.story.p2}
              </p>
              <p className="text-primary/80">
                {siteContent.story.p3}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
