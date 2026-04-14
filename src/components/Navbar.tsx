import { useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import type { SectionId } from "../App";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type NavbarProps = {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
};

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t.nav.home, section: "home" },
    { name: t.nav.about, section: "about" },
    { name: t.nav.story, section: "story" },
    { name: t.nav.gallery, section: "gallery" },
    { name: t.nav.trailer, section: "trailer" },
    { name: t.nav.features, section: "features" },
    { name: t.nav.download, section: "download" },
  ] satisfies { name: string; section: SectionId }[];

  const isActive = (section: SectionId) => activeSection === section;

  const navLinkClass = (section: SectionId) =>
    `text-sm font-medium transition-colors duration-300 tracking-widest uppercase ${
      isActive(section) ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

  const navigate = (section: SectionId) => {
    setMobileMenuOpen(false);
    onNavigate(section);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="group flex items-center transition-colors duration-300"
            aria-label="Go to home"
          >
            <span className="font-heading text-xl tracking-tighter text-glow-red transition-opacity duration-300 group-hover:opacity-80">
              SUBJECT 14
            </span>
          </button>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(item.section)}
                  className={navLinkClass(item.section)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="outline"
              onClick={() => navigate("download")}
              className="hidden sm:inline-flex border-primary/50 hover:bg-primary/20 text-primary uppercase tracking-widest text-xs"
            >
              {t.nav.wishlist}
            </Button>
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="md:hidden text-foreground hover:bg-white/10"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu className="w-5 h-5" />
              </DialogTrigger>
              <DialogContent className="md:hidden bg-background/95 backdrop-blur-md border-horror p-6">
                <DialogTitle className="text-glow-red uppercase tracking-[0.3em] text-xs">
                  Navigate
                </DialogTitle>
                <div className="mt-4 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => navigate(item.section)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm uppercase tracking-[0.3em] transition-colors ${
                        isActive(item.section)
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/30 hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => navigate("download")}
                    className="mt-2 border-primary/50 hover:bg-primary/20 text-primary uppercase tracking-widest text-xs"
                  >
                    {t.nav.wishlist}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
