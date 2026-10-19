import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { TechIcon } from "@/components/tech-icon";
import { getMessages } from "@/lib/i18n/get-messages";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/routing";
import { featuredExperience, site, skills } from "@/lib/site";

const techShowcase = [
  ...skills.core,
  ...skills.styling.slice(0, 2),
  ...skills.data.slice(0, 2),
];

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return buildPageMetadata({
    locale: raw,
    path: "/",
    description: messages.meta.description,
  });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const messages = getMessages(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: messages.home.jobTitle,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Frontend Engineering",
      "User Experience",
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-soft/80 blur-3xl" />
          <div className="absolute -right-16 top-24 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-teal-100/60 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12 lg:gap-16">
          <div>
            <p
              className="animate-fade-in text-sm font-medium text-accent"
              style={{ ["--delay" as string]: "0ms" }}
            >
              {messages.home.location}
            </p>
            <h1
              className="animate-fade-up mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
              style={{ ["--delay" as string]: "80ms" }}
            >
              {messages.home.hello}{" "}
              <span className="text-ink">{site.name}</span>
            </h1>
            <p
              className="animate-fade-up mt-4 text-xl font-medium text-muted sm:text-2xl"
              style={{ ["--delay" as string]: "160ms" }}
            >
              {messages.home.jobTitle}
            </p>
            <p
              className="animate-fade-up mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg"
              style={{ ["--delay" as string]: "240ms" }}
            >
              {messages.home.bio}
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ ["--delay" as string]: "320ms" }}
            >
              <Link
                href={localizedPath(locale, "/projects")}
                className="btn-ink inline-flex items-center border border-ink bg-ink px-6 py-3 text-sm font-medium text-bg no-underline hover:border-accent hover:bg-accent"
              >
                {messages.home.viewProjects}
              </Link>
              <Link
                href={localizedPath(locale, "/contact")}
                className="btn-ghost inline-flex items-center border border-border bg-surface px-6 py-3 text-sm font-medium text-ink no-underline"
              >
                {messages.home.contactMe}
              </Link>
            </div>
          </div>

          <div
            className="animate-fade-up relative mx-auto flex w-full max-w-md flex-col items-center md:mx-0 md:max-w-none"
            style={{ ["--delay" as string]: "200ms" }}
          >
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-soft via-sky-100 to-teal-50"
              />
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-surface shadow-lg shadow-ink/10 sm:h-48 sm:w-48">
                <span className="font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                  DI
                </span>
              </div>
            </div>

            <div className="glass-chip absolute right-0 top-6 rounded-2xl px-4 py-3 text-sm sm:right-4 sm:top-10">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {messages.home.status}
              </p>
              <p className="mt-1 font-semibold text-accent">
                {messages.home.availability}
              </p>
            </div>

            <div className="glass-chip mt-6 w-full max-w-xs rounded-2xl px-5 py-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{messages.home.focus}</dt>
                  <dd className="font-medium text-ink">React / Next.js</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{messages.home.languages}</dt>
                  <dd className="font-medium text-ink">EN · FR</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{messages.home.basedIn}</dt>
                  <dd className="font-medium text-ink">
                    {messages.home.location}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="surface-card grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="text-sm font-medium text-accent">
                {messages.home.aboutKicker}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
                {messages.home.aboutTitle}
              </h2>
            </div>
            <div>
              <p className="text-base leading-7 text-muted">
                {messages.home.description}
              </p>
              <p className="mt-4 text-base leading-7 text-muted">
                {messages.home.focusBlurb}
              </p>
              <Link
                href={localizedPath(locale, "/resume")}
                className="btn-ghost mt-6 inline-flex border border-border px-5 py-2.5 text-sm font-medium text-ink no-underline"
              >
                {messages.home.learnMore}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-band px-6 py-16 text-band-ink sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {messages.home.stackTitle}
              </h2>
              <p className="mt-3 text-band-muted">
                {messages.home.stackSubtitle}
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {techShowcase.map((tech, index) => (
              <Reveal
                key={tech}
                as="li"
                delayMs={Math.min(index * 40, 200)}
                className="tech-tile flex flex-col items-center gap-3 px-4 py-6 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-band text-accent">
                  <TechIcon name={tech} className="h-7 w-7" />
                </span>
                <span className="text-sm font-medium text-band-ink">{tech}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-accent">
                {messages.home.selectedWorkKicker}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
                {messages.home.selectedWorkTitle}
              </h2>
            </div>
            <Link
              href={localizedPath(locale, "/projects")}
              className="text-sm font-medium text-muted no-underline transition-colors hover:text-accent"
            >
              {messages.home.seeAllWork}
            </Link>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4">
          {featuredExperience.map((item, index) => {
            const copy = messages.experience[item.id];
            return (
              <Reveal
                key={item.id}
                as="li"
                delayMs={index * 80}
                className="surface-card p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-ink">
                      {item.company}
                    </p>
                    <p className="mt-1 text-sm text-muted">{copy.role}</p>
                  </div>
                  <p className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    {copy.dates}
                  </p>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                  {copy.summary}
                </p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delayMs={120}>
          <p className="mt-8 text-sm text-muted">
            {messages.home.preferLongForm}{" "}
            <Link
              href={localizedPath(locale, "/resume")}
              className="font-medium text-accent no-underline hover:underline"
            >
              {messages.home.readFullResume}
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}
