import { SocialLinks } from "@/components/social-links";
import type { Messages } from "@/lib/i18n/types";
import { site } from "@/lib/site";

type SiteFooterProps = {
  messages: Messages;
};

export function SiteFooter({ messages }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-ink">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            {messages.home.jobTitle} · {messages.home.location}
          </p>
        </div>

        <SocialLinks />

        <p className="text-xs text-muted">
          {messages.chrome.copyright} {site.name}
        </p>
      </div>
    </footer>
  );
}
