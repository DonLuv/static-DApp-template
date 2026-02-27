/**
 * Counter contract hooks — read state and watch events.
 *
 * Write operations (increment/decrement) are handled via useTransactionFlow
 * directly in the component — see src/routes/examples/contract.tsx.
 *
 * TODO: Replace these with hooks for your own contract.
 */

import { useReadContract, useWatchContractEvent } from 'wagmi'
import { counterConfig } from '@/lib/contracts/example/abi'

/**
 * Read the current count from the Counter contract.
 *
 * Usage:
 *   const { data: count, isLoading } = useCount()
 */
export function useCount() {
  return useReadContract({
    ...counterConfig,
    functionName: 'count',
    query: {
      enabled: !!counterConfig.address,
    },
  })
}

/**
 * Watch for CountChanged events in real-time.
 *
 * Usage:
 *   useWatchCountChanged((logs) => {
 *     console.log('Count changed:', logs)
 *   })
 */
export function useWatchCountChanged(onLogs: (logs: unknown[]) => void, enabled = true) {
  return useWatchContractEvent({
    ...counterConfig,
    eventName: 'CountChanged',
    onLogs,
    enabled: enabled && !!counterConfig.address,
  })
}
