import Link from "next/link";
import { PROFILE } from "@/lib/projects";

export default function ContactPage() {
  const telHref = `tel:${PROFILE.phone.replace(/[^\d+]/g, "")}`;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-200">
        Want to work together? Reach out by email or phone.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Email
          </div>
          <Link
            href={`mailto:${PROFILE.email}`}
            className="mt-2 block text-lg font-semibold hover:underline"
          >
            {PROFILE.email}
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Phone
          </div>
          <Link href={telHref} className="mt-2 block text-lg font-semibold hover:underline">
            {PROFILE.phone}
          </Link>
        </div>
      </div>
    </main>
  );
}

