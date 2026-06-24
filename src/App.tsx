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
import Contact from "./components/Contact";
import LegalPage from "./components/LegalPage";
import Footer from "./components/Footer";
import OperatorPanel from "./components/OperatorPanel";
import { SiteContentProvider } from "./context/SiteContentContext";

export type SectionId =
  | "home"
  | "about"
  | "story"
  | "gallery"
  | "trailer"
  | "features"
  | "download"
  | "contact"
  | "operator"
  | "privacy"
  | "terms";

const validSections: SectionId[] = [
  "home",
  "about",
  "story",
  "gallery",
  "trailer",
  "features",
  "download",
  "contact",
  "operator",
  "privacy",
  "terms",
];

let visitorEntryLogged = false;
const VISITOR_ID_STORAGE_KEY = "subject14-visitor-id";

function getSectionFromHash(): SectionId {
  if (typeof window === "undefined") {
    return "home";
  }

  const hash = window.location.hash.replace("#", "");
  return validSections.includes(hash as SectionId) ? (hash as SectionId) : "home";
}

function logVisitorEntry() {
  if (visitorEntryLogged || typeof window === "undefined") {
    return;
  }

  visitorEntryLogged = true;
  let visitorId = "";

  try {
    visitorId = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY) || "";
    if (!visitorId) {
      visitorId = window.crypto.randomUUID();
      window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
    }
  } catch {
    visitorId = "";
  }

  void fetch("/api/visitor-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      visitorId,
      path: `${window.location.pathname}${window.location.hash || ""}`,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    }),
  }).catch(() => {
    visitorEntryLogged = false;
  });
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);

  useEffect(() => {
    logVisitorEntry();
  }, []);

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
        <div className="site-shell min-h-screen flex flex-col text-foreground selection:bg-primary/30 selection:text-primary-foreground">
          <div className="pointer-events-none fixed inset-0 z-0 bg-noise" />
          <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.00)_120px)]" />
          <Navbar activeSection={activeSection} onNavigate={navigateToSection} />
          <main className="relative z-10 flex-1">
            {activeSection === "home" && <Hero onNavigate={navigateToSection} />}
            {activeSection === "about" && <About />}
            {activeSection === "story" && <Story />}
            {activeSection === "gallery" && <Gallery />}
            {activeSection === "trailer" && <Trailer />}
            {activeSection === "features" && <Features />}
            {activeSection === "download" && <Download />}
            {activeSection === "contact" && <Contact />}
            {activeSection === "operator" && (
              <section id="operator" className="relative min-h-[calc(100vh-5rem)] overflow-hidden py-24 sm:py-28">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,32,32,0.12),transparent_36%)]" />
                <div className="section-frame relative z-10">
                  <div className="mb-8 text-center">
                    <p className="section-copy-kicker mb-4 text-primary/85">Command Access</p>
                    <h2 className="section-heading mb-4">Operator Panel</h2>
                    <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">
                      Edit live content and review visitor stats from a full-screen control surface.
                    </p>
                  </div>
                  <OperatorPanel />
                </div>
              </section>
            )}
            {activeSection === "privacy" && <LegalPage type="privacy" />}
            {activeSection === "terms" && <LegalPage type="terms" />}
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </SiteContentProvider>
    </LanguageProvider>
  );
}
