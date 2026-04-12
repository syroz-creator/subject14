import { motion } from "motion/react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" },
    { code: "he", label: "עברית" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-[10px]"
        >
          <Globe className="w-3 h-3" />
          <span>{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-horror min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-primary/10 focus:bg-primary/10 text-xs uppercase tracking-widest py-2"
          >
            <span className={language === lang.code ? "text-primary font-bold" : "text-muted-foreground"}>
              {lang.label}
            </span>
            {language === lang.code && <Check className="w-3 h-3 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
