import blockedWords from "../../data/blocked-words.json";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createBlockedWordPattern(word: string): RegExp {
  const escapedWord = escapeRegExp(word).replace(/\s+/g, "\\s+");
  return new RegExp(`(^|[^a-z0-9])${escapedWord}($|[^a-z0-9])`, "i");
}

export function findBlockedLanguage(value: string): string | null {
  const blockedWord = blockedWords.find((word) => createBlockedWordPattern(word).test(value));
  return blockedWord || null;
}
