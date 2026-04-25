# Saurabh Kulkarni Portfolio

Personal portfolio built with Next.js, Tailwind CSS, Vercel, and small backend API routes.

## Features

- Portfolio pages for projects, resume, publications, and contact
- Live GitHub activity from `saurabhdotdev` through `/api/github`
- Backend contact endpoint at `/api/contact`
- Optional automatic email delivery through Resend
- Vercel production deployment

## Local Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.example` to `.env.local` for local secrets:

```bash
copy .env.example .env.local
```

Required for automatic contact form email delivery:

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=saurabh.work555@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

Notes:

- `RESEND_API_KEY` comes from Resend.
- `CONTACT_FROM_EMAIL` must be a sender/domain allowed by Resend.
- Without `RESEND_API_KEY`, the form safely falls back to preparing an email in the visitor's email app.

## Vercel Setup

Add the same variables in Vercel Project Settings > Environment Variables, or through the Vercel CLI:

```bash
npx vercel env add RESEND_API_KEY production
npx vercel env add CONTACT_TO_EMAIL production
npx vercel env add CONTACT_FROM_EMAIL production
```

Redeploy after adding production environment variables:

```bash
npx vercel --prod
```
