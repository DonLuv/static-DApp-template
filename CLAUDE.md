# Static DApp Template

Monorepo template — Solidity contracts (Hardhat v3) + React DApp (wagmi + viem + TanStack Router). Two npm workspaces: `evm/` for smart contracts, `dapp/` for the frontend.

## Commands

```bash
# Root-level orchestration (run from repo root)
npm run compile         # Compile Solidity contracts (evm/)
npm run test:evm        # Run Hardhat tests (evm/)
npm run generate        # Generate typed ABI + hooks from artifacts (dapp/)
npm run dev             # Start DApp dev server on port 3001 (dapp/)
npm run build           # Production build (dapp/)
npm run typecheck       # TypeScript check (dapp/)
npm run lint            # ESLint + solhint — both workspaces
npm run lint:fix        # ESLint with auto-fix
npm run lint:sol        # Solhint only — Solidity linting
npm run format          # Prettier format — both workspaces
npm run format:check    # Prettier check

# Workspace-scoped (or cd into the directory)
npm run compile -w evm
npm run test -w evm
npm run generate -w dapp
npm run dev -w dapp
npm run build -w dapp
```

## Architecture

```
/
├── package.json              # Workspace root, shared lint/format deps, husky
├── eslint.config.js          # Shared linting config
├── .prettierrc               # Shared formatting config (includes prettier-plugin-solidity)
├── .solhint.json             # Solhint config for Solidity linting
├── .husky/                   # Git hooks (must be at repo root)
├── CLAUDE.md
├── dapp/
│   ├── package.json          # DApp-specific deps (react, wagmi, vite, @wagmi/cli)
│   ├── wagmi.config.ts       # ABI codegen config — reads evm/artifacts
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── components.json       # shadcn/ui config
│   ├── index.html
│   ├── .env.sample
│   ├── public/
│   └── src/
│       ├── generated.ts      # @wagmi/cli output (gitignored)
│       ├── components/
│       │   ├── AuthExample.tsx
│       │   ├── FormExample.tsx
│       │   ├── contracts/
│       │   │   └── example-contract/ContractExample.tsx
│       │   ├── layout/       # Header, Footer
│       │   ├── theme/        # ThemeToggle
│       │   ├── ui/           # shadcn/ui primitives (auto-generated)
│       │   └── web3/         # WalletConnect, TransactionButton, NetworkGuard
│       ├── hooks/
│       │   ├── useAuth.tsx   # Auth context + SIWE provider
│       │   ├── useTheme.tsx  # Theme context + provider
│       │   └── useTransactionFlow.ts
│       ├── lib/
│       │   ├── contracts/
│       │   │   └── example-contract/config.ts  # Re-exports generated ABI + env address
│       │   ├── env.ts        # Runtime env validation (Zod)
│       │   ├── utils.ts      # cn() helper
│       │   └── wagmi.ts      # wagmi + connector config
│       ├── routes/           # TanStack Router file-based routes
│       │   ├── __root.tsx
│       │   ├── index.tsx
│       │   ├── about.tsx
│       │   └── examples/
│       └── main.tsx          # Entry point + provider nesting
└── evm/
    ├── package.json          # Hardhat, toolbox-viem, OpenZeppelin
    ├── hardhat.config.ts
    ├── .env.example
    ├── contracts/Counter.sol
    ├── test/Counter.test.ts
    └── ignition/modules/Counter.ts
```

### Workspace structure

This is an npm workspaces monorepo. Root `package.json` declares `"workspaces": ["dapp", "evm"]`. A single `npm install` at the root installs dependencies for both workspaces with a shared lockfile. Shared dependencies (e.g., viem) are hoisted and deduplicated.

### Contract → DApp pipeline

1. Write Solidity in `evm/contracts/`
2. `npm run compile` — Hardhat compiles to `evm/artifacts/`
3. `npm run generate` — `@wagmi/cli` reads artifacts, generates typed ABI exports + React hooks into `dapp/src/generated.ts`
4. Import generated hooks in DApp components

### Contract config pattern

Each contract has a `config.ts` in `dapp/src/lib/contracts/<name>/` that re-exports the generated ABI with the runtime address from env:

