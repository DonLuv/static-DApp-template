import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './lib/wagmi'
import { env } from './lib/env'
import { ThemeProvider } from './hooks/useTheme'
import { AuthProvider } from './hooks/useAuth'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Validate environment on startup
if (import.meta.env.DEV) {
  console.log(
    `[env] WalletConnect Project ID: ${env.VITE_WALLETCONNECT_PROJECT_ID ? '\u2713 set' : '\u2717 missing'}`
  )
}

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Required by wagmi — do not remove
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  </StrictMode>
)
