import { useState } from "react";
import { motion } from "motion/react";
import { Download as DownloadIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { useSiteContent } from "../context/SiteContentContext";

type DeviceSupport =
  | { kind: "windows" }
  | { kind: "unsupported"; label: string; message: string };

function detectDeviceSupport(): DeviceSupport {
  if (typeof navigator === "undefined") {
    return { kind: "unsupported", label: "this device", message: "Unable to detect your device. Please use a Windows PC to install the demo." };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  const maxTouchPoints = navigator.maxTouchPoints ?? 0;

  const isIPhone = /iphone/.test(userAgent);
  const isIPad = /ipad/.test(userAgent) || (platform === "macintel" && maxTouchPoints > 1);
  const isIPod = /ipod/.test(userAgent);
  const isSamsung = /samsung|sm-|galaxy/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isMac = /macintosh|mac os x/.test(userAgent) && !isIPhone && !isIPad && !isIPod;
  const isWindows = /windows/.test(userAgent);
  const isLinux = /linux|x11/.test(userAgent) && !isAndroid;
  const isChromebook = /cros/.test(userAgent);

  if (isWindows) {
    return { kind: "windows" };
  }

  if (isIPhone) {
    return { kind: "unsupported", label: "iPhone", message: "This demo is not available on iPhone. Open this page on a Windows PC to install it." };
  }

  if (isIPad) {
    return { kind: "unsupported", label: "iPad", message: "This demo is not available on iPad. Open this page on a Windows PC to install it." };
  }

  if (isIPod) {
    return { kind: "unsupported", label: "iPod", message: "This demo is not available on iPod. Open this page on a Windows PC to install it." };
  }

  if (isSamsung) {
    return { kind: "unsupported", label: "Samsung device", message: "This demo is not available on Samsung phones or tablets. Open this page on a Windows PC to install it." };
  }

  if (isAndroid) {
    return { kind: "unsupported", label: "Android device", message: "This demo is not available on Android devices. Open this page on a Windows PC to install it." };
  }

  if (isMac) {
    return { kind: "unsupported", label: "Mac", message: "This demo is not available on macOS. Please use a Windows PC to install it." };
  }

  if (isChromebook) {
    return { kind: "unsupported", label: "Chromebook", message: "This demo is not available on Chromebook. Please use a Windows PC to install it." };
  }

  if (isLinux) {
    return { kind: "unsupported", label: "Linux device", message: "This demo is not available on Linux right now. Please use a Windows PC to install it." };
  }

  return { kind: "unsupported", label: "this device", message: "This game currently supports Windows PCs only." };
}

export default function Download() {
  const { t } = useLanguage();
  const { siteContent } = useSiteContent();
  const [deviceMessage, setDeviceMessage] = useState("");

  const handleDemoDownload = () => {
    const device = detectDeviceSupport();

    if (device.kind !== "windows") {
      setDeviceMessage(device.message);
      return;
    }

    if (!siteContent.download.demoUrl) {
      setDeviceMessage("Windows PC detected. Add your real demo download link in the operator panel.");
      return;
    }

    window.open(siteContent.download.demoUrl, "_blank", "noopener,noreferrer");
    setDeviceMessage("");
  };

  return (
    <section id="download" className="min-h-[calc(100vh-8rem)] py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[92rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto bg-card/25 border-horror rounded-3xl p-8 sm:p-10 lg:p-12 text-center backdrop-blur-sm">
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
              <Button
                size="lg"
                onClick={handleDemoDownload}
                className="bg-primary hover:bg-primary/80 text-white px-10 py-8 text-xl uppercase tracking-widest h-auto w-full sm:w-auto"
              >
                <DownloadIcon className="mr-3 w-6 h-6" />
                {t.download.demo}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  if (siteContent.download.steamUrl) {
                    window.open(siteContent.download.steamUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                className="border-white/20 hover:bg-white/10 text-white px-10 py-8 text-xl uppercase tracking-widest h-auto w-full sm:w-auto"
              >
                <ShoppingCart className="mr-3 w-6 h-6" />
                {t.download.steam}
              </Button>
            </div>

            {deviceMessage ? (
              <p className="mb-8 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary" aria-live="polite">
                {deviceMessage}
              </p>
            ) : null}

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
                <h3 className="text-sm font-heading uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary" />
                  {t.download.recReq}
                </h3>
                <ul className="text-xs space-y-4 font-mono">
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
