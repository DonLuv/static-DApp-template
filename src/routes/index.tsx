import { createFileRoute, Link } from '@tanstack/react-router'
import { Wallet, FileCode, Layers } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
            Static{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #9333ea, #db2777)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              DApp
            </span>{' '}
            Template
          </h1>
          <p className="text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            A batteries-included starter for building decentralized applications with React,
            TypeScript, wagmi, TanStack Router, and shadcn/ui.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Wallet Connection</h3>
              <p className="text-muted-foreground">
                Multi-wallet support with MetaMask, WalletConnect, and injected connectors. SIWE
                authentication ready.
              </p>
              <div className="pt-2 flex flex-col gap-1">
                <Link
                  to="/examples/contract"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  See contract example &rarr;
                </Link>
                <Link
                  to="/examples/auth"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                >
                  See auth example &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="group p-8 border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                <FileCode className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold">Smart Contracts</h3>
              <p className="text-muted-foreground">
                Transaction lifecycle management with toast notifications, network guards, and typed
                ABI hooks.
              </p>
              <div className="pt-2">
                <Link
                  to="/examples/contract"
                  className="text-sm font-medium text-pink-600 dark:text-pink-400 hover:underline"
                >
                  See contract example &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="group p-8 border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Modern Stack</h3>
              <p className="text-muted-foreground">
                TanStack Router for file-based routing, TanStack Form with Zod validation, and
                shadcn/ui components.
              </p>
              <div className="pt-2">
                <Link
                  to="/examples/form"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  See form example &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-8 space-y-4">
          <p className="text-lg text-muted-foreground">
            Connect your wallet above to get started, or explore the example pages to see the
            template in action.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/about"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Learn more about the stack &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
