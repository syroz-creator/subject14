import { useEffect, useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import Trailer from "./components/Trailer";
import Features from "./components/Features";
import Download from "./components/Download";
import Footer from "./components/Footer";
import { SiteContentProvider } from "./context/SiteContentContext";

export type SectionId =
  | "home"
  | "about"
  | "story"
  | "gallery"
  | "trailer"
  | "features"
  | "download";

const validSections: SectionId[] = [
  "home",
  "about",
  "story",
  "gallery",
  "trailer",
  "features",
  "download",
];

function getSectionFromHash(): SectionId {
  if (typeof window === "undefined") {
    return "home";
  }

  const hash = window.location.hash.replace("#", "");
  return validSections.includes(hash as SectionId) ? (hash as SectionId) : "home";
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);

  useEffect(() => {
    const syncSectionFromHash = () => {
      setActiveSection(getSectionFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);
    return () => window.removeEventListener("hashchange", syncSectionFromHash);
  }, []);

  const navigateToSection = (section: SectionId) => {
    if (typeof window !== "undefined") {
      window.location.hash = section;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setActiveSection(section);
  };

  return (
    <LanguageProvider>
      <SiteContentProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
          <Navbar activeSection={activeSection} onNavigate={navigateToSection} />
          <main className="flex-1">
            {activeSection === "home" && <Hero onNavigate={navigateToSection} />}
            {activeSection === "about" && <About />}
            {activeSection === "story" && <Story />}
            {activeSection === "gallery" && <Gallery />}
            {activeSection === "trailer" && <Trailer />}
            {activeSection === "features" && <Features />}
            {activeSection === "download" && <Download />}
          </main>
          <Footer />
        </div>
      </SiteContentProvider>
    </LanguageProvider>
  );
}
