import { useEffect } from "react";

export default function WorkInProgressOverlay() {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <section
      className="fixed inset-0 isolate z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#020203] px-4 py-8 text-white sm:px-6"
      aria-labelledby="work-in-progress-title"
      aria-describedby="work-in-progress-description"
    >
      <img
        src="/site-images/01-hero.jpg"
        alt=""
        className="absolute inset-0 -z-30 h-full w-full scale-105 object-cover object-center opacity-[0.42]"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#020203_0%,rgba(2,2,3,0.72)_28%,rgba(2,2,3,0.7)_72%,#020203_100%),linear-gradient(180deg,#020203_0%,rgba(2,2,3,0.58)_28%,#020203_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(156,24,24,0.18),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, #fff 0, #fff 1px, transparent 1px, transparent 6px)",
        }}
      />

      <div className="absolute left-4 top-4 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/38 sm:left-7 sm:top-6 sm:text-[0.65rem]">
        Build access restricted
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-primary/70 sm:bottom-6 sm:right-7 sm:text-[0.65rem]">
        Subject 14
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <img
          src="/game-logo.png"
          alt="Subject 14"
          className="mb-7 w-full max-w-[22rem] object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.75)] sm:max-w-[34rem]"
        />

        <div className="mb-7 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        <p className="mb-4 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-primary sm:text-xs sm:tracking-[0.34em]">
          Public access paused
        </p>
        <h1
          id="work-in-progress-title"
          className="text-glow-red font-heading text-[clamp(2.7rem,11vw,6.8rem)] uppercase leading-[0.92] tracking-[0.03em]"
        >
          Still In Development
        </h1>
        <p
          id="work-in-progress-description"
          className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg"
        >
          We are working on the next version of the Subject 14 website. The public page is locked for now and will open
          again when the build is ready.
        </p>

        <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/44 sm:grid-cols-3 sm:text-[0.66rem]">
          <span className="border-y border-white/10 py-3">Demo offline</span>
          <span className="border-y border-primary/35 py-3 text-primary/75">Update pending</span>
          <span className="border-y border-white/10 py-3">Return soon</span>
        </div>
      </div>
    </section>
  );
}
