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
- `noFallthroughCasesInSwitch: true`, `erasableSyntaxOnly: true`
- `noUncheckedSideEffectImports: true`, `useDefineForClassFields: true`
- Target: ES2022, JSX: react-jsx
- `verbatimModuleSyntax: true` requires `.ts`/`.tsx` extensions in imports
- `moduleResolution: "bundler"` with ESNext modules

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

## Design System

### Color Palette
| Usage | Color | Tailwind | Hex |
|-------|-------|----------|-----|
| Primary Background | Deep Blue | `bg-[#0b1120]` | `#0b1120` |
| Secondary Background | Navy | `bg-[#0d1627]` | `#0d1627` |
| Accent Color | Brass/Gold | `text-[#b59a5d]` | `#b59a5d` |
| Hover Accent | Light Gold | `hover:bg-[#c6a96e]` | `#c6a96e` |
| Glow Shadows | Gold | `shadow-[0_0_30px_rgba(181,154,93,0.3)]` | - |
| Primary Text | White | `text-white` | `#ffffff` |
| Secondary Text | Slate | `text-slate-400` | `#94a3b8` |
| Tertiary Text | Dark Slate | `text-slate-500` | `#64748b` |
| Subtle Borders | White | `border-white/5` to `border-white/10` | - |

### Typography
- **Headings**: `font-black tracking-tight`
- **Labels**: `text-xs font-bold uppercase tracking-[0.2em]`
- **Body text**: `text-slate-300 leading-relaxed`
- **Quotes**: `font-serif italic`
- **Uppercase headers**: `text-sm font-bold uppercase tracking-[0.2em]`

### Shapes & Borders
- **Cards**: `rounded-[2.5rem]` (extreme rounded)
- **Buttons**: `rounded-xl`, `rounded-2xl`
- **Inputs**: `rounded-2xl`
- **Icon containers**: `rounded-full`, `rounded-2xl`
- **Subtle borders**: `border-white/5` to `border-white/10`

### Effects
- **Backdrop blur**: `backdrop-blur-md`, `backdrop-blur-xl`
- **Gold glow shadows**: `shadow-[0_0_30px_rgba(181,154,93,0.3)]`
- **Background texture**: carbon fibre pattern at 2-5% opacity
- **Blur orbs**: `blur-[120px]`, `blur-3xl` for ambient backgrounds
- **Gradients**: `bg-linear-to-br`, `bg-linear-to-r`, `bg-linear-to-t`

### Animations & Transitions
- **Page load**: `animate-in fade-in slide-in-from-bottom-8 duration-700`
- **Entry animations**: `animate-in fade-in slide-in-from-left-8 duration-1000`
- **Hover effects**: `transition-all duration-300 hover:translate-y-[-8px]`
- **Scale on hover**: `group-hover:scale-110`, `group-hover:scale-x-100`
- **Loading spinners**: `animate-spin rounded-full`
- **Active states**: `active:scale-95`, `active:translate-y-0`
- **Button hover**: `hover:-translate-y-[-2px]`
- **Icon rotation**: `group-hover:rotate-12`

### Component Patterns
- **Card variants**: Glass effect with `bg-white/5 backdrop-blur-md`
- **Primary buttons**: `bg-[#b59a5d] hover:bg-[#c6a96e] text-[#0b1120]`
- **Input focus**: `focus-visible:ring-1 focus-visible:ring-[#b59a5d]`
- **Active nav items**: `bg-[#b59a5d] text-[#0b1120] shadow-[0_8px_20px_rgba(181,154,93,0.2)]`

## State Management & API Patterns

### React Query
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['books', bookId],
  queryFn: () => fetchBook(bookId),
  staleTime: 5 * 60 * 1000,
});
```

### Zustand Store
```typescript
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
```

### React Hook Form + Zod
```typescript
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});```
