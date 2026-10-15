import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} through the contact form.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: `Get in touch with ${site.name} through the contact form.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <PageIntro
        kicker="Contact"
        title="You wanna reach out?"
        description="Send a note through the form. Socials are here too if you prefer that path."
      />

      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal instant delayMs={200} className="surface-card h-fit p-6 sm:p-8">
          <p className="text-sm font-medium text-accent">Elsewhere</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Prefer a different channel? Find me on these platforms.
          </p>
          <SocialLinks
            className="mt-8 flex items-center gap-4"
            iconClassName="h-6 w-6"
          />
        </Reveal>

        <Reveal instant delayMs={320} className="surface-card p-6 sm:p-8">
          <p className="mb-5 text-sm font-medium text-accent">Send a note</p>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
