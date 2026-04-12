import { motion } from "motion/react";
import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.story, href: "#story" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.trailer, href: "#trailer" },
    { name: t.nav.features, href: "#features" },
    { name: t.nav.download, href: "#download" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Ghost className="w-8 h-8 text-primary animate-pulse" />
            <span className="font-heading text-xl tracking-tighter text-glow-red">
              SUBJECT 14
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-widest uppercase"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" className="hidden sm:inline-flex border-primary/50 hover:bg-primary/20 text-primary uppercase tracking-widest text-xs">
              {t.nav.wishlist}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
