export type CookieConsentChoice = {
  advertising: boolean;
  decidedAt: string;
};

export const COOKIE_CONSENT_STORAGE_KEY = "subject14-cookie-consent";
export const COOKIE_CONSENT_CHANGED_EVENT = "subject14-cookie-consent-changed";
export const COOKIE_SETTINGS_EVENT = "subject14-cookie-settings";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<CookieConsentChoice>;
    if (typeof parsed.advertising !== "boolean" || typeof parsed.decidedAt !== "string") {
      return null;
    }

    return {
      advertising: parsed.advertising,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

export function updateGoogleConsent(advertising: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

  const value = advertising ? "granted" : "denied";

  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: "denied",
  });
}

export function saveCookieConsent(advertising: boolean): CookieConsentChoice {
  const choice = {
    advertising,
    decidedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(choice));
    updateGoogleConsent(advertising);
    window.dispatchEvent(new CustomEvent<CookieConsentChoice>(COOKIE_CONSENT_CHANGED_EVENT, { detail: choice }));
  }

  return choice;
}
