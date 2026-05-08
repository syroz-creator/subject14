export type PlayerReview = {
  id: string;
  rating: number;
  name: string;
  message: string;
  createdAt: string;
};

export const REVIEW_NAME_MAX_LENGTH = 36;
export const REVIEW_MESSAGE_MIN_LENGTH = 8;
export const REVIEW_MESSAGE_MAX_LENGTH = 520;
export const REVIEW_STORAGE_LIMIT = 80;
export const BLOCKED_REVIEW_WARNING =
  "Your review contains offensive or inappropriate words. Please keep your review respectful.";

export const BLOCKED_REVIEW_WORDS: string[] = [
  "fuck",
  "fucking",
  "fucker",
  "motherfucker",
  "mf",
  "shit",
  "bullshit",
  "bitch",
  "asshole",
  "ass",
  "cunt",
  "dick",
  "pussy",
  "bastard",
  "slut",
  "whore",
  "hoe",
  "porn",
  "porno",
  "xxx",
  "sex",
  "sexy",
  "nude",
  "nudes",
  "naked",
  "boobs",
  "penis",
  "vagina",
  "horny",
  "onlyfans",
  "rape",
  "rapist",
  "kys",
  "kill yourself",
  "go die",
  "i hope you die",
  "i will kill you",
  "kill",
  "murder",
  "bomb",
  "shoot",
  "stab",
  "nigger",
  "nigga",
  "chink",
  "spic",
  "kike",
  "fag",
  "faggot",
  "retard",
  "retarded",
  "nazi",
  "hitler",
  "terrorist",
  "monkey",
  "ape",
  "slave",
  "gas the",
  "kill all",
  "free money",
  "click here",
  "crypto",
  "bitcoin",
  "telegram",
  "whatsapp",
  "cashapp",
  "paypal me",
  "http://",
  "https://",
  "www.",
];

function normalizeForModeration(value: string): string {
  return value.normalize("NFKC").toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function findBlockedReviewWord(value: string): string | null {
  const normalizedValue = normalizeForModeration(value);

  for (const word of BLOCKED_REVIEW_WORDS) {
    const normalizedWord = normalizeForModeration(word.trim());

    if (!normalizedWord) {
      continue;
    }

    if (/[^a-z0-9\s]/i.test(normalizedWord)) {
      if (normalizedValue.includes(normalizedWord)) {
        return word;
      }
      continue;
    }

    const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedWord)}(?=$|[^a-z0-9])`);

    if (pattern.test(normalizedValue)) {
      return word;
    }
  }

  return null;
}
