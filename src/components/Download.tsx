import { motion } from "motion/react";
import { MonitorDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Download() {
  const { t } = useLanguage();
  const availabilityItems = [
    [t.download.buildStatusLabel, t.download.buildStatusValue],
    [t.download.platformLabel, t.download.platformValue],
    [t.download.accessLabel, t.download.accessValue],
  ];

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
            <p className="section-copy-kicker mb-4">{t.download.systemCheck}</p>
            <h2 className="section-heading mb-6">{t.download.systemRequirements}</h2>
            <p className="mb-8 max-w-2xl text-xl font-light text-white/68">
              {t.download.hardware}
            </p>

            <div className="mb-8 border-y border-white/10 py-5">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="flex gap-4">
                  <span className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/8 text-primary sm:flex">
                    <MonitorDown className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="section-copy-kicker mb-2 text-primary">{t.download.availabilityTitle}</p>
                    <p className="max-w-3xl text-sm leading-6 text-white/66 sm:text-base">
                      {t.download.availabilityBody}
                    </p>
                  </div>
                </div>
                <dl className="grid gap-x-5 gap-y-3 border-t border-white/10 pt-4 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
                  {availabilityItems.map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/34">{label}</dt>
                      <dd className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white/74">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

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
                    <span className="text-muted-foreground">NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800</span>
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
