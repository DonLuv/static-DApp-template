import { z } from 'zod'

/**
 * Zod schema for environment variables.
 * Add new VITE_ env vars here — they'll be validated at import time.
 */
const envSchema = z.object({
  VITE_WALLETCONNECT_PROJECT_ID: z
    .string()
    .min(
      1,
      'VITE_WALLETCONNECT_PROJECT_ID is required — get one at https://cloud.walletconnect.com'
    )
    .default(''),
  VITE_CONTRACT_ADDRESS: z
    .string()
    .refine(val => val === '' || /^0x[a-fA-F0-9]{40}$/.test(val), {
      message: 'VITE_CONTRACT_ADDRESS must be a valid Ethereum address or empty',
    })
    .default(''),
})

function parseEnv() {
  const raw = {
    VITE_WALLETCONNECT_PROJECT_ID: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? '',
    VITE_CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS ?? '',
  }

  const result = envSchema.safeParse(raw)

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors)
    // Don't throw in dev — just warn. Throw in production builds.
    if (import.meta.env.PROD) {
      throw new Error('Invalid environment variables')
    }
  }

  return result.success ? result.data : (raw as z.infer<typeof envSchema>)
}

export const env = parseEnv()
