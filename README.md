# Zamil Technologies

> **Trusted Software Development Partner**

Zamil Technologies is a full-stack company website and content management platform for presenting digital services, industry expertise, case studies, and company updates. Its protected admin dashboard lets authorized staff manage site content and review customer inquiries from one place.

## Highlights

- Public pages for services, industries, technologies, portfolio, case studies, blog, careers, company information, and contact.
- Admin dashboard for landing page sections, navigation, SEO settings, blog posts, case studies, portfolio projects, job openings, users, consultation requests, and contact messages.
- PostgreSQL data layer powered by Drizzle ORM, with schema migrations and seed data.
- Email and password authentication with hashed passwords, signed sessions, and administrator and viewer roles.
- API routes with shared response handling, validation, and client-side query hooks.
- Responsive interface with reusable UI components, loading states, and toast notifications.
- Dynamic page metadata, Google Analytics / Tag Manager integration, and Vercel Analytics in production.

## Technology

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL · Drizzle ORM · TanStack Query · Zod

## Getting started

### Requirements

- Node.js compatible with the versions specified by the project dependencies
- Yarn (the repository includes `yarn.lock`)
- PostgreSQL database

### Install and configure

```bash
yarn install
cp env-example .env
```

Update `.env` with a database connection and unique secrets. Set strong values for `AUTH_SECRET`, `SEED_ADMIN_PASSWORD`, and (if used) `SEED_VIEWER_PASSWORD`. The sample values in `env-example` are for local development only; never use them in a deployed environment.

```dotenv
DATABASE_URL=postgresql://user:password@host:5432/database
AUTH_SECRET=replace-with-a-long-random-secret
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=replace-with-a-unique-strong-password
SEED_ADMIN_NAME=Site Administrator

# Optional read-only dashboard user
SEED_VIEWER_EMAIL=viewer@example.com
SEED_VIEWER_PASSWORD=replace-with-another-unique-strong-password
SEED_VIEWER_NAME=Content Viewer
```

Apply the database migrations, populate the initial content, and start the development server:

```bash
yarn db:migrate
yarn db:seed
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in to the dashboard at `/login` using the administrator email and password configured above.

## Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the local development server |
| `yarn build` | Build the production application |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |
| `yarn build:test` | Run TypeScript project checks |
| `yarn db:generate` | Generate migrations from the Drizzle schema |
| `yarn db:migrate` | Apply pending database migrations |
| `yarn db:seed` | Seed users and initial site content |
| `yarn db:studio` | Open Drizzle Studio |
| `yarn db:push` | Push the schema directly to the configured database |

## Authentication and roles

Passwords are hashed before storage. Sessions use a signed JWT in an HTTP-only cookie. The administrator role can manage dashboard content and users; the viewer role can access the dashboard with read-only permissions. Create accounts through the seed configuration or the dashboard's user management page.

## Configuration notes

- `.env` files are ignored by Git. Keep production credentials in your hosting provider's secret manager.
- The seed script has fallback local credentials for convenience. Configure unique seed credentials before running it against any shared or production database.
- Replace the demo contact and social-link values in `lib/constants.ts` with the organization's approved details before launch.
- Analytics identifiers are configured in `app/layout.tsx`.

## Security report

The local Git history and the GitHub branches visible during this review were checked for common API token patterns, private key blocks, credential-bearing database URLs, and accidentally committed environment or key files. No private credentials were found in the 31 reachable commits. The public branch refs `main` and `vercel/install-vercel-web-analytics-gkqqcs` matched the remote at review time.

The repository does contain intentionally public sample seed values (`admin@zamil.local` / `ChangeMe123!`) in `env-example` and fallback values in `db/seed.ts`. These are not private secrets, but they are weak demo credentials. Use unique strong values and rotate them immediately if these defaults were ever used on a shared or production deployment. This audit is a pattern-based repository review, not a guarantee that every kind of sensitive information is absent.

## Project details

- **Title:** Zamil Technologies
- **Tagline:** Trusted Software Development Partner
- **Description:** A company website and content management platform for showcasing digital services and managing site content.
- **Tags:** Next.js, React, TypeScript, PostgreSQL, Drizzle ORM, CMS, Admin Dashboard, Digital Agency
