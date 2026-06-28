import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Download() {
  const { t } = useLanguage();

  return (
    <section id="download" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%,rgba(0,0,0,0.38))] pointer-events-none" />

      <div className="section-frame relative z-10">
        <div className="wide-cta-panel panel-film border-horror mx-auto max-w-6xl rounded-lg p-6 text-left backdrop-blur-sm sm:p-8 lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-copy-kicker mb-4">System Check</p>
            <h2 className="section-heading mb-6">System Requirements</h2>
            <p className="mb-8 max-w-2xl text-xl font-light text-white/68">
              Recommended hardware for entering the facility when the playable build is ready.
            </p>

            <div className="grid grid-cols-1 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/40 text-start md:grid-cols-2">
              <div className="border-b border-white/10 p-8 md:border-b-0 md:border-e">
                <h3 className="mb-6 flex items-center gap-2 font-heading text-sm uppercase tracking-[0.2em] text-primary">
                  <div className="h-4 w-1 bg-primary" />
                  {t.download.minReq}
                </h3>
                <ul className="space-y-4 font-mono text-xs">
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.os}</span>
                    <span className="text-muted-foreground">Windows 10 64-bit</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.processor}</span>
                    <span className="text-muted-foreground">Intel Core i5-8400 / AMD Ryzen 5 2600</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.memory}</span>
                    <span className="text-muted-foreground">8 GB RAM</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.graphics}</span>
                    <span className="text-muted-foreground">NVIDIA GeForce GTX 1060 6 GB / AMD Radeon RX 580</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.directx}</span>
                    <span className="text-muted-foreground">Version 12</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.storage}</span>
                    <span className="text-muted-foreground">15 GB available space</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-primary/5">
                <h3 className="mb-6 flex items-center gap-2 font-heading text-sm uppercase tracking-[0.2em] text-primary">
                  <div className="h-4 w-1 bg-primary" />
                  {t.download.recReq}
                </h3>
                <ul className="space-y-4 font-mono text-xs">
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.os}</span>
                    <span className="text-muted-foreground">Windows 10/11 64-bit</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.processor}</span>
                    <span className="text-muted-foreground">Intel Core i5-12400 / AMD Ryzen 5 5600</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.memory}</span>
                    <span className="text-muted-foreground">16 GB RAM</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.graphics}</span>
                    <span className="text-muted-foreground">NVIDIA GeForce RTX 3060 / AMD Radeon RX 6700 XT</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.directx}</span>
                    <span className="text-muted-foreground">Version 12</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50 uppercase text-[10px] tracking-widest">{t.download.storage}</span>
                    <span className="text-muted-foreground">15 GB available space</span>
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
