import { motion } from "motion/react";
import { BookOpen, DoorOpen, Flashlight, Lightbulb, Route, Volume2 } from "lucide-react";
import type { SectionId } from "../App";
import { developmentArticles, type DevelopmentArticleSlug } from "../development-content";

type HomeContentProps = {
  onNavigate: (section: SectionId) => void;
  onNavigateDevelopment: (slug?: DevelopmentArticleSlug) => void;
};

const gameplayNotes = [
  {
    title: "Explore Connected Sections",
    copy:
      "The facility is built around rooms that relate to one another: labs, corridors, storage spaces, observation areas, and locked routes. Learning how they connect is part of surviving them.",
    icon: Route,
  },
  {
    title: "Restore and Unlock",
    copy:
      "Progress depends on practical tasks such as restoring power, working with generators, reading clues, and opening sealed paths through the building.",
    icon: Lightbulb,
  },
  {
    title: "Stay Ahead of the Entity",
    copy:
      "The threat is not only there for a single scare. It can chase, catch, and pressure the player while they are trying to solve problems inside the facility.",
    icon: Flashlight,
  },
];

const faqItems = [
  {
    question: "What kind of game is Subject 14?",
    answer:
      "Subject 14 is a first-person psychological horror game set inside a decaying experimental facility. The site describes a story-driven experience with exploration, puzzles, power restoration, locked sections, and an entity that hunts the player.",
  },
  {
    question: "Is there a playable build?",
    answer:
      "The project status on the site says a playable demo is in preparation for Windows PC. The current website includes screenshots, system requirements, contact tools, and an in-site teaser trailer.",
  },
  {
    question: "What does the player do in the facility?",
    answer:
      "The player searches connected rooms, follows environmental clues, restores power, opens blocked routes, and tries to escape while avoiding the threat inside the building.",
  },
  {
    question: "Is the horror based only on jump scares?",
    answer:
      "The focus shown on the site is atmosphere, sound, lighting, environmental storytelling, and being stalked while solving objectives. Jump scares may happen, but the core tension comes from moving through the facility under pressure.",
  },
];

export default function HomeContent({ onNavigate, onNavigateDevelopment }: HomeContentProps) {
  return (
    <div className="relative overflow-hidden">
      <section className="relative py-20 sm:py-24" aria-labelledby="subject14-overview">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(179,32,32,0.04),transparent_32%,rgba(255,255,255,0.015))]" />
        <div className="section-frame relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="section-copy-kicker mb-4 text-primary/85">About Subject 14</p>
              <h2 id="subject14-overview" className="section-heading mb-6">
                A Horror Game Built Around a Place You Have to Understand
              </h2>
              <div className="space-y-5 text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
                <p>
                  Subject 14 is a first-person psychological horror game about waking inside a failing research
                  facility and trying to understand what happened there before it finishes happening to you.
                </p>
                <p>
                  The game is centered on exploration instead of a straight hallway of scares. The facility has
                  connected rooms, locked sections, generators, evidence, and routes that become more important as the
                  player learns how the building fits together.
                </p>
                <p>
                  The horror comes from being asked to think while under pressure. You may know which room needs power,
                  but getting back to it safely is another problem. You may find the next door, but the sound you made
                  getting there can change the situation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="panel-film border-horror grid gap-4 rounded-lg p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <DoorOpen className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-heading text-2xl uppercase tracking-[0.06em] text-white">Setting</p>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/42">
                    Experimental facility
                  </p>
                </div>
              </div>
              <p className="text-sm leading-7 text-white/68 sm:text-base">
                The rooms shown across the site point to a working facility that has broken down: research labs,
                chemical storage, containment, corridors, service halls, and observation spaces. The story is told
                through what is left behind as much as through direct text.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {["UE5 visuals", "Windows PC target", "Teaser available"].map((item) => (
                  <div key={item} className="border border-white/10 bg-black/24 px-3 py-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/62">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24" aria-labelledby="homepage-gameplay">
        <div className="section-frame">
          <div className="mb-10 max-w-3xl">
            <p className="section-copy-kicker mb-4 text-primary/85">Gameplay</p>
            <h2 id="homepage-gameplay" className="section-heading mb-5">
              What You Do Inside the Facility
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Subject 14 is being presented as a horror game where the player has to keep moving, investigate rooms,
              and solve grounded objectives while the entity makes every return trip feel less safe.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {gameplayNotes.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="panel-film border-horror min-h-64 rounded-lg p-5 sm:p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/12">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl uppercase tracking-[0.06em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/66">{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24" aria-labelledby="homepage-development">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,32,32,0.10),transparent_34%)]" />
        <div className="section-frame relative z-10">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-copy-kicker mb-4 text-primary/85">Behind the Game</p>
              <h2 id="homepage-development" className="section-heading mb-5">
                Development Notes
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Short development articles explain how the current game direction is being shaped: the facility, the
                puzzle flow, and the way sound and lighting support the encounters.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateDevelopment()}
              className="hero-button-ghost w-full sm:w-auto"
            >
              <BookOpen className="h-4 w-4" />
              Read Devlog
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {developmentArticles.map((article) => (
              <article key={article.slug} className="border-horror overflow-hidden rounded-lg bg-black/45">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="aspect-video w-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="p-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary/80">
                    {article.readingLabel}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl uppercase leading-tight tracking-[0.04em] text-white">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{article.deck}</p>
                  <button
                    type="button"
                    onClick={() => onNavigateDevelopment(article.slug)}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
                  >
                    Read more
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24" aria-labelledby="homepage-faq">
        <div className="section-frame">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <p className="section-copy-kicker mb-4 text-primary/85">FAQ</p>
              <h2 id="homepage-faq" className="section-heading mb-5">
                Useful Details
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                These answers are based on the current site information and avoid guessing about release dates,
                pricing, or store pages that are not confirmed here.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => onNavigate("gallery")} className="hero-button-ghost">
                  View Screenshots
                </button>
                <button type="button" onClick={() => onNavigate("contact")} className="hero-button-solid">
                  Contact Team
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="group border-horror rounded-lg bg-black/34 p-5">
                  <summary className="cursor-pointer list-none font-heading text-xl uppercase tracking-[0.04em] text-white">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24" aria-labelledby="homepage-sound">
        <div className="section-frame">
          <div className="panel-film border-horror grid gap-6 rounded-lg p-5 sm:p-7 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-md border border-primary/25 bg-primary/12">
              <Volume2 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 id="homepage-sound" className="font-heading text-3xl uppercase tracking-[0.04em] text-white">
                Why the Facility Stays Quiet
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/66 sm:text-base">
                Subject 14 uses sound as part of the warning system. A generator, a distant hallway, a whisper, or a
                door can matter because the player is already listening for the entity. The atmosphere works best when
                the quiet has a purpose.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
