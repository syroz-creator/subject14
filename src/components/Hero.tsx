import { motion } from "motion/react";
import { Play, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2070&auto=format&fit=crop"
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
            SUBJECT 14
          </h1>
          <p className="text-lg md:text-xl text-primary/80 mb-2 font-mono tracking-[0.5em] uppercase">
            {t.hero.tagline}
          </p>
          <p className="text-muted-foreground mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/80 text-white px-8 py-7 text-lg uppercase tracking-widest h-auto group w-full sm:w-auto">
              <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              {t.hero.download}
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-8 py-7 text-lg uppercase tracking-widest h-auto w-full sm:w-auto">
              <Play className="mr-2 w-5 h-5 fill-current" />
              {t.hero.trailer}
            </Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-primary px-8 py-7 text-lg uppercase tracking-widest h-auto w-full sm:w-auto group">
              <ShoppingCart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              {t.hero.wishlist}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60">{t.hero.scroll}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
}
