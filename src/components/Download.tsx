import { motion } from "motion/react";
import { Download as DownloadIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";

export default function Download() {
  const { t } = useLanguage();

  return (
    <section id="download" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card/40 border-horror rounded-3xl p-12 text-center backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading mb-6 text-glow-red">{t.download.title}</h2>
            <p className="text-xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto">
              {t.download.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white px-10 py-8 text-xl uppercase tracking-widest h-auto w-full sm:w-auto">
                <DownloadIcon className="mr-3 w-6 h-6" />
                {t.download.demo}
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-10 py-8 text-xl uppercase tracking-widest h-auto w-full sm:w-auto">
                <ShoppingCart className="mr-3 w-6 h-6" />
                {t.download.steam}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-start border border-white/10 rounded-xl overflow-hidden bg-black/40">
              <div className="p-8 border-b md:border-b-0 md:border-e border-white/10">
                <h3 className="text-sm font-heading uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary" />
                  {t.download.minReq}
                </h3>
                <ul className="text-xs space-y-4 font-mono">
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.os}</span>
                    <span className="text-muted-foreground">Windows 10 64-bit</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.processor}</span>
                    <span className="text-muted-foreground">Intel Core i5-10400F / AMD Ryzen 5 3600</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.memory}</span>
                    <span className="text-muted-foreground">16 GB RAM</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.graphics}</span>
                    <span className="text-muted-foreground">NVIDIA GTX 1660 / AMD RX 5600 XT</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.directx}</span>
                    <span className="text-muted-foreground">Version 12</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.storage}</span>
                    <span className="text-muted-foreground">25 GB available space</span>
                  </li>
                  <li className="pt-2 text-[10px] text-primary/60 italic">
                    * {t.download.notes}: SSD recommended
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-primary/5">
                <h3 className="text-sm font-heading uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary" />
                  {t.download.recReq}
                </h3>
                <ul className="text-xs space-y-4 font-mono">
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.os}</span>
                    <span className="text-muted-foreground">Windows 11 64-bit</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.processor}</span>
                    <span className="text-muted-foreground">Intel Core i7-12700K / AMD Ryzen 7 7800X3D</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.memory}</span>
                    <span className="text-muted-foreground">32 GB RAM</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.graphics}</span>
                    <span className="text-muted-foreground">NVIDIA RTX 3070 / AMD RX 7800 XT</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.directx}</span>
                    <span className="text-muted-foreground">Version 12</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.storage}</span>
                    <span className="text-muted-foreground">25 GB available space on SSD</span>
                  </li>
                  <li className="pt-2 text-[10px] text-primary/60 italic">
                    * {t.download.notes}: Recommended for high settings
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
