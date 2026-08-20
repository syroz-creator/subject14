import { useEffect, useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import Trailer from "./components/Trailer";
import Features from "./components/Features";
import HomeContent from "./components/HomeContent";
import Development from "./components/Development";
import Download from "./components/Download";
import Contact from "./components/Contact";
import LegalPage from "./components/LegalPage";
import Footer from "./components/Footer";
import OperatorPanel from "./components/OperatorPanel";
import SmallFooterAd from "./components/SmallFooterAd";
import CookieConsent from "./components/CookieConsent";
import { SiteContentProvider } from "./context/SiteContentContext";
import {
  findDevelopmentArticle,
  type DevelopmentArticleSlug,
} from "./development-content";

export type SectionId =
  | "home"
  | "about"
  | "story"
  | "gallery"
  | "trailer"
  | "features"
  | "development"
  | "download"
  | "contact"
  | "operator"
  | "privacy"
  | "terms"
  | "not-found";

const validSections: SectionId[] = [
  "home",
  "about",
  "story",
  "gallery",
  "trailer",
  "features",
  "development",
  "download",
  "contact",
  "privacy",
  "terms",
];

type RouteState = {
  section: SectionId;
  articleSlug?: DevelopmentArticleSlug;
};

let visitorEntryLogged = false;
const VISITOR_ID_STORAGE_KEY = "subject14-visitor-id";

function getRouteFromLocation(): RouteState {
  if (typeof window === "undefined") {
    return { section: "home" };
  }

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/development") {
    return { section: "development" };
  }

  if (pathname.startsWith("/development/")) {
    const slug = pathname.split("/").filter(Boolean)[1] || "";
    const article = findDevelopmentArticle(slug);
    return article ? { section: "development", articleSlug: article.slug } : { section: "not-found" };
  }

  if (pathname !== "/" && pathname !== "/index.html") {
    return { section: "not-found" };
  }

  const hash = window.location.hash.replace("#", "");
  if (hash === "operator") {
    return {
      section: new URLSearchParams(window.location.search).get("operator") === "1" ? "operator" : "home",
    };
  }

  return { section: validSections.includes(hash as SectionId) ? (hash as SectionId) : "home" };
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
  const [route, setRoute] = useState<RouteState>(getRouteFromLocation);
  const activeSection = route.section;
  const showFooterAd = activeSection === "home";

  useEffect(() => {
    logVisitorEntry();
  }, []);

  useEffect(() => {
    const syncRouteFromLocation = () => {
      setRoute(getRouteFromLocation());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    syncRouteFromLocation();
    window.addEventListener("hashchange", syncRouteFromLocation);
    window.addEventListener("popstate", syncRouteFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncRouteFromLocation);
      window.removeEventListener("popstate", syncRouteFromLocation);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const article = route.articleSlug ? findDevelopmentArticle(route.articleSlug) : undefined;
    const title = article
      ? `${article.title} | Subject 14 Development`
      : activeSection === "development"
        ? "Development Notes | Subject 14"
        : activeSection === "not-found"
          ? "Page Not Found | Subject 14"
          : "Subject 14 | Psychological Horror Game";
    const description = article
      ? article.metaDescription
      : activeSection === "development"
        ? "Development notes for Subject 14 covering the facility, puzzle exploration, horror atmosphere, and enemy encounters."
        : activeSection === "not-found"
          ? "The requested Subject 14 page could not be found."
          : "Subject 14 is a first-person psychological horror game set in a decaying experimental facility with exploration, puzzles, and an entity that hunts you.";

    document.title = title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    metaDescription?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", description);
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", `https://subject14.com${window.location.pathname}${window.location.hash || ""}`);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute("content", `https://subject14.com${window.location.pathname}${window.location.hash || ""}`);
  }, [activeSection, route.articleSlug]);

  const navigateToSection = (section: SectionId) => {
    if (typeof window !== "undefined") {
      const nextUrl = section === "home" ? "/" : `/#${section}`;
      window.history.pushState({}, "", nextUrl);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setRoute({ section });
  };

  const navigateToDevelopment = (slug?: DevelopmentArticleSlug) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", slug ? `/development/${slug}` : "/development");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setRoute({ section: "development", articleSlug: slug });
  };

  return (
    <LanguageProvider>
      <SiteContentProvider>
        <div className="site-shell min-h-screen flex flex-col text-foreground selection:bg-primary/30 selection:text-primary-foreground">
          <div className="pointer-events-none fixed inset-0 z-0 bg-noise" />
          <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.00)_120px)]" />
          <Navbar
            activeSection={activeSection}
            onNavigate={navigateToSection}
            onNavigateDevelopment={navigateToDevelopment}
          />
          <main className="relative z-10 flex-1">
            {activeSection === "home" && (
              <>
                <Hero onNavigate={navigateToSection} />
                <HomeContent onNavigate={navigateToSection} onNavigateDevelopment={navigateToDevelopment} />
              </>
            )}
            {activeSection === "about" && <About />}
            {activeSection === "story" && <Story />}
            {activeSection === "gallery" && <Gallery />}
            {activeSection === "trailer" && <Trailer />}
            {activeSection === "features" && <Features />}
            {activeSection === "development" && (
              <Development
                articleSlug={route.articleSlug}
                onNavigate={navigateToSection}
                onNavigateDevelopment={navigateToDevelopment}
              />
            )}
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
            {activeSection === "not-found" && (
              <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-24 sm:py-28">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,32,32,0.12),transparent_36%)]" />
                <div className="section-frame relative z-10">
                  <div className="panel-film border-horror mx-auto max-w-3xl rounded-lg p-6 text-center sm:p-8">
                    <p className="section-copy-kicker mb-4 text-primary/85">Signal Lost</p>
                    <h1 className="section-heading mb-5">Page Not Found</h1>
                    <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground">
                      This Subject 14 page does not exist. Return to the main site or open the development notes.
                    </p>
                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                      <button type="button" onClick={() => navigateToSection("home")} className="hero-button-solid">
                        Back Home
                      </button>
                      <button type="button" onClick={() => navigateToDevelopment()} className="hero-button-ghost">
                        Development Notes
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
          <div className="relative z-10">
            {showFooterAd && <SmallFooterAd />}
            <Footer />
          </div>
          <CookieConsent />
        </div>
      </SiteContentProvider>
    </LanguageProvider>
  );
}
