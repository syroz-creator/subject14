import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSiteContent } from "../context/SiteContentContext";

export default function Gallery() {
  const { siteContent } = useSiteContent();

  return (
    <section id="gallery" className="min-h-[calc(100vh-8rem)] py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="max-w-[92rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-glow-red">{siteContent.gallery.title}</h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm">{siteContent.gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
          {siteContent.gallery.items.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer border-horror">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-heading tracking-widest uppercase text-sm">{image.title}</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl bg-transparent border-none p-0">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto rounded-lg shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
