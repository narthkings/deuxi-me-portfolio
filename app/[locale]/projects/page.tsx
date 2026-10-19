import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getMessages } from "@/lib/i18n/get-messages";
import { buildPageMetadata } from "@/lib/i18n/metadata";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/routing";
import { experience, projects } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return buildPageMetadata({
    locale: raw,
    path: "/projects",
    title: messages.nav.projects,
    description: messages.projectsPage.metaDescription,
  });
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const messages = getMessages(locale);
  const t = messages.projectsPage;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <PageIntro
        kicker={t.kicker}
        title={t.title}
        description={t.description}
      />

      <section className="mt-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t.professionalWork}
            </h2>
            <Link
              href={localizedPath(locale, "/resume")}
              className="text-sm font-medium text-muted no-underline transition-colors hover:text-accent"
            >
              {t.fullResume}
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4">
          {experience.map((item, index) => {
            const copy = messages.experience[item.id];
            return (
              <Reveal
                key={item.id}
                as="li"
                delayMs={Math.min(index * 50, 250)}
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
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t.selectedBuilds}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {t.selectedBuildsBlurb}
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => {
            const copy = messages.projects[project.id];
            return (
              <Reveal
                key={project.id}
                as="li"
                delayMs={Math.min(index * 50, 250)}
                className="surface-card flex h-full flex-col p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  {project.href ? (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-ink no-underline transition-colors hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  ) : (
                    <p className="text-xl font-semibold text-ink">
                      {project.title}
                    </p>
                  )}
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    {project.href ? t.live : t.archive}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {copy.description}
                </p>
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 break-all text-sm font-medium text-accent no-underline hover:underline"
                  >
                    {project.href
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                  </Link>
                ) : null}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delayMs={80}>
          <p className="mt-8 text-sm text-muted">
            {t.moreOnGithub}{" "}
            <Link
              href="https://github.com/narthkings"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent no-underline hover:underline"
            >
              GitHub
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  );
}
