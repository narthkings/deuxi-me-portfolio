import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getMessages } from "@/lib/i18n/get-messages";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/routing";
import { experience, site, skills } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/resume">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return buildPageMetadata({
    locale: raw,
    path: "/resume",
    title: messages.nav.resume,
    description: messages.resumePage.metaDescription,
  });
}

export default async function ResumePage({
  params,
}: PageProps<"/[locale]/resume">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const messages = getMessages(locale);
  const t = messages.resumePage;

  const skillSections = [
    ["core", skills.core, t.skillGroups.core] as const,
    ["styling", skills.styling, t.skillGroups.styling] as const,
    ["data", skills.data, t.skillGroups.data] as const,
    ["tooling", skills.tooling, t.skillGroups.tooling] as const,
    ["languages", t.languageLines, t.skillGroups.languages] as const,
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <PageIntro
        kicker={t.kicker}
        title={t.title}
        description={t.description}
      />

      <Reveal instant delayMs={220}>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href={site.resumeViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink inline-flex border border-ink bg-ink px-5 py-2.5 font-medium text-bg no-underline hover:border-accent hover:bg-accent"
          >
            {t.viewResume}
          </Link>
          <Link
            href={site.resumeDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex border border-border bg-surface px-5 py-2.5 font-medium text-ink no-underline"
          >
            {t.downloadPdf}
            {t.pdfNote ? (
              <span className="ml-1 text-muted">{t.pdfNote}</span>
            ) : null}
          </Link>
          <Link
            href={localizedPath(locale, "/contact")}
            className="font-medium text-muted no-underline transition-colors hover:text-accent"
          >
            {t.contact}
          </Link>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            {messages.home.location}
          </span>
        </div>
      </Reveal>

      <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <Reveal as="aside" delayMs={40} className="space-y-6">
          {skillSections.map(([key, items, label]) => (
            <div key={key} className="surface-card p-5">
              <h2 className="text-sm font-semibold text-accent">{label}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <div>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t.experience}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4">
            {experience.map((item, index) => {
              const copy = messages.experience[item.id];
              return (
                <Reveal
                  key={item.id}
                  as="li"
                  delayMs={Math.min(index * 60, 300)}
                  className="surface-card p-6 sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-ink">
                        {item.company}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{copy.role}</p>
                    </div>
                    <p className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                      {copy.dates}
                    </p>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                    {copy.summary}
                  </p>
                  {copy.highlights ? (
                    <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                      {copy.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              );
            })}
          </ul>

          <Reveal delayMs={80}>
            <p className="mt-10 text-sm text-muted">
              {t.openToWork}{" "}
              <Link
                href={localizedPath(locale, "/contact")}
                className="font-medium text-accent no-underline hover:underline"
              >
                {t.sayHello}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
