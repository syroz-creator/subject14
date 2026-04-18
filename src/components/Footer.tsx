import { Ghost } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OperatorPanel from "./OperatorPanel";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14.682.18c1.832 0 3.664-.01 5.496-.01.149 1.717.704 3.39 1.61 4.85.91 1.47 2.16 2.712 3.64 3.604v5.667c-1.707-.054-3.402-.412-4.96-1.108a11.03 11.03 0 0 1-2.894-1.87l-.01 8.176c-.022 1.48-.481 2.936-1.336 4.145a8.79 8.79 0 0 1-3.253 2.824c-1.414.74-3.02 1.11-4.62 1.02-1.914-.1-3.79-.784-5.283-1.988A8.87 8.87 0 0 1 .22 21.14a8.8 8.8 0 0 1 .973-5.588 8.87 8.87 0 0 1 3.984-3.717 8.88 8.88 0 0 1 4.002-.71v5.826a3.62 3.62 0 0 0-2.486.567 3.03 3.03 0 0 0-1.39 2.302 3.03 3.03 0 0 0 .616 2.185 3.61 3.61 0 0 0 2.277 1.274c.77.09 1.57-.07 2.242-.457a3.03 3.03 0 0 0 1.48-2.603V.18Z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.369A19.791 19.791 0 0 0 15.429 3c-.211.375-.457.88-.625 1.275a18.27 18.27 0 0 0-5.608 0A12.57 12.57 0 0 0 8.57 3a19.736 19.736 0 0 0-4.89 1.37C.588 9.04-.249 13.593.17 18.083a19.9 19.9 0 0 0 5.993 2.917c.48-.656.908-1.35 1.277-2.073a12.955 12.955 0 0 1-2.01-.975c.169-.12.333-.246.492-.375 3.877 1.823 8.086 1.823 11.917 0 .16.13.324.255.493.375-.64.394-1.312.72-2.01.975.37.723.797 1.417 1.278 2.073a19.878 19.878 0 0 0 5.993-2.917c.491-5.207-.839-9.719-3.276-13.714ZM8.02 15.331c-1.168 0-2.127-1.078-2.127-2.398 0-1.32.94-2.398 2.127-2.398 1.196 0 2.146 1.088 2.127 2.398 0 1.32-.94 2.398-2.127 2.398Zm7.96 0c-1.169 0-2.127-1.078-2.127-2.398 0-1.32.94-2.398 2.127-2.398 1.196 0 2.146 1.088 2.127 2.398 0 1.32-.94 2.398-2.127 2.398Z" />
    </svg>
  );
}

const socialLinkClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary";

const footerLinkClass =
  "text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-white";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-white/5 bg-black/55 py-12 backdrop-blur-sm">
      <div className="section-frame">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr] lg:items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Ghost className="h-6 w-6 text-primary" />
              <div>
                <p className="font-heading text-lg tracking-[0.08em] text-white">SUBJECT 14</p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/55">
                  Horror Landing Experience
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Atmospheric first-person horror, haunting visuals, and a facility that remembers every visitor.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/ahmad_uwaida/" target="_blank" rel="noreferrer" aria-label="Instagram" className={socialLinkClass}>
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@syr0z_" target="_blank" rel="noreferrer" aria-label="TikTok" className={socialLinkClass}>
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a href="https://discord.com/channels/@me" target="_blank" rel="noreferrer" aria-label="Discord" className={socialLinkClass}>
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/55">Links</p>
            <div className="flex flex-col items-start gap-3">
              <Dialog>
                <DialogTrigger render={<button type="button" className={footerLinkClass} />}>
                  Privacy Policy
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-horror bg-background/95 p-6 backdrop-blur-md">
                  <DialogTitle className="text-sm uppercase tracking-[0.25em] text-primary">Privacy Policy</DialogTitle>
                  <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto text-sm leading-relaxed text-muted-foreground">
                    <p>Subject 14 collects only the minimum information required to operate this website, respond to messages, and secure operator-only access. We do not sell visitor data.</p>
                    <p>If analytics, contact forms, or platform integrations are added later, they should be used only to improve performance, security, and player communication.</p>
                    <p>Operator login information is checked server-side and is not exposed in the client bundle. Session cookies are used only to maintain authenticated operator access.</p>
                    <p>By continuing to use the site, visitors agree that routine technical information such as browser type, device details, and request logs may be processed for stability and security.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger render={<button type="button" className={footerLinkClass} />}>
                  Terms of Service
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-horror bg-background/95 p-6 backdrop-blur-md">
                  <DialogTitle className="text-sm uppercase tracking-[0.25em] text-primary">Terms of Service</DialogTitle>
                  <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto text-sm leading-relaxed text-muted-foreground">
                    <p>Subject 14 and all associated branding, media, and site content are provided for informational and promotional use unless otherwise stated.</p>
                    <p>Visitors may not misuse the site, attempt unauthorized access, interfere with operator-only features, or copy proprietary materials for resale or impersonation.</p>
                    <p>Demo availability, platform support, and release details may change over time. Use of any downloadable build is at the player&apos;s own discretion.</p>
                    <p>Operator-restricted tools are reserved exclusively for the site owner. Any attempt to bypass access controls is prohibited.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/55">Edit Mode</p>
            <Dialog>
              <DialogTrigger render={<button type="button" className={footerLinkClass} />}>
                Local Edit Mode
              </DialogTrigger>
              <DialogContent className="max-w-4xl border-horror bg-background/95 p-6 backdrop-blur-md">
                <DialogTitle className="text-sm uppercase tracking-[0.25em] text-primary">
                  Local Edit Mode
                </DialogTitle>
                <div className="mt-4">
                  <div className="mb-4 rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-muted-foreground">
                    Operator access now requires the correct operator ID and passcode. When the API is available, changes save to the live site; otherwise they still work in this browser on the published page.
                  </div>
                  <OperatorPanel />
                </div>
              </DialogContent>
            </Dialog>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-xs uppercase tracking-widest text-muted-foreground">
              <p>© 2024 SUBJECT 14. {t.footer.rights}</p>
              <p className="mt-2 text-[10px] opacity-60">{t.footer.credits}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
