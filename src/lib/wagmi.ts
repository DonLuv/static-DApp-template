import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import { env } from './env'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [
    injected(),
    metaMask({ enableAnalytics: false }),
    walletConnect({
      projectId: env.VITE_WALLETCONNECT_PROJECT_ID,
      metadata: {
        name: 'DApp Template',
        description: 'Static DApp Template',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost',
        icons:
          typeof window !== 'undefined'
            ? [
                window.location.origin +
                  window.location.pathname.replace(/\/?$/, '/') +
                  'favicon.ico',
              ]
            : ['https://localhost/favicon.ico'],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
})
