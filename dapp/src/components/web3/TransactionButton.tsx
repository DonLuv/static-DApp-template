/**
 * TransactionButton — A button that shows transaction lifecycle states.
 *
 * Renders different label/spinner based on the tx status from useTransactionFlow.
 *
 * Usage:
 *   const tx = useTransactionFlow({ successMessage: 'Joined!' })
 *
 *   <TransactionButton
 *     tx={tx}
 *     label="Join Game"
 *     onClick={() => tx.send({ ... })}
 *   />
 */

import { Loader2, Check, X } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { useTransactionFlow } from '@/hooks/useTransactionFlow'

interface TransactionButtonProps extends Omit<ButtonProps, 'onClick'> {
  /** The transaction flow instance from useTransactionFlow */
  tx: ReturnType<typeof useTransactionFlow>
  /** Label shown in idle state */
  label: string
  /** Called when clicked in idle or error state */
  onClick: () => void
  /** Label shown while waiting for wallet signature */
  signingLabel?: string
  /** Label shown while waiting for on-chain confirmation */
  confirmingLabel?: string
  /** Label shown after confirmation */
  confirmedLabel?: string
}

export function TransactionButton({
  tx,
  label,
  onClick,
  signingLabel = 'Sign in wallet...',
  confirmingLabel = 'Confirming...',
  confirmedLabel = 'Done!',
  disabled,
  ...buttonProps
}: TransactionButtonProps) {
  const isDisabled = disabled || tx.isLoading || tx.status === 'confirmed'

  const handleClick = () => {
    if (tx.status === 'error') {
      tx.reset()
    }
    onClick()
  }

  return (
    <Button onClick={handleClick} disabled={isDisabled} {...buttonProps}>
      {tx.status === 'signing' && (
        <>
          <Loader2 className="animate-spin" />
          {signingLabel}
        </>
      )}
      {tx.status === 'confirming' && (
        <>
          <Loader2 className="animate-spin" />
          {confirmingLabel}
        </>
      )}
      {tx.status === 'confirmed' && (
        <>
          <Check />
          {confirmedLabel}
        </>
      )}
      {tx.status === 'error' && (
        <>
          <X />
          Retry
        </>
      )}
      {tx.status === 'idle' && label}
    </Button>
  )
}
