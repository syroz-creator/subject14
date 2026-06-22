import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
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
                  <button
                    type="button"
                    aria-label={`Open ${image.title}`}
                    className="panel-film border-horror group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 focus-visible:-translate-y-1 focus-visible:border-primary/45 focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_20%,rgba(0,0,0,0.76)_100%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <div className="flex min-h-14 items-end justify-between gap-3 border-t border-white/16 bg-black/32 px-3 py-3 backdrop-blur-[2px]">
                        <span className="line-clamp-2 min-w-0 font-mono text-[0.72rem] font-bold uppercase leading-5 tracking-[0.14em] text-white sm:text-[0.78rem]">
                          {image.title}
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/8 text-white/80 transition-colors duration-300 group-hover:border-primary/45 group-hover:text-primary group-focus-visible:border-primary/45 group-focus-visible:text-primary">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </button>
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
