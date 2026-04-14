import { motion } from "motion/react";
import { Play, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";
import type { SectionId } from "../App";

type HeroProps = {
  onNavigate: (section: SectionId) => void;
};

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteContent.hero.backgroundUrl}
          alt="Horror Background"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-9xl font-heading mb-4 tracking-tighter text-glow-red animate-flicker">
            {siteContent.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-primary/80 mb-2 font-mono tracking-[0.5em] uppercase">
            {siteContent.hero.tagline}
          </p>
          <p className="text-muted-foreground mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {siteContent.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => onNavigate("download")}
              className="bg-primary hover:bg-primary/80 text-white px-8 py-7 text-lg uppercase tracking-widest h-auto group w-full sm:w-auto"
            >
              <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              {t.hero.download}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("trailer")}
              className="border-white/20 hover:bg-white/10 text-white px-8 py-7 text-lg uppercase tracking-widest h-auto w-full sm:w-auto"
            >
              <Play className="mr-2 w-5 h-5 fill-current" />
              {t.hero.trailer}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => onNavigate("download")}
              className="text-muted-foreground hover:text-primary px-8 py-7 text-lg uppercase tracking-widest h-auto w-full sm:w-auto group"
            >
              <ShoppingCart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              {t.hero.wishlist}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
