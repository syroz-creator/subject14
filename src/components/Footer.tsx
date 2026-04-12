import { Ghost, Twitter, Youtube, Instagram, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Ghost className="w-6 h-6 text-primary" />
            <span className="font-heading text-lg tracking-tighter text-glow-red">
              SUBJECT 14
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>

          <div className="text-xs text-muted-foreground uppercase tracking-widest text-center md:text-end">
            <p>© 2024 SUBJECT 14. {t.footer.rights}</p>
            <p className="mt-1 text-[10px] opacity-50">{t.footer.credits}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
