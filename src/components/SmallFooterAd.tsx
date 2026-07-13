import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
  }
}

export default function SmallFooterAd() {
  const adRef = useRef<HTMLElement | null>(null);
  const adPushRequested = useRef(false);

  useEffect(() => {
    const adElement = adRef.current;

    if (!adElement || adPushRequested.current || adElement.dataset.adsbygoogleInitialized === "true") {
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
  }, []);

  return (
    <aside className="relative z-10 py-6" aria-label="Advertisement">
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
