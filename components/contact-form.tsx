"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/actions/contact";

const initialState: ContactState = {
  ok: false,
  message: "",
};

const fieldClass =
  "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
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

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
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
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          placeholder="Amazing portfolio — I'd like you to work with my team on a project"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-ink inline-flex border border-ink bg-ink px-6 py-3 text-sm font-medium text-bg hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      {state.message ? (
        <p
          role="status"
          className={`text-sm leading-6 ${state.ok ? "text-accent" : "text-red-600"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
