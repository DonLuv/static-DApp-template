/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLETCONNECT_PROJECT_ID: string
  readonly VITE_CONTRACT_ADDRESS: string
  readonly VITE_HASH_ROUTING: string
  readonly VITE_SIWE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
