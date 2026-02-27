# Static DApp Template

Static DApp starter template — React + wagmi + viem + TanStack Router. No server required.

## Commands

```bash
npm run dev          # Start dev server (port 3001)
npm run build        # Production build
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
```

## Architecture

```
src/
├── components/
│   ├── AuthExample.tsx              # General DApp example (not contract-bound)
│   ├── FormExample.tsx              # General DApp example (not contract-bound)
│   ├── contracts/
│   │   └── example-contract/        # Contract-specific UI components
│   │       └── ContractExample.tsx
│   ├── layout/                      # Header, Footer
│   ├── theme/                       # ThemeToggle
│   ├── ui/                          # shadcn/ui primitives (auto-generated)
│   └── web3/                        # WalletConnect, TransactionButton, NetworkGuard
├── hooks/
│   ├── contracts/
│   │   └── example-contract/        # Contract-specific hooks
│   │       └── useCounter.ts
│   ├── useAuth.tsx                  # Auth context + SIWE provider
│   ├── useTheme.tsx                 # Theme context + provider
│   └── useTransactionFlow.ts        # Tx lifecycle state machine
├── lib/
│   ├── contracts/
│   │   └── example-contract/        # Contract ABI + address config
│   │       └── abi.ts
│   ├── env.ts                       # Runtime env validation (Zod)
│   ├── utils.ts                     # cn() helper
│   └── wagmi.ts                     # wagmi + connector config
├── routes/                          # TanStack Router file-based routes
│   ├── __root.tsx
│   ├── index.tsx
│   ├── about.tsx
│   └── examples/
│       ├── auth.tsx
│       ├── form.tsx
│       └── contract.tsx
└── main.tsx                         # Entry point + provider nesting
```

### Contract namespacing

Each contract the DApp interacts with gets its own `<contract-name>/` directory in three places:

- `src/lib/contracts/<contract-name>/` — ABI + address config
- `src/hooks/contracts/<contract-name>/` — Read hooks and event watchers
- `src/components/contracts/<contract-name>/` — UI specific to that contract

General-purpose components (not tied to a specific contract) live directly in `src/components/`.

## Key conventions

### Thin routes

Route files in `src/routes/` should only call `createFileRoute` and delegate to a component. No business logic in route files.

### Context/provider pattern

Contexts co-export the provider and hook from the same file (e.g., `useAuth.tsx` exports both `AuthProvider` and `useAuth`). These files need an eslint override for `react-refresh/only-export-components` — see the override block in `eslint.config.js`.

### Provider nesting order (main.tsx)

```
StrictMode > ThemeProvider > WagmiProvider > QueryClientProvider > AuthProvider > RouterProvider
```

ThemeProvider is outermost (no web3 dependency). WagmiProvider wraps QueryClientProvider (wagmi requires it). AuthProvider wraps Router so auth state is available in all routes.

### Contract interaction pattern

1. Define ABI + address in `lib/contracts/<name>/abi.ts`
2. Create read hooks with `useReadContract` / `useWatchContractEvent` in `hooks/contracts/<name>/`
3. Use `useTransactionFlow` for writes (handles signing → confirming → confirmed lifecycle + toasts)
4. Render with `TransactionButton` which binds to the transaction flow state

### Environment variables

Three files must be updated when adding a new env var:

1. `src/lib/env.ts` — Add Zod validation to `envSchema` and include in `raw` object
2. `src/vite-env.d.ts` — Add TypeScript type to `ImportMetaEnv`
3. `.env.sample` — Add placeholder for other developers

### UI components

shadcn/ui components live in `src/components/ui/`. Add new ones with:

```bash
npx shadcn@latest add <component>
```

Don't hand-write UI primitives — use shadcn/ui.

### Imports

Use the `@/` path alias for all imports (mapped to `src/`).

### Tailwind class merging

Use `cn()` from `@/lib/utils` when merging Tailwind classes (wraps `clsx` + `tailwind-merge`).

## Common tasks

### Adding a new page

1. Create a route file in `src/routes/` (e.g., `src/routes/my-page.tsx`)
2. Create the component in `src/components/`
3. The route file imports the component and passes it to `createFileRoute`
4. `npm run dev` auto-generates `routeTree.gen.ts`

### Adding a new contract

1. Create `src/lib/contracts/<contract-name>/abi.ts` — export ABI and config object
2. Create `src/hooks/contracts/<contract-name>/` — read hooks using `useReadContract`
3. Create `src/components/contracts/<contract-name>/` — UI components for the contract
4. Add any new env vars (e.g., contract address) following the env var convention above

### Adding a new component

- **Contract-specific**: Place in `src/components/contracts/<contract-name>/`
- **General**: Place directly in `src/components/`

### Adding a new hook

- **Contract-specific**: Place in `src/hooks/contracts/<contract-name>/`
- **General**: Place in `src/hooks/`
- Use TanStack Query patterns (`useQuery`, `useMutation`) for async data where applicable — wagmi hooks already use TanStack Query under the hood

### Adding a new context/provider

1. Create a file in `src/hooks/` (e.g., `useMyContext.tsx`)
2. Co-export the provider component and the consumer hook
3. Add an eslint override in `eslint.config.js` for the file (to suppress `react-refresh/only-export-components`)
4. Wrap in `main.tsx` at the appropriate nesting level

### Adding a new env var

1. Add Zod validation to `envSchema` in `src/lib/env.ts`
2. Add the key to the `raw` object in `parseEnv()` in `src/lib/env.ts`
3. Add TypeScript type in `src/vite-env.d.ts`
4. Add placeholder in `.env.sample`

### Adding a shadcn/ui component

```bash
npx shadcn@latest add <component>
```

This generates the component in `src/components/ui/`. Don't edit generated files unless customizing.

## Gotchas

- **eslint override for providers**: Files that co-export a provider + hook need an override in `eslint.config.js` to disable `react-refresh/only-export-components`.
- **routeTree.gen.ts**: Auto-generated by `npm run dev` (TanStack Router plugin). Don't edit manually.
- **SIWE uses `viem/siwe`**, not the `siwe` npm package. The `siwe` package depends on ethers and requires Buffer polyfills that don't work in a pure Vite/browser environment.
- **MetaMask SDK analytics**: Disabled via `enableAnalytics: false` in the `metaMask()` connector config in `src/lib/wagmi.ts`.

## Extending this file

This file is intentionally a single document. At ~170 lines everything here is broadly relevant to most tasks, so there's no benefit to splitting yet.

As the project grows (multiple contracts, backend integrations, domain-specific workflows), split to avoid context bloat:

- **Child-directory `CLAUDE.md`** — Place a `CLAUDE.md` in any subdirectory (e.g., `src/hooks/contracts/my-token/CLAUDE.md`). It loads on-demand only when Claude reads files in that directory. Use for contract-specific context: deployment addresses, known quirks, integration notes.
- **`.claude/rules/*.md`** — Modular rule files that activate based on path patterns via frontmatter. Use for domain-specific coding conventions that only apply to certain parts of the codebase.
- **`@path` imports** — Reference other files from this CLAUDE.md with `@docs/some-guide.md`. Claude resolves these on-demand rather than loading everything upfront.

Keep this root file as a concise index: commands, top-level architecture, and cross-cutting conventions. Move detailed contract knowledge, domain workflows, and specialized patterns into the mechanisms above.
