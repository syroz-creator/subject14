import { motion } from "motion/react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function Trailer() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  const handleTrailerClick = () => {
    if (siteContent.trailer.videoUrl) {
      window.open(siteContent.trailer.videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="trailer" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.05] to-transparent pointer-events-none" />
      <div className="section-frame relative z-10">
        <div className="mb-16 text-center">
          <p className="section-copy-kicker mb-4">Official Footage</p>
          <h2 className="section-heading mb-4">{t.trailer.title}</h2>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">{t.trailer.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="panel-film border-horror group relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] shadow-[0_0_50px_rgba(139,0,0,0.16)]"
        >
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <img
                src={siteContent.trailer.thumbnailUrl}
                alt="Trailer Thumbnail"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleTrailerClick}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition-all group-hover:shadow-primary/60"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </motion.button>
            </div>
          </AspectRatio>
          
          <div className="absolute inset-0 pointer-events-none border-[20px] border-black/40" />
        </motion.div>
      </div>
    </section>
  );
}
