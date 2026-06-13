import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

type LegalPageProps = {
  type: "privacy" | "terms";
};

type LegalSection = {
  title: string;
  body: string[];
};

const privacySections: LegalSection[] = [
  {
    title: "What We Collect",
    body: [
      "Subject 14 collects only the information needed to operate the website, respond to messages, and keep owner-only tools secure.",
      "If you submit the contact form, we collect the name, email address, selected subject, and message you provide.",
      "Basic technical information such as IP address, browser type, device details, request time, and error logs may be processed for security and stability.",
    ],
  },
  {
    title: "How We Use It",
    body: [
      "Contact form information is used to receive support requests, reply when needed, and send an automatic confirmation email.",
      "Technical logs are used to debug the website, prevent abuse, and keep the experience working across devices.",
      "We do not sell visitor data.",
    ],
  },
  {
    title: "Email And Contact Messages",
    body: [
      "Messages submitted through Contact Command may be stored by the website server and delivered to the Subject 14 support mailbox.",
      "The email address you enter may be used as the reply-to address so support can respond directly to you.",
      "Do not submit sensitive passwords, payment information, or private account details through the contact form.",
    ],
  },
  {
    title: "Operator Access",
    body: [
      "Owner-only editing tools are restricted to authorized operators.",
      "Authentication cookies may be used only to maintain an authenticated operator session.",
      "Visitors should not attempt to access, bypass, or interfere with operator-only tools.",
    ],
  },
  {
    title: "Retention",
    body: [
      "Contact messages and routine logs may be kept as long as needed to manage player communication, support requests, security, and website maintenance.",
      "You can request removal of a contact message by reaching out through the same support channel.",
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    title: "Use Of The Website",
    body: [
      "Subject 14 and its website are provided for game information, media, support communication, and promotional use.",
      "You may browse the site, view media, and use the contact form for legitimate questions, support requests, or feedback.",
      "You may not misuse the site, overload it, attempt unauthorized access, or interfere with other visitors.",
    ],
  },
  {
    title: "Game Content And Media",
    body: [
      "Screenshots, branding, names, design, writing, and other Subject 14 materials remain the property of their respective owner unless otherwise stated.",
      "You may not copy, resell, impersonate, or redistribute official assets in a way that misleads people or suggests unauthorized ownership.",
      "Demo availability, visuals, features, and release details may change over time.",
    ],
  },
  {
    title: "Downloads And Platform Support",
    body: [
      "Any downloadable build is provided as-is and should be used at your own discretion.",
      "The game currently targets Windows PC support unless otherwise stated on the website.",
      "System requirements, download links, and platform availability may be updated without notice.",
    ],
  },
  {
    title: "Contact Form Rules",
    body: [
      "Use Contact Command respectfully and only for real communication related to Subject 14.",
      "Do not submit spam, harassment, illegal content, malicious links, or private credentials.",
      "Abusive messages may be ignored, deleted, or blocked.",
    ],
  },
  {
    title: "No Warranty",
    body: [
      "The website is provided as-is. We try to keep it available and accurate, but errors, downtime, or outdated information may occur.",
      "Subject 14 is not responsible for damage caused by misuse of the site, unsupported devices, third-party platforms, or unofficial downloads.",
    ],
  },
];

const legalContent = {
  privacy: {
    kicker: "Privacy Protocol",
    title: "Privacy Policy",
    updated: "Last updated: June 13, 2026",
    intro:
      "This page explains what information the Subject 14 website handles, why it is used, and how contact messages are processed.",
    icon: ShieldCheck,
    sections: privacySections,
  },
  terms: {
    kicker: "Terms Of Engagement",
    title: "Terms Of Service",
    updated: "Last updated: June 13, 2026",
    intro:
      "These terms explain how visitors may use the Subject 14 website, media, downloads, contact form, and operator-protected features.",
    icon: FileText,
    sections: termsSections,
  },
};

export default function LegalPage({ type }: LegalPageProps) {
  const content = legalContent[type];
  const Icon = content.icon;

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-10 lg:pt-32">
      <div className="absolute inset-0 -z-10">
        <img
          src="/site-images/labpic8.png"
          alt=""
          className="h-full w-full scale-105 object-cover object-center opacity-18 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(179,32,32,0.13),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.84),rgba(0,0,0,0.96))]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="section-frame">
        <a
          href="#home"
          className="mb-8 inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/35 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/62 transition-colors hover:border-primary/35 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Site
        </a>

        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-copy-kicker mb-4 text-primary">{content.kicker}</p>
              <h1 className="section-heading text-4xl sm:text-5xl md:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">{content.intro}</p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-primary">
              <Icon className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-[0.18em]">{content.updated}</span>
            </div>
          </div>

          <div className="grid gap-5">
            {content.sections.map((section, index) => (
              <article
                key={section.title}
                className="panel-film border-horror rounded-[1rem] p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-xl uppercase tracking-[0.08em] text-white sm:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-3 text-sm leading-7 text-white/66 sm:text-base">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
