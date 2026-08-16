import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";
import type { GalleryItem } from "../site-content";

type GalleryGroup = {
  title: string;
  matches: string[];
};

const galleryGroups: GalleryGroup[] = [
  {
    title: "Laboratory Rooms",
    matches: ["Bloodied Research Lab", "Autopsy Room", "Chemical Storage Lab"],
  },
  {
    title: "Routes and Doors",
    matches: ["Lab Access Corridor", "Locker Service Hall", "Restricted Door", "Stairwell Access"],
  },
  {
    title: "Containment and Monitoring",
    matches: ["Containment Cell Block", "Observation Desk"],
  },
];

function GalleryCard({ image, index, position, total }: { image: GalleryItem; index: number; position: number; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.06, 0.3) }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`Open ${image.title}`}
            className="border-horror group relative aspect-video w-full cursor-pointer overflow-hidden rounded-md bg-black text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:-translate-y-1 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <img
              src={image.url}
              alt={image.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.12)_46%,rgba(0,0,0,0.84)_100%)] transition-opacity duration-300 group-hover:opacity-95 group-focus-visible:opacity-95" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <div className="flex min-h-14 items-center justify-between gap-3 rounded-sm border border-white/12 bg-black/62 px-3 py-3 backdrop-blur-[3px]">
                <span className="line-clamp-2 min-w-0 font-mono text-[0.72rem] font-semibold uppercase leading-5 tracking-[0.06em] text-white sm:text-[0.78rem]">
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
          <DialogTitle className="sr-only">{image.title}</DialogTitle>
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
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/72 px-4 py-3 backdrop-blur-sm sm:px-8 sm:py-4">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/78">{image.title}</p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/38">
                {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();
  const groupedGallery = galleryGroups
    .map((group) => ({
      ...group,
      items: group.matches
        .map((title) => siteContent.gallery.items.find((item) => item.title === title))
        .filter((item): item is GalleryItem => Boolean(item)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="gallery" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="section-frame relative z-10">
        <div className="mb-16 text-center">
          <p className="section-copy-kicker mb-4">Media Archive</p>
          <h2 className="section-heading mb-4">{t.gallery.title}</h2>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">{t.gallery.subtitle}</p>
        </div>

        <div className="space-y-12">
          {groupedGallery.map((group, groupIndex) => (
            <div key={group.title}>
              <div className="mb-5 border-l border-primary/45 pl-4 text-left">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                    Archive {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl uppercase tracking-[0.02em] text-white">
                    {group.title}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                {group.items.map((image, index) => (
                  <div key={image.title}>
                    <GalleryCard image={image} index={index} position={index + 1} total={group.items.length} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
