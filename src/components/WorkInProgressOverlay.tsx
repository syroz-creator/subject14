import { Construction, RadioTower } from "lucide-react";
import { useEffect } from "react";
import { useSiteContent } from "../context/SiteContentContext";

export default function WorkInProgressOverlay() {
  const { siteContent } = useSiteContent();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <section
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-black/86 px-4 py-8 text-white backdrop-blur-[2px] sm:px-6"
      aria-labelledby="work-in-progress-title"
      aria-describedby="work-in-progress-description"
    >
      <img
        src={siteContent.hero.backgroundUrl}
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-28"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(179,32,32,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-md border border-primary/35 bg-primary/12 shadow-[0_0_48px_rgba(179,32,32,0.22)]">
          <Construction className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>

        <p className="mb-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary sm:text-xs sm:tracking-[0.32em]">
          Transmission Interrupted
        </p>
        <h1
          id="work-in-progress-title"
          className="text-glow-red font-heading text-[clamp(3.1rem,14vw,8rem)] uppercase leading-[0.9] tracking-[0.03em]"
        >
          Site Not Ready
        </h1>
        <p
          id="work-in-progress-description"
          className="mt-6 max-w-2xl text-base leading-7 text-white/74 sm:text-lg"
        >
          Subject 14 is currently being worked on. The website is still under active development and will reopen when
          the next build is ready.
        </p>

        <div className="mt-8 flex items-center gap-3 border-y border-white/10 px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/52 sm:text-xs">
          <RadioTower className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Containment update pending</span>
        </div>
      </div>
    </section>
  );
}
