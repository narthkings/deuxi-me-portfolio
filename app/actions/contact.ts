"use server";

import { getMessages } from "@/lib/i18n/get-messages";
import { isLocale, type Locale } from "@/lib/i18n/routing";
import { Resend } from "resend";

export type ContactErrorCode =
  | "required"
  | "invalidEmail"
  | "messageShort"
  | "notConfigured"
  | "sendFailed"
  | "network"
  | "success";

export type ContactState = {
  ok: boolean;
  message: string;
  code?: ContactErrorCode;
};

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : "en";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = resolveLocale(asString(formData.get("locale")));
  const errors = getMessages(locale).contactErrors;

  // Honeypot — bots fill this; humans leave it empty
  if (asString(formData.get("botcheck"))) {
    return { ok: true, message: errors.success, code: "success" };
  }

  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const message = asString(formData.get("message"));

  if (!name || !email || !message) {
    return { ok: false, message: errors.required, code: "required" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: errors.invalidEmail, code: "invalidEmail" };
  }

  if (message.length < 10) {
    return { ok: false, message: errors.messageShort, code: "messageShort" };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Portfolio <onboarding@resend.com>";

  if (!apiKey || !toEmail) {
    return {
      ok: false,
      message: errors.notConfigured,
      code: "notConfigured",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    if (error) {
      return {
        ok: false,
        message: error.message || errors.sendFailed,
        code: "sendFailed",
      };
    }

    return { ok: true, message: errors.success, code: "success" };
  } catch {
    return { ok: false, message: errors.network, code: "network" };
  }
}
