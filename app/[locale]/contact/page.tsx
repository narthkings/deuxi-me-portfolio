import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { getMessages } from "@/lib/i18n/get-messages";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { isLocale, type Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return buildPageMetadata({
    locale: raw,
    path: "/contact",
    title: messages.nav.contact,
    description: messages.contactPage.metaDescription,
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const messages = getMessages(locale);
  const t = messages.contactPage;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <PageIntro
        kicker={t.kicker}
        title={t.title}
        description={t.description}
      />

      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal instant delayMs={200} className="surface-card h-fit p-6 sm:p-8">
          <p className="text-sm font-medium text-accent">{t.elsewhere}</p>
          <p className="mt-3 text-sm leading-6 text-muted">{t.elsewhereBlurb}</p>
          <SocialLinks
            className="mt-8 flex items-center gap-4"
            iconClassName="h-6 w-6"
          />
        </Reveal>

        <Reveal instant delayMs={320} className="surface-card p-6 sm:p-8">
          <p className="mb-5 text-sm font-medium text-accent">{t.sendNote}</p>
          <ContactForm
            locale={locale}
            copy={messages.contactForm}
            errors={messages.contactErrors}
          />
        </Reveal>
      </section>
    </div>
  );
}
