"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type ContactResponse = {
  ok: boolean;
  delivery?: "email" | "email-client";
  message?: string;
  error?: string;
  mailtoHref?: string;
  errors?: Partial<Record<keyof FormState, string>>;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ContactResponse["errors"]>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{
    type: "success" | "fallback" | "error";
    message: string;
    mailtoHref?: string;
  } | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as ContactResponse;

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setNotice({
          type: "error",
          message:
            data.error ?? "Something went wrong. Please try direct email.",
          mailtoHref: data.mailtoHref,
        });
        return;
      }

      if (data.delivery === "email-client" && data.mailtoHref) {
        setNotice({
          type: "fallback",
          message: "Message is ready. Open your email app to send it.",
          mailtoHref: data.mailtoHref,
        });
        return;
      }

      setValues(initialState);
      setNotice({
        type: "success",
        message: data.message ?? "Message sent.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Connection failed. Please use direct email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name
          <input
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black dark:focus:border-white"
            autoComplete="name"
            required
          />
          {errors?.name ? (
            <span className="mt-1 block text-xs text-red-600">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="text-sm font-medium">
          Email
          <input
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black dark:focus:border-white"
            type="email"
            autoComplete="email"
            required
          />
          {errors?.email ? (
            <span className="mt-1 block text-xs text-red-600">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium">
        Subject
        <input
          value={values.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black dark:focus:border-white"
          maxLength={120}
        />
        {errors?.subject ? (
          <span className="mt-1 block text-xs text-red-600">
            {errors.subject}
          </span>
        ) : null}
      </label>

      <label className="mt-4 block text-sm font-medium">
        Message
        <textarea
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 min-h-36 w-full resize-y rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-white/10 dark:bg-black dark:focus:border-white"
          required
        />
        {errors?.message ? (
          <span className="mt-1 block text-xs text-red-600">
            {errors.message}
          </span>
        ) : null}
      </label>

      <input
        value={values.company}
        onChange={(event) => updateField("company", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/85"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
        {notice ? (
          <div
            className={
              notice.type === "error"
                ? "text-sm text-red-600"
                : "text-sm text-zinc-700 dark:text-zinc-200"
            }
          >
            <span>{notice.message}</span>
            {notice.mailtoHref ? (
              <a className="ml-2 font-medium underline" href={notice.mailtoHref}>
                Open email
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
