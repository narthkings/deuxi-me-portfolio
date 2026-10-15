"use server";

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

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      ok: false,
      message:
        "The contact form is not configured yet. Please try again later or reach out via LinkedIn.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        replyto: email,
        subject: `Portfolio message from ${name}`,
        from_name: "Dumto Imoh Portfolio",
      }),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !result.success) {
      return {
        ok: false,
        message:
          result.message ||
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
