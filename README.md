# Askr Frontend

Frontend service for the **Askr** design token platform, built with [Next.js 16](https://nextjs.org) and [Bun](https://bun.sh).

## Tech Stack

| Category        | Technology                                  |
| --------------- | ------------------------------------------- |
| Runtime         | [Bun](https://bun.sh)                       |
| Framework       | [Next.js 16](https://nextjs.org) (App Router) |
| Authentication  | [Clerk](https://clerk.com)                  |
| Data Fetching   | fetch + [TanStack Query](https://tanstack.com/query) |
| Forms           | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) |
| State           | [Zustand](https://zustand.docs.pmnd.rs)     |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)  |
| Components      | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) |
| Linting/Format  | [Biome](https://biomejs.dev)                |
| Git Hooks       | [Lefthook](https://github.com/evilmartians/lefthook) |
| Versioning      | [standard-version](https://github.com/conventional-changelog/standard-version) |

## Prerequisites

- [Bun](https://bun.sh) >= 1.x
- A running instance of the **askr-backend** API
- [Clerk](https://clerk.com) account (for authentication keys)

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Set up environment variables

Copy the example file and fill in the required values:

```bash
cp .env.example .env
```

### 3. Set up Git hooks

```bash
bun run prepare:install
```

### 4. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command                      | Description                            |
| ---------------------------- | -------------------------------------- |
| `bun run dev`                | Start development server               |
| `bun run build`              | Create production build                |
| `bun run start`              | Start production server                |
| `bun run biome:format`       | Format source files with Biome         |
| `bun run biome:lint`         | Lint source files with Biome           |
| `bun run biome:check`        | Run Biome format + lint combined       |
| `bun run prepare:install`    | Install Lefthook Git hooks             |
| `bun run release:prod:patch` | Bump patch version (standard-version)  |
| `bun run release:prod:minor` | Bump minor version (standard-version)  |
| `bun run release:prod:major` | Bump major version (standard-version)  |

## Project Structure

```
public/                         # Static assets
src/
├── app/                        # Route-level pages (Next.js App Router)
│   ├── (main)/                 # Main / landing route group
│   ├── (workspace)/            # Workspace route group
│   └── auth/                   # Authentication routes
├── assets/                     # Fonts, styles, internal images
├── components/
│   ├── layout/                 # Shared layout components
│   ├── pages/                  # Page-level components
│   ├── parts/                  # Composed UI sections
│   └── ui/                     # shadcn/ui and custom primitives
├── config/                     # App-wide configuration
├── constants/                  # Shared constants and enums
├── endpoints/
│   └── [domain]/
│       ├── index.ts            # HTTP calls to backend endpoints
│       └── types.ts            # Response type definitions
├── hooks/                      # Custom React hooks
├── lib/
│   ├── helpers/                # Global utility functions
│   └── validators/             # Zod schemas and validation
├── query/
│   └── [domain]/
│       └── index.ts            # TanStack Query hooks + key factories
├── types/                      # Shared TypeScript type definitions
└── proxy.ts                    # API proxy configuration
```

## Docker

The project includes a multi-stage [Dockerfile](Dockerfile) optimized for production using the Next.js standalone output.

### Build

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard \
  -t askr-frontend .
```

### Run

```bash
docker run -p 3000:3000 \
  -e CLERK_SECRET_KEY=sk_live_xxx \
  -e CLERK_WEBHOOK_SECRET=whsec_xxx \
  askr-frontend
```

> **Note:** `NEXT_PUBLIC_*` variables are baked in at build time. Runtime secrets like `CLERK_SECRET_KEY` and `CLERK_WEBHOOK_SECRET` should be passed via `-e` flags or your orchestrator's secret management.
