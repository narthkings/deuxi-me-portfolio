import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { experience, projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Professional work and selected builds by ${site.name}.`,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects — ${site.name}`,
    description: `Professional work and selected builds by ${site.name}.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <PageIntro
        kicker="Projects"
        title="Professional work, then selected builds."
        description="Roles from LinkedIn, then shipped products and projects from that same story — markets, lending, health-tech, and side builds."
      />

      <section className="mt-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Professional work
            </h2>
            <Link
              href="/resume"
              className="text-sm font-medium text-muted no-underline transition-colors hover:text-accent"
            >
              Full resume →
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4">
          {experience.map((item, index) => (
            <Reveal
              key={`${item.company}-${item.role}`}
              as="li"
              delayMs={Math.min(index * 50, 250)}
              className="surface-card p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xl font-semibold text-ink">
                    {item.company}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.role}</p>
                </div>
                <p className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                  {item.dates}
                </p>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                {item.summary}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Selected builds
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Selected products and projects from LinkedIn — live links where
            public. A deeper case-study pass can come later.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
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
                  {project.href ? "Live" : "Archive"}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {project.description}
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
          ))}
        </ul>

        <Reveal delayMs={80}>
          <p className="mt-8 text-sm text-muted">
            More code lives on{" "}
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
