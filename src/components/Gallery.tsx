import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  const { t } = useLanguage();

  const images = [
    {
      url: "https://images.unsplash.com/photo-1505630285033-a0f83683a52b?q=80&w=2070&auto=format&fit=crop",
      title: t.gallery.img1,
    },
    {
      url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
      title: t.gallery.img2,
    },
    {
      url: "https://images.unsplash.com/photo-1519074063912-ad2d6d51dd2d?q=80&w=1974&auto=format&fit=crop",
      title: t.gallery.img3,
    },
    {
      url: "https://images.unsplash.com/photo-1534177714502-04416b5a3cde?q=80&w=2070&auto=format&fit=crop",
      title: t.gallery.img4,
    },
    {
      url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2070&auto=format&fit=crop",
      title: t.gallery.img5,
    },
    {
      url: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=2070&auto=format&fit=crop",
      title: t.gallery.img6,
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-glow-red">{t.gallery.title}</h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm">{t.gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
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
