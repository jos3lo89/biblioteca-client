# Agent Guidelines for biblioteca-client

This document provides guidelines for agentic coding assistants working on this codebase.

## Project Overview

**Technology Stack:**
- React 19.2 with TypeScript
- Vite 7 with SWC for fast builds
- ESLint 9 with flat config
- No test framework currently configured

**Package Manager:** npm

## Build, Lint, and Test Commands

### Standard Commands

```bash
# Development
npm run dev              # Start Vite dev server (http://localhost:5173)

# Build
npm run build            # Run TypeScript type check + Vite production build
npm run preview          # Preview production build locally

# Linting
npm run lint             # Run ESLint on all .ts and .tsx files
```

### Testing

**Note:** This project does not currently have a test framework configured. If adding tests:
- Prefer Vitest (integrates well with Vite)
- Use `.test.ts` or `.spec.ts` naming convention
- Add test scripts to package.json

### Single Test Execution

When a test framework is added:
```bash
# Vitest (recommended)
npm run test -- path/to/file.test.ts
npm run test -- -t "specific test name"
```

## Code Style Guidelines

### TypeScript Configuration

This project uses **strict TypeScript**:
- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals: true` - Unused variables are errors
- `noUnusedParameters: true` - Unused parameters are errors
- `noFallthroughCasesInSwitch: true` - Switch statements must be exhaustive
- Target: ES2022
- JSX: react-jsx (no need to import React in components)

### Imports

**Order and Organization:**
1. External dependencies first (react, react-dom, etc.)
2. Internal absolute imports
3. Relative imports
4. CSS/asset imports last

**React Imports:**
```typescript
// Correct - named imports from 'react'
import { useState, useEffect } from 'react'

// Correct - no need to import React with react-jsx
function MyComponent() {
  return <div>Hello</div>
}
```

**File Extensions:**
- Always include `.tsx` extension when importing TypeScript React components
- Always include `.ts` extension when importing TypeScript modules
- This is required due to `verbatimModuleSyntax: true`

```typescript
// Correct
import App from './App.tsx'
import { utils } from './utils.ts'

// Incorrect
import App from './App'
import { utils } from './utils'
```

### Formatting

**Indentation:** 2 spaces (no tabs)

**Semicolons:** Required (as seen in existing code)

**Quotes:** Single quotes preferred for strings

**Function Components:**
```typescript
// Preferred for most components
function ComponentName() {
  return <div>Content</div>;
}

export default ComponentName;

// Named exports for utility components
export function UtilityComponent() {
  return <div>Utility</div>;
}
```

### Types and Interfaces

**Explicit Types:**
- Always define types for function parameters and return values
- Use TypeScript inference for variables when type is obvious
- No `any` types - use `unknown` if type is truly unknown

```typescript
// Correct
function processData(input: string): number {
  return input.length;
}

// Avoid
function processData(input: any) {
  return input.length;
}
```

**Props Typing:**
```typescript
// Preferred - interface for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

### Naming Conventions

- **Components:** PascalCase (e.g., `UserProfile`, `NavigationBar`)
- **Files:** Match component name (e.g., `UserProfile.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useAuth`, `useFetch`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Variables/Functions:** camelCase (e.g., `userData`, `handleClick`)
- **Types/Interfaces:** PascalCase (e.g., `UserData`, `ApiResponse`)

### Error Handling

**Async Operations:**
```typescript
// Preferred
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

**Type Guards:**
```typescript
// Use type guards for narrowing
function isValidUser(user: unknown): user is User {
  return typeof user === 'object' && user !== null && 'id' in user;
}
```

## File Organization

```
src/
├── components/     # Reusable React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions and helpers
├── types/          # Shared TypeScript types and interfaces
├── services/       # API calls and external service interactions
├── assets/         # Images, SVGs, static files
└── main.tsx        # Application entry point
```

## ESLint Rules

This project uses:
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `react-hooks` flat config recommended rules
- `react-refresh` Vite config

**Key rules enforced:**
- React Hooks rules (proper dependencies, no conditional hooks)
- React Refresh requirements (components must be exported correctly)
- TypeScript best practices

## Common Patterns

**Non-null Assertion:**
```typescript
// Only use when you're certain element exists
createRoot(document.getElementById('root')!).render(<App />);
```

**React 19 Features:**
- Use new hooks like `use()` for async operations when appropriate
- StrictMode is enabled by default

## Before Committing

1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to ensure TypeScript compilation succeeds
3. Fix all unused variables and imports (enforced by TypeScript config)
4. Ensure all files use `.ts` or `.tsx` extensions in imports
