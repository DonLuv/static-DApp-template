import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { createSiweMessage, generateSiweNonce } from 'viem/siwe'

interface AuthContextValue {
  isConnected: boolean
  isAuthenticated: boolean
  address: `0x${string}` | undefined
  isAuthenticating: boolean
  signIn: () => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // Reset auth when wallet disconnects or address changes
  useEffect(() => {
    setIsAuthenticated(false)
  }, [address])

  const signIn = useCallback(async () => {
    if (!address || !chainId) return

    setIsAuthenticating(true)
    try {
      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to verify your wallet',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: generateSiweNonce(),
      })

      const signature = await signMessageAsync({ message })

      setIsAuthenticated(true)
      console.log('SIWE authentication successful', { message, signature })
    } catch (error) {
      console.error('SIWE authentication failed', error)
    } finally {
      setIsAuthenticating(false)
    }
  }, [address, chainId, signMessageAsync])

  const signOut = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{ isConnected, isAuthenticated, address, isAuthenticating, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
