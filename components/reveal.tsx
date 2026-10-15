"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "aside";
  delayMs?: number;
  /** When true, starts visible immediately (for above-the-fold content). */
  instant?: boolean;
};

export function Reveal({
  children,
  className = "",
  as = "div",
  delayMs = 0,
  instant = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || instant) return;

    // Reduced motion is handled in CSS (.reveal stays readable without .is-visible).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [instant]);

  const style = {
    "--delay": `${delayMs}ms`,
  } as CSSProperties;

  const classes = `reveal${instant ? " is-visible" : ""} ${className}`.trim();
  const setRef = (element: HTMLElement | null) => {
    ref.current = element;
  };

  switch (as) {
    case "li":
      return (
        <li ref={setRef} className={classes} style={style}>
          {children}
        </li>
      );
    case "section":
      return (
        <section ref={setRef} className={classes} style={style}>
          {children}
        </section>
      );
    case "article":
      return (
        <article ref={setRef} className={classes} style={style}>
          {children}
        </article>
      );
    case "aside":
      return (
        <aside ref={setRef} className={classes} style={style}>
          {children}
        </aside>
      );
    default:
      return (
        <div ref={setRef} className={classes} style={style}>
          {children}
        </div>
      );
  }
}
