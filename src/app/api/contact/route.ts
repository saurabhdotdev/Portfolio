import { NextResponse } from "next/server";

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "saurabh.work555@gmail.com";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type RawPayload = Partial<ContactPayload> & {
  company?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildMailtoHref(payload: ContactPayload) {
  const subject = encodeURIComponent(
    payload.subject || `Portfolio inquiry from ${payload.name}`,
  );
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  );

  return `mailto:${CONTACT_TO_EMAIL}?subject=${subject}&body=${body}`;
}

function buildTextEmail(payload: ContactPayload) {
  return [
    "New portfolio contact message",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject || "Portfolio inquiry"}`,
    "",
    payload.message,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtmlEmail(payload: ContactPayload) {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const subject = escapeHtml(payload.subject || "Portfolio inquiry");
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin: 0 0 16px;">New portfolio contact message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="margin-top: 20px; padding: 16px; border-left: 4px solid #111827; background: #f9fafb;">
        ${message}
      </div>
    </div>
  `;
}

async function sendWithResend(payload: ContactPayload) {
  if (!process.env.RESEND_API_KEY) {
    return { configured: false, ok: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: payload.email,
        subject: payload.subject || `Portfolio inquiry from ${payload.name}`,
        text: buildTextEmail(payload),
        html: buildHtmlEmail(payload),
      }),
    });

    return {
      configured: true,
      ok: response.ok,
    };
  } catch {
    return {
      configured: true,
      ok: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let rawPayload: RawPayload;

  try {
    rawPayload = (await request.json()) as RawPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (text(rawPayload.company)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payload: ContactPayload = {
    name: text(rawPayload.name),
    email: text(rawPayload.email),
    subject: text(rawPayload.subject),
    message: text(rawPayload.message),
  };

  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  if (payload.name.length < 2) {
    errors.name = "Enter your name.";
  }

  if (!isEmail(payload.email)) {
    errors.email = "Enter a valid email.";
  }

  if (payload.subject.length > 120) {
    errors.subject = "Keep the subject under 120 characters.";
  }

  if (payload.message.length < 20) {
    errors.message = "Write at least 20 characters.";
  }

  if (payload.message.length > 2000) {
    errors.message = "Keep the message under 2000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const delivery = await sendWithResend(payload);

  if (delivery.configured && delivery.ok) {
    return NextResponse.json({
      ok: true,
      delivery: "email",
      message: "Message sent.",
    });
  }

  if (delivery.configured && !delivery.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email delivery failed. Please use the direct email link.",
        mailtoHref: buildMailtoHref(payload),
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      delivery: "email-client",
      message: "Message prepared.",
      mailtoHref: buildMailtoHref(payload),
    },
    { status: 202 },
  );
}
