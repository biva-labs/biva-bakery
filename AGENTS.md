# Agent Guide: Biva Bakery & Hotel Repository

This document provides essential information for AI agents working in this repository. Follow these guidelines to maintain consistency and ensure high-quality contributions.

## Project Overview

This is a monorepo containing:

- **`backend/`**: A Node.js API using Hono, TypeScript, and Drizzle ORM.
- **`frontend/`**: A React application using Vite, TypeScript, and Tailwind CSS.

---

## 1. Build, Lint, and Test Commands

### Backend Commands

| Action             | Command                                         |
| :----------------- | :---------------------------------------------- |
| **Development**    | `npm run dev` (uses `tsx watch`)                |
| **Build**          | `npm run build` (uses `tsc`)                    |
| **Database Sync**  | `npx drizzle-kit push` (to sync schema with DB) |
| **Drizzle Studio** | `npx drizzle-kit studio`                        |

### Frontend Commands

| Action          | Command                     |
| :-------------- | :-------------------------- |
| **Development** | `npm run dev` (starts Vite) |
| **Build**       | `npm run build`             |
| **Lint**        | `npm run lint`              |
| **Preview**     | `npm run preview`           |

### Testing

There is no automated test suite (Jest/Vitest) currently configured in `package.json`.

- **Manual Verification:** Use `npm run dev` and verify changes in the browser or via API calls.
- **Single Test File:** If a test file is added manually, run it using `npx tsx <path-to-test-file>`.

---

## 2. Code Style Guidelines

### General

- **Indentation:** 4 spaces.
- **Semicolons:** Required.
- **Line Length:** Aim for < 100 characters.
- **Encoding:** UTF-8.

### TypeScript & Types

- **Strict Mode:** Enabled in both `backend` and `frontend`.
- **Inference:** Let TypeScript infer simple types; explicitly define complex interfaces and API responses.
- **Interfaces vs Types:** Prefer `interface` for object shapes that might be extended, and `type` for unions or aliases.
- **Naming:** `PascalCase` for Interfaces, Types, and Components. `camelCase` for variables and functions.

### Imports & File Organization

- **Frontend Paths:** Use `@/` alias for `src/` (e.g., `import { Button } from "@/components/ui/button"`).
- **Backend Paths:** Use relative paths (e.g., `import { Ping } from "./controllers/ping.ts"`).
- **Extensions:** Include `.ts` extension in backend imports as per `verbatimModuleSyntax`.
- **Order:**
    1. Third-party libraries (React, Hono, Lucide, etc.)
    2. Internal modules/components
    3. Types and constants
    4. CSS/Styles

### Backend (Hono)

- **Controllers:** Logic should be separated into `src/controllers/`.
- **Database:** Use Drizzle ORM for all DB interactions. Schema is located in `backend/src/db/schema.ts`.
- **Zod:** Use Zod for request validation via `@hono/zod-validator`.

### Frontend (React)

- **Components:** Functional components with Arrow Function or `function` keyword.
- **Styling:** Use Tailwind CSS utility classes. Avoid inline styles unless dynamic (e.g., `App.tsx` announcements).
- **State:** Use `zustand` for global state and `React Query` for server state.
- **Icons:** Use `lucide-react` for most icons.

### Error Handling

- **Backend:** Use `try-catch` blocks in controllers and return appropriate JSON error responses (400, 404, 500).
- **Frontend:** Use `sonner` for toast notifications. Wrap complex UI in `react-error-boundary`.

---

## 3. Cursor & Copilot Rules

(No existing project-specific rule files found. Adhere to these AGENTS.md guidelines as the primary source of truth.)
