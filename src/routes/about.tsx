import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">About This Template</h1>
          <p className="text-lg text-muted-foreground">
            A static DApp starter template with everything you need to build decentralized
            applications. No server required — deploy to any static hosting.
          </p>
        </div>

        <Separator />

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React 19</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Vite</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="secondary">wagmi v3</Badge>
            <Badge variant="secondary">viem</Badge>
            <Badge variant="secondary">TanStack Router</Badge>
            <Badge variant="secondary">TanStack Form</Badge>
            <Badge variant="secondary">Zod v4</Badge>
            <Badge variant="secondary">SIWE</Badge>
          </div>
        </div>

        <Separator />

        {/* Project Structure */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Structure</h2>
          <Card>
            <CardContent className="pt-6">
              <pre className="text-sm overflow-x-auto">
                {`src/
├── components/
│   ├── example/         # Example page components
│   │   ├── AuthExample.tsx
│   │   ├── ContractExample.tsx
│   │   └── FormExample.tsx
│   ├── layout/          # Header, Footer
│   ├── theme/           # ThemeToggle
│   ├── ui/              # shadcn/ui components
│   └── web3/            # WalletConnect, TransactionButton, NetworkGuard
├── hooks/
│   ├── example/
│   │   └── useCounter.ts      # Example contract read hooks
│   ├── useAuth.tsx            # Auth context + SIWE provider
│   ├── useTheme.tsx           # Theme context + provider
│   └── useTransactionFlow.ts  # Tx lifecycle state machine
├── lib/
│   ├── contracts/
│   │   └── example/
│   │       └── abi.ts         # Example ABI definitions + config
│   ├── env.ts           # Runtime env validation (Zod)
│   ├── utils.ts         # cn() helper
│   └── wagmi.ts         # wagmi config
├── routes/
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page
│   ├── about.tsx        # This page
│   └── examples/
│       ├── auth.tsx     # Auth / SIWE example
│       ├── form.tsx     # Form + validation example
│       └── contract.tsx # Contract interaction example
└── main.tsx             # App entry point`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Quick Start */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">1. Configure environment</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                  {`cp .env.sample .env
# Add your WalletConnect Project ID
# Optionally add a contract address`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">2. Install and run</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                  {`npm install
npm run dev`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">3. Replace the example code</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    Replace the Counter ABI in{' '}
                    <code className="bg-muted px-1.5 py-0.5 rounded">
                      src/lib/contracts/example/abi.ts
                    </code>{' '}
                    with your contract
                  </li>
                  <li>
                    Update hooks in{' '}
                    <code className="bg-muted px-1.5 py-0.5 rounded">src/hooks/</code> for your
                    contract functions
                  </li>
                  <li>
                    Replace example routes in{' '}
                    <code className="bg-muted px-1.5 py-0.5 rounded">src/routes/</code> with your
                    pages
                  </li>
                  <li>
                    Update branding in Header, Footer, and{' '}
                    <code className="bg-muted px-1.5 py-0.5 rounded">package.json</code>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Documentation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'wagmi', url: 'https://wagmi.sh' },
              { name: 'viem', url: 'https://viem.sh' },
              { name: 'TanStack Router', url: 'https://tanstack.com/router' },
              { name: 'TanStack Form', url: 'https://tanstack.com/form' },
              { name: 'shadcn/ui', url: 'https://ui.shadcn.com' },
              { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
            ].map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-sm font-medium">{name}</span>
                <span className="block text-xs text-muted-foreground mt-1">{url}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
