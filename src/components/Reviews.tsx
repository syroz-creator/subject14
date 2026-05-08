import { type FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { CircleCheck, MessageSquare, Send, ShieldAlert, Star, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import {
  REVIEW_MESSAGE_MAX_LENGTH,
  REVIEW_MESSAGE_MIN_LENGTH,
  REVIEW_NAME_MAX_LENGTH,
  REVIEW_STORAGE_LIMIT,
  BLOCKED_REVIEW_WARNING,
  findBlockedReviewWord,
  type PlayerReview,
} from "../reviews";

const REVIEWS_API_ENDPOINT = "/api/reviews";
const REVIEWS_STORAGE_KEY = "subject14-player-reviews";

function createBrowserReviewId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `review-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function clampRating(value: unknown) {
  const rating = Number(value);

  if (!Number.isFinite(rating)) {
    return 5;
  }

  return Math.min(5, Math.max(1, Math.round(rating)));
}

function normalizeReview(value: unknown): PlayerReview | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const review = value as Partial<PlayerReview>;
  const message = String(review.message ?? "").trim();
  const name = String(review.name ?? "").trim();
  const createdAt = String(review.createdAt ?? "");

  if (!message || !createdAt) {
    return null;
  }

  return {
    id: String(review.id ?? createBrowserReviewId()),
    rating: clampRating(review.rating),
    name,
    message: message.slice(0, REVIEW_MESSAGE_MAX_LENGTH),
    createdAt,
  };
}

function readStoredReviews() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeReview).filter(Boolean).slice(0, REVIEW_STORAGE_LIMIT) as PlayerReview[];
  } catch {
    return [];
  }
}

function persistReviews(reviews: PlayerReview[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews.slice(0, REVIEW_STORAGE_LIMIT)));
  } catch {
    // Keep the in-memory list usable even if browser storage is unavailable.
  }
}

function formatReviewDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-1 text-primary" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={size === "md" ? "h-5 w-5" : "h-4 w-4"}
          fill={star <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<PlayerReview[]>(readStoredReviews);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  useEffect(() => {
    let mounted = true;

    async function loadReviews() {
      try {
        const response = await fetch(REVIEWS_API_ENDPOINT);

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as unknown;
        if (!Array.isArray(data)) {
          return;
        }

        const nextReviews = data.map(normalizeReview).filter(Boolean).slice(0, REVIEW_STORAGE_LIMIT) as PlayerReview[];

        if (mounted) {
          setReviews(nextReviews);
          persistReviews(nextReviews);
        }
      } catch {
        // Static deployments use the browser-stored list.
      }
    }

    void loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim().slice(0, REVIEW_NAME_MAX_LENGTH);
    const cleanMessage = message.trim().slice(0, REVIEW_MESSAGE_MAX_LENGTH);
    const blockedWord = findBlockedReviewWord(`${cleanName} ${cleanMessage}`);

    if (cleanMessage.length < REVIEW_MESSAGE_MIN_LENGTH) {
      setNotice({ type: "error", text: t.reviews.tooShort });
      return;
    }

    if (blockedWord) {
      setNotice({ type: "error", text: BLOCKED_REVIEW_WARNING });
      return;
    }

    const review: PlayerReview = {
      id: createBrowserReviewId(),
      rating,
      name: cleanName,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);

    try {
      const response = await fetch(REVIEWS_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        const data = (await response.json()) as { reviews?: unknown };
        const serverReviews = Array.isArray(data.reviews)
          ? (data.reviews.map(normalizeReview).filter(Boolean).slice(0, REVIEW_STORAGE_LIMIT) as PlayerReview[])
          : [review, ...reviews].slice(0, REVIEW_STORAGE_LIMIT);

        setReviews(serverReviews);
        persistReviews(serverReviews);
        setName("");
        setMessage("");
        setRating(5);
        setNotice({ type: "success", text: t.reviews.success });
        return;
      }

      if (response.status === 400) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setNotice({ type: "error", text: data?.message ?? BLOCKED_REVIEW_WARNING });
        return;
      }
    } catch {
      // If the API is not available, fall through to browser storage below.
    } finally {
      setSubmitting(false);
    }

    const nextReviews = [review, ...reviews].slice(0, REVIEW_STORAGE_LIMIT);
    setReviews(nextReviews);
    persistReviews(nextReviews);
    setName("");
    setMessage("");
    setRating(5);
    setNotice({ type: "success", text: t.reviews.success });
  };

  return (
    <section id="reviews" className="relative min-h-[calc(100vh-8rem)] overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(190,40,24,0.13),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%)] pointer-events-none" />

      <div className="section-frame relative z-10">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-copy-kicker mb-4">{t.reviews.kicker}</p>
            <h2 className="section-heading mb-5">{t.reviews.title}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/68">{t.reviews.subtitle}</p>
          </div>

          <div className="panel-film border-horror w-full rounded-[1.2rem] p-5 sm:w-auto sm:min-w-72">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/65">
                  {t.reviews.average}
                </p>
                <p className="mt-2 font-heading text-4xl tracking-[0.08em] text-white">
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </p>
              </div>
              <div className="text-end">
                <Stars rating={Math.round(averageRating)} size="md" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {reviews.length} {reviews.length === 1 ? t.reviews.review : t.reviews.reviews}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] xl:gap-10">
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            onSubmit={submitReview}
            className="panel-film border-horror rounded-[1.35rem] p-6 sm:p-8"
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl uppercase tracking-[0.08em] text-white">
                  {t.reviews.formTitle}
                </h3>
                <p className="text-sm text-muted-foreground">{t.reviews.formSubtitle}</p>
              </div>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {t.reviews.nameLabel}
                </span>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/45 px-4 py-3 focus-within:border-primary/45">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value.slice(0, REVIEW_NAME_MAX_LENGTH))}
                    placeholder={t.reviews.namePlaceholder}
                    className="min-h-8 w-full bg-transparent text-sm text-white outline-none placeholder:text-muted-foreground/45"
                  />
                </div>
              </label>

              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {t.reviews.ratingLabel}
                </p>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t.reviews.ratingLabel}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} ${star === 1 ? t.reviews.star : t.reviews.stars}`}
                      onClick={() => setRating(star)}
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-all ${
                        star <= rating
                          ? "border-primary/45 bg-primary/15 text-primary"
                          : "border-white/10 bg-black/35 text-white/35 hover:border-primary/25 hover:text-primary/75"
                      }`}
                    >
                      <Star className="h-5 w-5" fill={star <= rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {t.reviews.messageLabel}
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value.slice(0, REVIEW_MESSAGE_MAX_LENGTH))}
                  placeholder={t.reviews.messagePlaceholder}
                  className="min-h-44 w-full resize-none rounded-xl border border-white/10 bg-black/45 px-4 py-4 text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-primary/45"
                />
                <span className="mt-2 block text-end text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  {message.length}/{REVIEW_MESSAGE_MAX_LENGTH}
                </span>
              </label>
            </div>

            {notice ? (
              <div
                className={`mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                  notice.type === "success"
                    ? "border-primary/25 bg-primary/10 text-primary"
                    : "border-destructive/35 bg-destructive/10 text-destructive"
                }`}
                aria-live="polite"
              >
                {notice.type === "success" ? (
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p>{notice.text}</p>
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={submitting}
              className="mt-7 min-h-14 w-full rounded-[0.9rem] bg-primary text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-primary/85"
            >
              <Send className="mr-2 h-4 w-4" />
              {submitting ? t.reviews.sending : t.reviews.submit}
            </Button>
          </motion.form>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/65">
                  {t.reviews.latest}
                </p>
                <h3 className="mt-2 font-heading text-2xl uppercase tracking-[0.08em] text-white">
                  {t.reviews.feedTitle}
                </h3>
              </div>
            </div>

            {reviews.length ? (
              <div className="grid gap-4">
                {reviews.map((review, index) => (
                  <motion.article
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.24) }}
                    className="border-horror rounded-[1.1rem] bg-black/45 p-5"
                  >
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-heading text-lg uppercase tracking-[0.08em] text-white">
                          {review.name || t.reviews.anonymous}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {formatReviewDate(review.createdAt)}
                        </p>
                      </div>
                      <Stars rating={review.rating} />
                    </div>
                    <p className="text-sm leading-relaxed text-white/70">{review.message}</p>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="panel-film border-horror rounded-[1.1rem] p-8 text-center">
                <p className="font-heading text-2xl uppercase tracking-[0.08em] text-white">
                  {t.reviews.emptyTitle}
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {t.reviews.emptyBody}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
