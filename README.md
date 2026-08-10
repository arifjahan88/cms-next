This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

Custom email/password auth for the admin dashboard:

- **Packages:** `bcryptjs`, `jose`, `drizzle-orm`, `pg`
- **Session:** JWT signed with `AUTH_SECRET`, stored in an httpOnly `session` cookie
- **Roles:** `1` = Admin, `2` = User (dashboard requires Admin)
- **Routes:** `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- **Guards:** [`proxy.ts`](proxy.ts) + [`app/dashboard/layout.tsx`](app/dashboard/layout.tsx)

### Environment

Copy [`env-example`](env-example) to `.env` and set:

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
AUTH_SECRET=generate-a-long-random-string
SEED_ADMIN_EMAIL=admin@zamil.local
SEED_ADMIN_PASSWORD=ChangeMe123!
SEED_ADMIN_NAME=Admin User
```

### Database scripts

```bash
npm run db:generate   # create SQL from db/schema.ts
npm run db:migrate    # apply migrations
npm run db:seed       # create local admin (if missing)
npm run db:studio     # Drizzle Studio
```

Default seeded admin (local only): `admin@zamil.local` / `ChangeMe123!`

### Smoke test

1. `npm run db:migrate && npm run db:seed`
2. `npm run dev`
3. Open `/login`, sign in with the seeded admin
4. Confirm redirect to `/dashboard` and that visiting `/dashboard` logged-out redirects to `/login`
5. Use the header logout control and confirm return to `/login`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
