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

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Story />
          <Gallery />
          <Trailer />
          <Features />
          <Download />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
