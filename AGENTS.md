# Agent Guidelines for biblioteca-client

This document provides guidelines for agentic coding assistants working on this codebase.

## Project Overview

**Technology Stack:**
- React 19.2 with TypeScript
- Vite 7 with SWC for fast builds
- ESLint 9 with flat config
- No test framework currently configured
- Tailwind CSS 4, Radix UI (dialog, alert-dialog, slot), React Query, React Router, Zustand, React Hook Form + Zod, React PDF

**Package Manager:** npm

**Path Alias:** `@/*` maps to `src/*`

## Build, Lint, and Test Commands

```bash
# Development
npm run dev              # Start Vite dev server (http://localhost:5173)

# Build
npm run build            # Run TypeScript type check + Vite production build
npm run preview          # Preview production build locally

# Linting
npm run lint             # Run ESLint on all .ts and .tsx files
```

**Testing:** No test framework configured. If adding tests, prefer Vitest with `.test.ts` or `.spec.ts` naming convention.

## Restrictions

- **DO NOT** start the dev server (`npm run dev`)
- **DO NOT** run the development server or any server-related commands
- **DO NOT** write or run tests - the user will handle testing themselves
- **DO NOT** execute test commands or create test files

## Code Style Guidelines

### TypeScript Configuration

Strict TypeScript is enforced:
- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- Target: ES2022, JSX: react-jsx
- `verbatimModuleSyntax: true` requires `.ts`/`.tsx` extensions in imports

### Imports Order

1. External dependencies (react, @tanstack/react-query, etc.)
2. Internal absolute imports (@/...)
3. Relative imports (./, ../)
4. CSS/asset imports last

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import './styles.css';
```

### Formatting

- **Indentation:** 2 spaces (no tabs)
- **Semicolons:** Required
- **Quotes:** Single quotes preferred

### Components

```typescript
// Use function components with default exports
function LoginPage() {
  return <div>Login</div>;
}
export default LoginPage;

// Named exports for utility/helper components
export function AuthGuard({ children }: AuthGuardProps) {
  return <>{children}</>;
}
```

### Types and Interfaces

- Always define types for function parameters and return values
- No `any` - use `unknown` if type is truly unknown
- Use interfaces for props:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}
```

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Hooks:** camelCase with `use` prefix (`useAuth`, `useFetch`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Variables/Functions:** camelCase (`userData`, `handleClick`)
- **Types/Interfaces:** PascalCase (`UserData`, `ApiResponse`)
- **Files:** Match component/function name

### Error Handling

```typescript
try {
  const data = await fetchData();
  processData(data);
} catch (error) {
  if (error instanceof Error) {
    console.error('Failed to fetch:', error.message);
  }
  throw error;
}
```

## File Organization

```
src/
├── components/ui/     # Reusable UI components (shadcn-like)
├── features/          # Feature-based modules (auth/, books/, dashboard/)
├── layouts/           # Layout components (AdminLayout, AuthLayout, etc.)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and helpers
├── routes/            # Route definitions
└── main.tsx           # Application entry point
```

## ESLint Rules

Uses `@eslint/js`, `typescript-eslint`, `react-hooks`, and `react-refresh`. Key rules:
- React Hooks dependencies must be complete
- Components must have proper exports for HMR
- No unused variables or imports

## Before Committing

1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to ensure TypeScript compilation succeeds
3. Fix all unused variables and imports
