import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from "lucide-react";

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
    title: "Cookies And Google Advertising",
    body: [
      "Subject14.com uses required browser storage to remember site choices, including cookie consent preferences.",
      "If you accept advertising cookies, Google and its partners may use cookies, device identifiers, IP addresses, and browsing data to provide, personalize, and measure ads.",
      "You can reject advertising cookies or reopen cookie settings from the footer to change your choice.",
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
    <section className="relative min-h-[calc(100vh-5rem)] bg-[#f8fafd] px-4 pb-16 pt-28 text-[#202124] sm:px-6 sm:pb-20 lg:px-10 lg:pt-32">
      <div className="mx-auto w-full max-w-5xl">
        <a
          href="#home"
          className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#1a73e8] shadow-sm transition-colors hover:bg-[#f1f3f4]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>

        <div className="overflow-hidden rounded-[1.75rem] border border-[#dadce0] bg-white shadow-[0_1px_2px_rgba(60,64,67,0.15),0_8px_24px_rgba(60,64,67,0.08)]">
          <div className="border-b border-[#e8eaed] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              <Icon className="h-6 w-6" />
            </div>
            <p className="mb-3 text-sm font-medium text-[#5f6368]">{content.kicker}</p>
            <h1 className="max-w-3xl text-4xl font-normal leading-tight tracking-normal text-[#202124] sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#5f6368] sm:text-lg">{content.intro}</p>
            <p className="mt-5 text-sm text-[#5f6368]">{content.updated}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#1a73e8] transition-colors hover:bg-[#f8fafd]"
              >
                Google Privacy Policy
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#1a73e8] transition-colors hover:bg-[#f8fafd]"
              >
                Google cookie information
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="divide-y divide-[#e8eaed]">
            {content.sections.map((section, index) => (
              <article
                key={section.title}
                className="grid gap-4 px-5 py-6 sm:px-8 sm:py-7 md:grid-cols-[7rem_1fr] lg:px-10"
              >
                <div className="text-sm font-medium text-[#1a73e8]">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h2 className="text-xl font-normal leading-7 tracking-normal text-[#202124] sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-[#5f6368] sm:text-base">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
