/**
 * useTransactionFlow — Generic hook for tracking write transaction lifecycle.
 *
 * Wraps wagmi's useWriteContract + useWaitForTransactionReceipt into a single
 * state machine: idle -> signing -> confirming -> confirmed | error.
 *
 * Integrates with sonner toasts automatically.
 *
 * Usage:
 *   const tx = useTransactionFlow({ successMessage: 'Counter incremented!' })
 *
 *   // In a handler:
 *   tx.send({
 *     address: '0x...',
 *     abi: counterAbi,
 *     functionName: 'increment',
 *   })
 *
 *   // In JSX:
 *   <TransactionButton tx={tx} label="Increment" />
 */

import { useCallback, useEffect, useMemo } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { toast } from 'sonner'
import type { WriteContractParameters } from 'wagmi/actions'

export type TxStatus = 'idle' | 'signing' | 'confirming' | 'confirmed' | 'error'

export interface TransactionFlowOptions {
  /** Toast message on successful confirmation */
  successMessage?: string
  /** Toast message while waiting for signature */
  signingMessage?: string
  /** Toast message while waiting for confirmation */
  confirmingMessage?: string
  /** Callback after successful confirmation */
  onSuccess?: (hash: `0x${string}`) => void
  /** Callback on error (signature rejection or revert) */
  onError?: (error: Error) => void
}

export function useTransactionFlow(options: TransactionFlowOptions = {}) {
  const {
    successMessage = 'Transaction confirmed',
    signingMessage = 'Waiting for signature...',
    confirmingMessage = 'Confirming transaction...',
    onSuccess,
    onError,
  } = options

  const {
    writeContract,
    data: hash,
    isPending: isSigning,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  })

  // Derive status — this IS a pure derived value, useMemo is correct here
  const status: TxStatus = useMemo(() => {
    if (isConfirmed) return 'confirmed'
    if (writeError || receiptError) return 'error'
    if (isConfirming) return 'confirming'
    if (isSigning) return 'signing'
    return 'idle'
  }, [isConfirmed, writeError, receiptError, isConfirming, isSigning])

  // Fire toasts and callbacks on status transitions.
  // Intentionally only depends on `status` — the callbacks and messages are
  // stable config from the call site and should not re-trigger the effect.
  useEffect(() => {
    if (status === 'signing') toast.loading(signingMessage, { id: 'tx' })
    if (status === 'confirming') toast.loading(confirmingMessage, { id: 'tx' })
    if (status === 'confirmed') {
      toast.success(successMessage, { id: 'tx' })
      if (hash) onSuccess?.(hash)
    }
    if (status === 'error') {
      const err = writeError || receiptError
      toast.error(err?.message?.slice(0, 120) ?? 'Transaction failed', { id: 'tx' })
      if (err) onError?.(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const send = useCallback(
    (params: Omit<Parameters<typeof writeContract>[0], 'account' | 'chain'>) => {
      resetWrite()
      writeContract(params as WriteContractParameters)
    },
    [writeContract, resetWrite]
  )

  const reset = useCallback(() => {
    resetWrite()
    toast.dismiss('tx')
  }, [resetWrite])

  return {
    /** Current transaction status */
    status,
    /** The transaction hash (available after signing) */
    hash,
    /** Send the transaction */
    send,
    /** Reset to idle state */
    reset,
    /** Whether any operation is in progress */
    isLoading: status === 'signing' || status === 'confirming',
    /** Raw errors from wagmi */
    error: writeError || receiptError || null,
  }
}
