"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/actions/contact";
import type { Locale } from "@/lib/i18n/routing";
import type { Messages } from "@/lib/i18n/types";

const initialState: ContactState = {
  ok: false,
  message: "",
};

const fieldClass =
  "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

type ContactFormProps = {
  locale: Locale;
  copy: Messages["contactForm"];
  errors: Messages["contactErrors"];
};

export function ContactForm({ locale, copy, errors }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  const displayMessage =
    state.code && state.code in errors
      ? errors[state.code as keyof typeof errors]
      : state.message;

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-muted"
        >
          {copy.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-muted"
        >
          {copy.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-muted"
        >
          {copy.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          placeholder={copy.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-ink inline-flex border border-ink bg-ink px-6 py-3 text-sm font-medium text-bg hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? copy.sending : copy.send}
      </button>

      {displayMessage ? (
        <p
          role="status"
          className={`text-sm leading-6 ${state.ok ? "text-accent" : "text-red-600"}`}
        >
          {displayMessage}
        </p>
      ) : null}
    </form>
  );
}
