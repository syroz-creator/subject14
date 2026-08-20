import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Clock, FileText } from "lucide-react";
import type { SectionId } from "../App";
import {
  developmentArticles,
  findDevelopmentArticle,
  getDevelopmentArticleWordCount,
  type DevelopmentArticleSlug,
} from "../development-content";
import SmallFooterAd from "./SmallFooterAd";

type DevelopmentProps = {
  articleSlug?: DevelopmentArticleSlug;
  onNavigate: (section: SectionId) => void;
  onNavigateDevelopment: (slug?: DevelopmentArticleSlug) => void;
};

function DevelopmentIndex({ onNavigateDevelopment }: Pick<DevelopmentProps, "onNavigateDevelopment">) {
  return (
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,32,32,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%,rgba(0,0,0,0.32))]" />
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="section-frame relative z-10">
        <div className="mb-12 max-w-4xl">
          <p className="section-copy-kicker mb-4 text-primary/85">Development</p>
          <h1 className="section-heading mb-5">Behind the Game</h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            These notes explain real parts of the current Subject 14 direction: the abandoned research facility,
            exploration-driven puzzles, and the atmosphere around the entity encounters. They are written as production
            notes rather than announcements.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {developmentArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="border-horror panel-film overflow-hidden rounded-lg"
            >
              <img
                src={article.imageUrl}
                alt=""
                className="aspect-video w-full object-cover opacity-82"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary/80">
                    {article.readingLabel}
                  </p>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/38">
                    {getDevelopmentArticleWordCount(article)} words
                  </span>
                </div>
                <h2 className="font-heading text-2xl uppercase leading-tight tracking-[0.04em] text-white">
                  {article.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/66">{article.deck}</p>
                <button
                  type="button"
                  onClick={() => onNavigateDevelopment(article.slug)}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary transition-colors hover:text-white"
                >
                  <FileText className="h-4 w-4" />
                  Read article
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DevelopmentArticleView({
  articleSlug,
  onNavigate,
  onNavigateDevelopment,
}: Required<Pick<DevelopmentProps, "articleSlug">> &
  Pick<DevelopmentProps, "onNavigate" | "onNavigateDevelopment">) {
  const article = findDevelopmentArticle(articleSlug);

  if (!article) {
    return (
      <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
        <div className="section-frame">
          <div className="panel-film border-horror mx-auto max-w-3xl rounded-lg p-6 text-center sm:p-8">
            <p className="section-copy-kicker mb-4 text-primary/85">Development</p>
            <h1 className="section-heading mb-5">Article Not Found</h1>
            <p className="text-sm leading-7 text-muted-foreground">
              The development note you requested is not available. Return to the development index to choose another
              article.
            </p>
            <button type="button" onClick={() => onNavigateDevelopment()} className="hero-button-solid mt-7">
              Back to Development
            </button>
          </div>
        </div>
      </section>
    );
  }

  const relatedArticles = developmentArticles.filter((item) => item.slug !== article.slug);

  return (
    <article className="relative min-h-[calc(100vh-8rem)] overflow-hidden pb-20 pt-24 sm:pb-24 sm:pt-28">
      <div className="absolute inset-0 -z-10">
        <img
          src={article.imageUrl}
          alt=""
          className="h-full w-full scale-[1.02] object-cover object-center opacity-22 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82),rgba(0,0,0,0.95)),radial-gradient(circle_at_50%_0%,rgba(179,32,32,0.14),transparent_32%)]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame">
        <button
          type="button"
          onClick={() => onNavigateDevelopment()}
          className="mb-8 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/56 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Development Index
        </button>

        <header className="max-w-4xl">
          <p className="section-copy-kicker mb-4 text-primary/85">{article.readingLabel}</p>
          <h1 className="text-glow-red font-heading text-5xl uppercase leading-none tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            {article.deck}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 border-y border-white/10 py-4 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-white/45">
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              Subject 14 development
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {getDevelopmentArticleWordCount(article)} words
            </span>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.74fr)_minmax(17rem,0.26fr)] lg:items-start">
          <div className="panel-film border-horror rounded-lg p-5 sm:p-8 lg:p-10">
            {article.sections.map((section) => (
              <section key={section.heading} className="mb-10 last:mb-0">
                <h2 className="mb-4 font-heading text-3xl uppercase tracking-[0.04em] text-white">
                  {section.heading}
                </h2>
                <div className="space-y-5 text-base leading-8 text-white/74">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="panel-film border-horror rounded-lg p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary/80">Related Notes</p>
              <div className="mt-4 space-y-4">
                {relatedArticles.map((related) => (
                  <button
                    key={related.slug}
                    type="button"
                    onClick={() => onNavigateDevelopment(related.slug)}
                    className="block w-full border-l border-primary/35 pl-4 text-left transition-colors hover:border-primary"
                  >
                    <span className="block font-heading text-lg uppercase leading-tight tracking-[0.04em] text-white">
                      {related.title}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-white/50">{related.deck}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel-film border-horror rounded-lg p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary/80">Explore</p>
              <div className="mt-4 flex flex-col gap-3">
                <button type="button" onClick={() => onNavigate("gallery")} className="hero-button-ghost w-full">
                  Screenshots
                </button>
                <button type="button" onClick={() => onNavigate("trailer")} className="hero-button-solid w-full">
                  Trailer
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <SmallFooterAd />
    </article>
  );
}

export default function Development({ articleSlug, onNavigate, onNavigateDevelopment }: DevelopmentProps) {
  if (articleSlug) {
    return (
      <DevelopmentArticleView
        articleSlug={articleSlug}
        onNavigate={onNavigate}
        onNavigateDevelopment={onNavigateDevelopment}
      />
    );
  }

  return <DevelopmentIndex onNavigateDevelopment={onNavigateDevelopment} />;
}
