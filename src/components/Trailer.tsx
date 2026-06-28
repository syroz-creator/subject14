import { motion } from "motion/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

export default function Trailer() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section id="trailer" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_36%,rgba(0,0,0,0.35))] pointer-events-none" />
      <div className="section-frame relative z-10">
        <div className="mb-12 text-left">
          <p className="section-copy-kicker mb-4">Official Footage</p>
          <h2 className="section-heading mb-4">{t.trailer.title}</h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">{t.trailer.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="wide-media-panel border-horror group relative mx-auto max-w-6xl overflow-hidden rounded-lg bg-black shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
        >
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <img
                src={siteContent.trailer.thumbnailUrl || "/game-logo.png"}
                alt="Subject 14 logo"
                className="h-full w-full object-contain p-10 sm:p-16"
                referrerPolicy="no-referrer"
              />
            </div>
          </AspectRatio>
          
          <div className="pointer-events-none absolute inset-0 border border-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