```ts
import { counterAbi } from '@/generated'
import { env } from '@/lib/env'
import type { Address } from 'viem'

export { counterAbi }
export const counterConfig = {
  address: (env.VITE_CONTRACT_ADDRESS || undefined) as Address | undefined,
  abi: counterAbi,
} as const
```

## Key conventions

### Thin routes

Route files in `dapp/src/routes/` should only call `createFileRoute` and delegate to a component. No business logic in route files.

### Context/provider pattern

Contexts co-export the provider and hook from the same file (e.g., `useAuth.tsx` exports both `AuthProvider` and `useAuth`). These files need an eslint override for `react-refresh/only-export-components` — see the override block in `eslint.config.js`.

### Provider nesting order (main.tsx)

```
StrictMode > ThemeProvider > WagmiProvider > QueryClientProvider > AuthProvider > RouterProvider
```

### Contract interaction pattern

1. Write Solidity in `evm/contracts/<name>.sol`
2. Compile: `npm run compile`
3. Generate hooks: `npm run generate`
4. Create a config file in `dapp/src/lib/contracts/<name>/config.ts` re-exporting the generated ABI + address from env
5. Use generated `useRead<Name>` hooks for reads
6. Use `useTransactionFlow` for writes (handles signing → confirming → confirmed lifecycle + toasts)
7. Render with `TransactionButton` which binds to the transaction flow state

### Environment variables

**DApp env vars** — three files must be updated:

1. `dapp/src/lib/env.ts` — Add Zod validation to `envSchema` and include in `raw` object
2. `dapp/src/vite-env.d.ts` — Add TypeScript type to `ImportMetaEnv`
3. `dapp/.env.sample` — Add placeholder for other developers

**EVM env vars** — used via `configVariable()` in `evm/hardhat.config.ts`. Add placeholders to `evm/.env.example`.

### UI components

shadcn/ui components live in `dapp/src/components/ui/`. Add new ones with:

```bash
cd dapp && npx shadcn@latest add <component>
```

Must be run from `dapp/` directory (shadcn reads `components.json` from CWD).

### Imports

Use the `@/` path alias for all imports within the DApp (mapped to `dapp/src/`).

### Tailwind class merging

Use `cn()` from `@/lib/utils` when merging Tailwind classes (wraps `clsx` + `tailwind-merge`).

## Common tasks

### Adding a new page

1. Create a route file in `dapp/src/routes/`
2. Create the component in `dapp/src/components/`
3. The route file imports the component and passes it to `createFileRoute`
4. `npm run dev` auto-generates `routeTree.gen.ts`

### Adding a new contract

1. Write `evm/contracts/<ContractName>.sol`
2. Add the contract name to the `include` array in `dapp/wagmi.config.ts`
3. `npm run compile && npm run generate`
4. Create `dapp/src/lib/contracts/<contract-name>/config.ts` — re-export generated ABI + address from env
5. Create UI components in `dapp/src/components/contracts/<contract-name>/`
6. Add any new env vars (e.g., contract address) following the env var convention

### Adding a new context/provider

1. Create a file in `dapp/src/hooks/` (e.g., `useMyContext.tsx`)
2. Co-export the provider component and the consumer hook
3. Add an eslint override in `eslint.config.js` for the file (to suppress `react-refresh/only-export-components`)
4. Wrap in `main.tsx` at the appropriate nesting level

### Adding a new env var

**DApp**: See "Environment variables" above.
**EVM**: Add to `evm/hardhat.config.ts` via `configVariable()` and to `evm/.env.example`.

### Adding a shadcn/ui component

```bash
cd dapp && npx shadcn@latest add <component>
```

### Deploying to IPFS

Asset paths are already relative (`base: './'` in `dapp/vite.config.ts`), so the build works at any URL depth without changes. For IPFS-specific features, set these env vars before building:

```bash
VITE_HASH_ROUTING=true        # Use /#/about instead of /about (no SPA fallback needed)
VITE_SIWE_DOMAIN=myapp.eth    # Override SIWE domain (see security notes below)
```

Build and upload to a pinning service:

