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
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 rounded-[1.75rem] border border-[#dadce0] bg-white p-5 text-[#202124] shadow-[0_8px_30px_rgba(60,64,67,0.28)] sm:p-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-base font-medium tracking-normal text-[#202124]">This site uses cookies</p>
          <p className="mt-2 text-sm leading-6 text-[#5f6368]">
            Subject14.com uses required site storage and Google advertising cookies to show and measure ads. You can
            accept, reject, manage, or withdraw advertising consent at any time.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#1a73e8]">
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Google cookie information
            </a>
          </div>
          {isManaging ? (
            <label className="mt-5 flex items-start gap-3 rounded-xl border border-[#dadce0] bg-[#f8fafd] p-4 text-sm text-[#3c4043]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#1a73e8]"
                checked={advertisingEnabled}
                onChange={(event) => setAdvertisingEnabled(event.target.checked)}
              />
              <span>
                <span className="block font-medium text-[#202124]">Advertising cookies</span>
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
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1558b0]"
              onClick={() => saveChoice(advertisingEnabled)}
            >
              Save choices
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#dadce0] bg-white px-5 py-2 text-sm font-medium text-[#1a73e8] transition-colors hover:bg-[#f8fafd]"
              onClick={() => setIsManaging(true)}
            >
              Manage
            </button>
          )}
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#dadce0] bg-white px-5 py-2 text-sm font-medium text-[#1a73e8] transition-colors hover:bg-[#f8fafd]"
            onClick={() => saveChoice(false)}
          >
            Reject
          </button>
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1558b0]"
            onClick={() => saveChoice(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
