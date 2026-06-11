import { motion } from "motion/react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function Gallery() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section id="gallery" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="section-frame relative z-10">
        <div className="mb-16 text-center">
          <p className="section-copy-kicker mb-4">Media Archive</p>
          <h2 className="section-heading mb-4">{t.gallery.title}</h2>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">{t.gallery.subtitle}</p>
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
                  <div className="panel-film border-horror group relative aspect-video cursor-pointer overflow-hidden rounded-[1.35rem]">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="font-mono text-sm uppercase tracking-[0.3em] text-white">{image.title}</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="h-screen max-w-none gap-0 border-none bg-black/92 p-0 ring-0 shadow-none sm:max-w-none"
                >
                  <DialogClose
                    aria-label="Close gallery image"
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-2xl text-white/90 transition-colors hover:bg-black/75 sm:h-12 sm:w-12 sm:text-3xl"
                  >
                    ×
                  </DialogClose>
                  <div className="flex h-screen w-screen items-center justify-center p-4 sm:p-8">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="max-h-full w-auto max-w-full object-contain shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