```bash
npm run build

# Pinata (recommended — dedicated IPFS pinning, free tier available)
# Install: npm install -g pinata-cli
# Requires API key from https://app.pinata.cloud
pinata upload dapp/dist/

# Storacha (formerly web3.storage) — requires account + payment info even for free 5 GiB tier
# Install: npm install -g @web3-storage/w3cli
# Setup: w3 space create <name> && w3 space register <email>
w3 up dapp/dist/

# Or upload the dapp/dist/ folder via any IPFS pinning service's web UI
```

Note: `ipfs add -r dapp/dist/` (Kubo CLI) only stores files on your **local node** — content disappears from the network when your node goes offline. For persistent hosting, use a pinning service or run your own 24/7 IPFS node.

**Security notes for shared gateways**: On a shared IPFS gateway (e.g., `dweb.link`), all apps share the same origin. This has several implications:

- **SIWE replay**: `window.location.host` is the gateway domain, making SIWE messages replayable across apps. Set `VITE_SIWE_DOMAIN` to your ENS name or custom domain to scope SIWE messages to your app.
- **WalletConnect project ID**: Domain allowlisting in WalletConnect Cloud becomes ineffective — any app on the same gateway could use your project ID to consume your relay quota. Not a funds-at-risk issue (they can't access wallets), but it degrades your rate limits and analytics.
- **RPC provider API keys** (Alchemy, Infura, etc.): Domain restrictions are equally ineffective on shared gateways. Other apps on the same origin could use your key and run up your bill. Prefer public RPC endpoints (wagmi's default `http()` transport uses them) or proxy through a backend if billing is a concern.

These shared-origin issues go away if you use a custom domain pointing to your IPFS content (via DNSLink or an ENS+IPFS setup).

### Deploying contracts

```bash
npx hardhat ignition deploy ./ignition/modules/Counter.ts --network sepolia -w evm
```

Requires `DEPLOYER_PRIVATE_KEY` and `SEPOLIA_RPC_URL` in `evm/.env`.

## EVM workspace

- **Hardhat v3** (ESM, `type: "module"`)
- **Solidity 0.8.27** with optimizer (200 runs)
- **hardhat-toolbox-viem** — viem-based contract interaction in tests (not ethers)
- **OpenZeppelin 5.4.0** — available for contract imports
- **node:test** — native Node.js test runner (not Mocha)
- **Hardhat Ignition** — declarative deployment modules
- **solhint** — Solidity linter (security, best practices, gas optimization). Config at root `.solhint.json`, extends `solhint:recommended`
- **prettier-plugin-solidity** — Solidity formatting via Prettier. Registered in root `.prettierrc` `plugins` array

## Gotchas

- **eslint override for providers**: Files that co-export a provider + hook need an override in `eslint.config.js` to disable `react-refresh/only-export-components`.
- **routeTree.gen.ts**: Auto-generated by `npm run dev` (TanStack Router plugin). Don't edit manually. Gitignored.
- **generated.ts**: Auto-generated by `npm run generate` (@wagmi/cli). Don't edit manually. Gitignored.
- **SIWE uses `viem/siwe`**, not the `siwe` npm package. The `siwe` package depends on ethers and requires Buffer polyfills that don't work in a pure Vite/browser environment.
- **MetaMask SDK analytics**: Disabled via `enableAnalytics: false` in the `metaMask()` connector config in `dapp/src/lib/wagmi.ts`.
- **shadcn CLI**: Must be run from `dapp/` directory (`cd dapp && npx shadcn@latest add <component>`).
- **Compile before generate**: `npm run generate` reads from `evm/artifacts/`. Run `npm run compile` first after contract changes.

## Extending this file

This file is intentionally a single document. As the project grows, split to avoid context bloat:

- **Child-directory `CLAUDE.md`** — Place a `CLAUDE.md` in any subdirectory (e.g., `evm/CLAUDE.md`). It loads on-demand only when Claude reads files in that directory.
- **`.claude/rules/*.md`** — Modular rule files that activate based on path patterns via frontmatter.
- **`@path` imports** — Reference other files from this CLAUDE.md with `@docs/some-guide.md`.

Keep this root file as a concise index. Move detailed contract knowledge, domain workflows, and specialized patterns into the mechanisms above.
