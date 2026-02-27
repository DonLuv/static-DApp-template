/**
 * NetworkGuard — Displays a banner when the user is connected to the wrong chain.
 *
 * Wrap your page content (or put it at the top of a layout) to warn users
 * and offer a one-click chain switch.
 *
 * Usage:
 *   // Guard a specific chain (e.g., require Sepolia for testnet)
 *   <NetworkGuard requiredChainId={sepolia.id}>
 *     <YourAppContent />
 *   </NetworkGuard>
 *
 *   // Or as a standalone banner (no children)
 *   <NetworkGuard requiredChainId={sepolia.id} />
 */

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

interface NetworkGuardProps {
  /** The chain ID your app requires */
  requiredChainId: number
  /** Optional: display name for the required chain (auto-detected if omitted) */
  requiredChainName?: string
  /** Content to render when on the correct chain (or not connected) */
  children?: ReactNode
  /** If true, block children from rendering when on wrong chain. Default: false (show warning + children) */
  blocking?: boolean
}

export function NetworkGuard({
  requiredChainId,
  requiredChainName,
  children,
  blocking = false,
}: NetworkGuardProps) {
  const { isConnected } = useAccount()
  const currentChainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  // Not connected — don't show anything, let WalletConnect handle it
  if (!isConnected) return <>{children}</>

  const isWrongChain = currentChainId !== requiredChainId

  // Resolve chain name from wagmi config if not provided
  const chainName = requiredChainName ?? `Chain ${requiredChainId}`

  if (!isWrongChain) return <>{children}</>

  const banner = (
    <div className="border border-destructive/50 bg-destructive/10 rounded-lg p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
        <p className="text-sm text-destructive">
          Please switch to <strong>{chainName}</strong> to use this app.
        </p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => switchChain({ chainId: requiredChainId })}
        disabled={isPending}
      >
        {isPending ? 'Switching...' : `Switch to ${chainName}`}
      </Button>
    </div>
  )

  if (blocking) {
    return <div className="p-4">{banner}</div>
  }

  return (
    <>
      <div className="p-4">{banner}</div>
      {children}
    </>
  )
}
