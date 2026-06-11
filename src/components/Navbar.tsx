import { useState } from "react";
import { motion } from "motion/react";
import { Download, Menu } from "lucide-react";
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
    `nav-link text-[0.72rem] font-bold transition-colors duration-300 tracking-[0.16em] uppercase ${
      isActive(section) ? "text-primary" : "text-white/65 hover:text-white"
    }`;

  const navigate = (section: SectionId) => {
    setMobileMenuOpen(false);
    onNavigate(section);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-black/72 backdrop-blur-xl"
    >
      <div className="nav-frame mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between gap-4 xl:grid xl:h-24 xl:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] xl:justify-normal">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="group text-left transition-colors duration-300 lg:justify-self-center"
            aria-label="Go to home"
          >
            <span className="nav-brand block font-heading text-[1.55rem] uppercase tracking-[0.12em] text-white transition-opacity duration-300 group-hover:opacity-80 sm:text-[1.8rem] lg:text-[1.95rem]">
              SUBJECT 14
            </span>
          </button>

          <div className="hidden justify-self-center xl:block">
            <div className="flex items-center gap-6 2xl:gap-9">
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

          <div className="flex items-center gap-2 sm:gap-4 lg:justify-self-center">
            <div className="hidden items-center text-white/65 xl:flex">
              <LanguageSwitcher />
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("download")}
              className="hidden min-h-12 rounded-[0.85rem] bg-primary px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-primary/90 sm:inline-flex"
            >
              <Download className="mr-2 h-4 w-4" />
              Play Now
            </Button>
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="xl:hidden text-foreground hover:bg-white/10"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu className="w-5 h-5" />
              </DialogTrigger>
              <DialogContent className="xl:hidden border-horror bg-black/95 p-5 backdrop-blur-md sm:p-6">
                <DialogTitle className="text-xs uppercase tracking-[0.3em] text-primary">
                  Navigate
                </DialogTitle>
                <div className="mt-4 flex flex-col gap-2.5 sm:gap-3">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => navigate(item.section)}
                      className={`rounded-lg border px-3.5 py-2.5 text-left text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.24em] ${
                        isActive(item.section)
                          ? "border-primary/50 bg-primary/12 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-primary/30 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/45">Language</div>
                    <LanguageSwitcher />
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("download")}
                    className="mt-2 min-h-10 rounded-[0.75rem] bg-primary text-[0.7rem] uppercase tracking-[0.1em] text-white hover:bg-primary/90 sm:min-h-12 sm:rounded-[0.85rem] sm:text-xs sm:tracking-[0.12em]"
                  >
                    <Download className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Play Now
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
