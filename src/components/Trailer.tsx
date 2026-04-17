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
    <section id="trailer" className="min-h-[calc(100vh-8rem)] py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.05] to-transparent pointer-events-none" />
      <div className="max-w-[92rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4 text-glow-red">{t.trailer.title}</h2>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm">{t.trailer.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group max-w-6xl mx-auto border-horror rounded-xl overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.2)]"
        >
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              {/* Placeholder for video */}
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
                className="relative z-10 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/40 group-hover:shadow-primary/60 transition-all"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </motion.button>
            </div>
          </AspectRatio>
          
          {/* Cinematic Frame Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-black/40" />
        </motion.div>
      </div>
    </section>
  );
}
