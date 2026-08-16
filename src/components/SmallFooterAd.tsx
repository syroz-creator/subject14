import { useEffect, useRef, useState } from "react";
import { COOKIE_CONSENT_CHANGED_EVENT, readCookieConsent } from "../lib/cookieConsent";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
  }
}

export default function SmallFooterAd() {
  const adRef = useRef<HTMLElement | null>(null);
  const adPushRequested = useRef(false);
  const [advertisingAllowed, setAdvertisingAllowed] = useState(false);

  useEffect(() => {
    setAdvertisingAllowed(readCookieConsent()?.advertising === true);
  }, []);

  useEffect(() => {
    const adElement = adRef.current;

    if (
      !advertisingAllowed ||
      !adElement ||
      adPushRequested.current ||
      adElement.dataset.adsbygoogleInitialized === "true"
    ) {
      return;
    }

    adPushRequested.current = true;
    adElement.dataset.adsbygoogleInitialized = "true";

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      adPushRequested.current = false;
      delete adElement.dataset.adsbygoogleInitialized;
    }
  }, [advertisingAllowed]);

  useEffect(() => {
    const syncConsent = () => {
      setAdvertisingAllowed(readCookieConsent()?.advertising === true);
    };

    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
  }, []);

  if (!advertisingAllowed) {
    return null;
  }

  return (
    <aside className="relative z-10 my-6 border-y border-white/8 bg-black/28 py-6 sm:my-8" aria-label="Advertisement">
      <div className="section-frame flex flex-col items-center">
        <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          Advertisement
        </p>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "inline-block", width: "350px", height: "50px" }}
          data-ad-client="ca-pub-3503279256694624"
          data-ad-slot="9689305255"
        />
      </div>
    </aside>
  );
}
