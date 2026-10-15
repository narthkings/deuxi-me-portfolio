import { Reveal } from "@/components/reveal";

type PageIntroProps = {
  kicker: string;
  title: string;
  description?: string;
};

export function PageIntro({ kicker, title, description }: PageIntroProps) {
  return (
    <div className="pb-10">
      <Reveal instant delayMs={0}>
        <p className="text-sm font-medium text-accent">{kicker}</p>
      </Reveal>
      <Reveal instant delayMs={90}>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
      </Reveal>
      {description ? (
        <Reveal instant delayMs={180}>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
