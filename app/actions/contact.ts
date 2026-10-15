"use server";

import { Resend } from "resend";

export type ContactState = {
  ok: boolean;
  message: string;
};

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill this; humans leave it empty
  if (asString(formData.get("botcheck"))) {
    return { ok: true, message: "Message sent. I will get back to you soon." };
  }

  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const message = asString(formData.get("message"));

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Please fill in your name, email, and message.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
    };
  }

  if (message.length < 10) {
    return {
      ok: false,
      message: "A little more detail in the message would help.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Portfolio <onboarding@resend.com>";

  if (!apiKey || !toEmail) {
    return {
      ok: false,
      message:
        "The contact form is not configured yet. Please try again later or reach out via LinkedIn.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      return {
        ok: false,
        message:
          error.message ||
          "Something went wrong sending the message. Please try again or reach out via LinkedIn.",
      };
    }

    return {
      ok: true,
      message: "Message sent. I will get back to you soon.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Network error while sending. Please try again or reach out via LinkedIn.",
    };
  }
}
