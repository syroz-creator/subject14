import { useEffect, useState } from "react";
import {
  COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  saveCookieConsent,
  updateGoogleConsent,
} from "../lib/cookieConsent";

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);

  useEffect(() => {
    const storedChoice = readCookieConsent();
    setAdvertisingEnabled(storedChoice?.advertising ?? false);
    setIsOpen(!storedChoice);

    if (storedChoice) {
      updateGoogleConsent(storedChoice.advertising);
    }

    const openSettings = () => {
      const latestChoice = readCookieConsent();
      setAdvertisingEnabled(latestChoice?.advertising ?? false);
      setIsManaging(true);
      setIsOpen(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const saveChoice = (advertising: boolean) => {
    saveCookieConsent(advertising);
    setAdvertisingEnabled(advertising);
    setIsManaging(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-4 py-4 shadow-[0_-18px_60px_rgba(0,0,0,0.52)] backdrop-blur-md sm:px-6"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Cookie Settings
          </p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            Subject14.com uses cookies and Google AdSense to show and measure ads. You can accept, reject, manage, or
            withdraw your advertising consent at any time.
          </p>
          {isManaging ? (
            <label className="mt-4 flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-white/72">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-primary"
                checked={advertisingEnabled}
                onChange={(event) => setAdvertisingEnabled(event.target.checked)}
              />
              <span>
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white">
                  Advertising cookies
                </span>
                Allow Google and advertising partners to use cookies, device identifiers, IP addresses, and browsing
                data to provide and measure ads.
              </span>
            </label>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
          {isManaging ? (
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/72 transition-colors hover:border-primary/35 hover:text-white"
              onClick={() => saveChoice(advertisingEnabled)}
            >
              Save Choices
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/72 transition-colors hover:border-primary/35 hover:text-white"
              onClick={() => setIsManaging(true)}
            >
              Manage
            </button>
          )}
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/14 bg-white/[0.04] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/72 transition-colors hover:border-primary/35 hover:text-white"
            onClick={() => saveChoice(false)}
          >
            Reject
          </button>
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-primary/85"
            onClick={() => saveChoice(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
