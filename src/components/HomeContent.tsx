import { motion } from "motion/react";
import { Download, Play } from "lucide-react";
import type { SectionId } from "../App";
import { developmentArticles, type DevelopmentArticleSlug } from "../development-content";

type HomeContentProps = {
  onNavigate: (section: SectionId) => void;
  onNavigateDevelopment: (slug?: DevelopmentArticleSlug) => void;
};

const featureItems = [
  {
    title: "Exploration",
    copy: "Move through connected labs, corridors, storage rooms, and locked sections while learning how the facility fits together.",
  },
  {
    title: "Puzzles",
    copy: "Restore power, work with generators, read clues, and open routes that were sealed before you arrived.",
  },
  {
    title: "Atmosphere",
    copy: "Lighting, sound, and environmental details carry much of the horror. The rooms should feel wrong before anything moves.",
  },
  {
    title: "Enemy Encounters",
    copy: "The entity can chase and catch the player, turning navigation and objective work into risky decisions.",
  },
];

const screenshots = [
  { title: "Containment Cell Block", url: "/site-images/labpic8.png" },
  { title: "Lab Access Corridor", url: "/site-images/labpic7.png" },
  { title: "Observation Desk", url: "/site-images/labpic11.png" },
];

const faqItems = [
  {
    question: "What is Subject 14?",
    answer:
      "A first-person psychological horror game set inside a decaying experimental facility, with exploration, puzzles, and an entity hunting the player.",
  },
  {
    question: "Is the demo available?",
    answer:
      "The site currently lists a playable demo as being in preparation for Windows PC. The teaser and screenshots are available now.",
  },
  {
    question: "What does the player do?",
    answer:
      "Search connected rooms, restore power, unlock blocked paths, read environmental clues, and escape the facility.",
  },
  {
    question: "Is there more development information?",
    answer:
      "Yes. The development notes explain the facility design, puzzle flow, and horror atmosphere in more detail.",
  },
];

export default function HomeContent({ onNavigate, onNavigateDevelopment }: HomeContentProps) {
  return (
    <div className="relative overflow-hidden">
      <section className="relative py-16 sm:py-20" aria-labelledby="home-about">
        <div className="section-frame max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
          >
            <div>
              <p className="section-copy-kicker mb-4 text-primary/85">About</p>
              <h2 id="home-about" className="section-heading mb-5 max-w-2xl">
                A Research Facility That Has Gone Quiet
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
              <p>
                Subject 14 is a first-person psychological horror game about waking inside a failing experimental
                facility and finding a way out before the place closes around you.
              </p>
              <p>
                The game focuses on connected rooms, locked sections, power systems, environmental clues, and an entity
                that pressures the player while they are trying to solve practical problems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20" aria-labelledby="home-gameplay">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,32,32,0.08),transparent_34%)]" />
        <div className="section-frame relative z-10 max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="section-copy-kicker mb-4 text-primary/85">Gameplay</p>
            <h2 id="home-gameplay" className="section-heading mb-4">
              Explore, Solve, Stay Quiet
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The loop is simple: understand the facility, open the next route, and avoid making the wrong kind of
              noise.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureItems.map((item) => (
              <article key={item.title} className="border-l border-primary/35 bg-black/20 px-4 py-4">
                <h3 className="font-heading text-xl uppercase tracking-[0.05em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/64">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20" aria-labelledby="home-media">
        <div className="section-frame max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-copy-kicker mb-4 text-primary/85">Media</p>
              <h2 id="home-media" className="section-heading">Screenshots</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("gallery")}
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
            >
              Open full gallery
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <button
              type="button"
              onClick={() => onNavigate("gallery")}
              className="border-horror group relative aspect-video overflow-hidden rounded-md bg-black text-left"
            >
              <img
                src={screenshots[0].url}
                alt={screenshots[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.16em] text-white/72">
                {screenshots[0].title}
              </p>
            </button>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {screenshots.slice(1).map((image) => (
                <button
                  key={image.title}
                  type="button"
                  onClick={() => onNavigate("gallery")}
                  className="border-horror group relative aspect-video overflow-hidden rounded-md bg-black text-left"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/68">
                    {image.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20" aria-labelledby="home-development">
        <div className="section-frame max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="section-copy-kicker mb-4 text-primary/85">Development Notes</p>
            <h2 id="home-development" className="section-heading mb-4">
              Behind the Game
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Longer notes stay on their own pages so the homepage can stay focused on the game.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {developmentArticles.map((article) => (
              <article key={article.slug} className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="font-heading text-2xl uppercase tracking-[0.04em] text-white">{article.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">{article.deck}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateDevelopment(article.slug)}
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
                >
                  Read
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20" aria-labelledby="home-faq">
        <div className="section-frame max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
            <div>
              <p className="section-copy-kicker mb-4 text-primary/85">FAQ</p>
              <h2 id="home-faq" className="section-heading">Quick Answers</h2>
            </div>
            <div className="space-y-2">
              {faqItems.map((item) => (
                <details key={item.question} className="border-b border-white/10 py-4">
                  <summary className="cursor-pointer list-none font-heading text-xl uppercase tracking-[0.04em] text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20" aria-labelledby="home-final-cta">
        <div className="section-frame max-w-6xl">
          <div className="border-horror relative overflow-hidden rounded-lg bg-black px-5 py-10 text-center sm:px-8 sm:py-12">
            <img
              src="/site-images/03-story.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-24"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/72" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 id="home-final-cta" className="font-heading text-4xl uppercase tracking-[0.04em] text-white sm:text-5xl">
                Enter the Facility
              </h2>
              <p className="mt-4 text-base leading-7 text-white/68">
                Watch the teaser or check the current system requirements for the playable build.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => onNavigate("trailer")} className="hero-button-solid">
                  <Play className="h-4 w-4 fill-current" />
                  Watch Trailer
                </button>
                <button type="button" onClick={() => onNavigate("download")} className="hero-button-ghost">
                  <Download className="h-4 w-4" />
                  Requirements
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
