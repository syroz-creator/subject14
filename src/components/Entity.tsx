import { motion } from "motion/react";
import { AlertTriangle, Ear, Eye, Footprints, Gauge, Lock, Radio, ScanLine } from "lucide-react";

const huntingRules = [
  {
    title: "Sound first",
    copy: "Running, doors, loose metal, and generator noise pull Subject 13 before it has a clean line of sight.",
    icon: Ear,
  },
  {
    title: "Bad hiding spots repeat",
    copy: "If a route works too many times, it starts checking that route earlier.",
    icon: Eye,
  },
  {
    title: "Panic gets loud",
    copy: "A bad sprint or missed turn is usually what changes a warning into a chase.",
    icon: Footprints,
  },
];

const dossierItems = [
  ["File", "Subject 13"],
  ["Status", "Uncontained"],
  ["Source", "Lower lab"],
  ["Behavior", "Sound-led pursuit"],
  ["Warning", "Lights cut before contact"],
  ["Clearance", "Redacted"],
];

const playerRead = [
  "The hallway goes flat before it enters.",
  "Red emergency light means it is in the same section.",
  "Do not keep returning to the same locker.",
  "Wait long enough to hear where it went.",
];

const entityImages = {
  wide: "/site-images/entity/whisper-08.png",
  study: "/site-images/entity/whisper-01.jpg",
};

const capturedFrames = [
  {
    label: "Frame 01",
    caption: "left profile",
    src: entityImages.wide,
    objectPosition: "12% 52%",
  },
  {
    label: "Frame 02",
    caption: "full body",
    src: entityImages.wide,
    objectPosition: "52% 48%",
  },
  {
    label: "Frame 03",
    caption: "right profile",
    src: entityImages.study,
    objectPosition: "88% 58%",
  },
];

export default function Entity() {
  return (
    <section id="entity" className="relative isolate min-h-[calc(100vh-8rem)] overflow-hidden bg-[#080b0e] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={entityImages.wide}
          alt=""
          className="h-full w-full scale-110 object-cover object-center opacity-[0.12] blur-sm grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.82),rgba(6,7,8,0.94)),radial-gradient(circle_at_70%_20%,rgba(150,20,20,0.11),transparent_30%),radial-gradient(circle_at_14%_8%,rgba(64,118,118,0.12),transparent_28rem)]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame relative z-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.82fr)_minmax(23rem,0.7fr)] xl:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="max-w-4xl"
          >
            <div className="case-strip mb-5 inline-flex items-center gap-2 rounded-md px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary/90">
              <Radio className="h-3.5 w-3.5" />
              Recovered Threat File
            </div>
            <h2 className="text-glow-red mb-6 max-w-4xl font-heading text-5xl uppercase leading-none tracking-[0.02em] text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              Subject 13
            </h2>
            <div className="space-y-5 text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
              <p className="max-w-3xl rounded-md border border-primary/24 bg-primary/8 px-5 py-4 font-mono text-sm uppercase tracking-[0.04em] text-white/88 sm:text-base">
                Old name removed. Staff logs identify the active containment failure as Subject 13.
              </p>
              <p className="max-w-3xl">
                It does not look for you like a person would. It follows noise, waits near exits, and turns familiar
                rooms into bad decisions. When the power drops, assume it already crossed into your block.
              </p>
              <p className="max-w-3xl text-white/66">
                The photos are incomplete. Most of the recovered cameras failed before the full body was in frame.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="relative overflow-hidden rounded-md border border-primary/22 bg-[#050505] shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute left-4 top-4 z-10 rounded-md border border-primary/35 bg-black/72 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
              Still 13-A
            </div>
            <img
              src={entityImages.wide}
              alt="Subject 13 standing in a dark reference image"
              className="aspect-[3/4] w-full object-cover grayscale contrast-125 saturate-50"
              style={{ objectPosition: "52% 48%" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/72 to-transparent p-5 pt-24">
              <p className="font-heading text-2xl uppercase tracking-[0.06em] text-white">Subject 13</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/64">
                Cropped from damaged containment stills. Not cleared for public release.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62 }}
            className="readable-surface rounded-md p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/42">Internal Dossier</p>
                <h3 className="mt-2 font-heading text-2xl uppercase tracking-[0.08em] text-white">Known Record</h3>
              </div>
              <AlertTriangle className="h-7 w-7 text-primary" />
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {dossierItems.map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/8 bg-white/[0.04] px-4 py-3">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/38">{label}</dt>
                  <dd className="mt-2 text-sm font-semibold text-white/82">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62, delay: 0.08 }}
            className="readable-surface rounded-md p-5 sm:p-6"
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary/78">Recovered Notes</p>
            <h3 className="mt-2 font-heading text-2xl uppercase tracking-[0.08em] text-white">Last Useful Warnings</h3>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Do not shout over the radio. Do not force the generator twice in a row. If the lock cycles by itself,
              leave the door closed. The recordings stop after that instruction.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Before", "Hallway hum cuts out"],
                ["During", "Fast steps, no breathing"],
                ["After", "Door marks at shoulder height"],
              ].map(([phase, copy]) => (
                <div key={phase} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-primary/72">{phase}</p>
                  <p className="mt-2 text-sm leading-6 text-white/66">{copy}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {huntingRules.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.58, delay: index * 0.08 }}
              className="min-h-60 rounded-md border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-primary/36"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center border border-primary/25 bg-primary/12">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-xl uppercase tracking-[0.06em] text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/64">{item.copy}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {capturedFrames.map((frame, index) => (
            <motion.div
              key={frame.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.58, delay: index * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-black"
            >
              <img
                src={frame.src}
                alt={`${frame.label} of Subject 13, ${frame.caption}`}
                className="h-full w-full object-cover grayscale contrast-125 saturate-50 transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: frame.objectPosition }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-md border border-white/12 bg-black/62 px-2.5 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/62">
                <ScanLine className="h-3 w-3 text-primary/80" />
                {frame.label}
              </div>
              <p className="absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/58">
                {frame.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Gauge className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-xl uppercase tracking-[0.08em] text-white">Threat Scale</h3>
            </div>
            {[
              ["Awareness", "86%"],
              ["Pursuit", "94%"],
              ["Visibility", "38%"],
            ].map(([label, width]) => (
              <div key={label} className="mb-4 last:mb-0">
                <div className="mb-2 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em]">
                  <span className="text-white/42">{label}</span>
                  <span className="text-primary/80">{width}</span>
                </div>
                <div className="h-1.5 bg-white/10">
                  <div className="h-full bg-primary/80" style={{ width }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-xl uppercase tracking-[0.08em] text-white">How Players Read It</h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {playerRead.map((item) => (
                <li key={item} className="border-l border-primary/40 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/66">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
