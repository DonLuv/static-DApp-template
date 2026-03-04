/**
 * TODO: This is an example contract interaction page using a Counter contract.
 * Replace with your own contract interactions when building your DApp.
 */

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NetworkGuard } from '@/components/web3/NetworkGuard'
import { TransactionButton } from '@/components/web3/TransactionButton'
import { useTransactionFlow } from '@/hooks/useTransactionFlow'
import { useReadCounter, useWatchCounterEvent } from '@/generated'
import { counterConfig } from '@/lib/contracts/example-contract/config'

export function ContractExample() {
  const { isConnected } = useAccount()
  const {
    data: count,
    isLoading: isCountLoading,
    refetch,
  } = useReadCounter({
    functionName: 'count',
    query: { enabled: !!counterConfig.address },
  })
  const [events, setEvents] = useState<string[]>([])

  const incrementTx = useTransactionFlow({
    successMessage: 'Counter incremented!',
    onSuccess: () => {
      refetch()
    },
  })

  const decrementTx = useTransactionFlow({
    successMessage: 'Counter decremented!',
    onSuccess: () => {
      refetch()
    },
  })

  useWatchCounterEvent({
    eventName: 'CountChanged',
    enabled: !!counterConfig.address,
    onLogs: logs => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [`[${timestamp}] CountChanged event received`, ...prev.slice(0, 9)])
      refetch()
      console.log('CountChanged:', logs)
    },
  })

  if (!counterConfig.address) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Contract Example</h1>
            <p className="text-muted-foreground">
              Demonstrates the full web3 interaction pattern with wagmi hooks.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>No Contract Configured</CardTitle>
              <CardDescription>
                Set{' '}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  VITE_CONTRACT_ADDRESS
                </code>{' '}
                in your <code className="text-sm bg-muted px-1.5 py-0.5 rounded">.env</code> file to
                enable contract interactions. Deploy a Counter contract to Sepolia and add its
                address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                {`# .env
VITE_CONTRACT_ADDRESS=0xYourCounterContractAddress`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Contract Example</h1>
          <p className="text-muted-foreground">
            Demonstrates the full web3 interaction pattern: wallet connection check, network guard,
            contract reads, writes via{' '}
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useTransactionFlow</code>, and
            event watching.
          </p>
        </div>

        <NetworkGuard requiredChainId={sepolia.id} requiredChainName="Sepolia">
          {!isConnected ? (
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  Connect your wallet using the button in the header to interact with the contract.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Counter Display */}
              <Card>
                <CardHeader>
                  <CardTitle>Counter</CardTitle>
                  <CardDescription>Current on-chain count value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-center py-4">
                    {isCountLoading ? '...' : (count?.toString() ?? '?')}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <TransactionButton
                  tx={incrementTx}
                  label="Increment"
                  onClick={() =>
                    incrementTx.send({
                      address: counterConfig.address!,
                      abi: counterConfig.abi,
                      functionName: 'increment',
                    })
                  }
                />
                <TransactionButton
                  tx={decrementTx}
                  label="Decrement"
                  variant="outline"
                  onClick={() =>
                    decrementTx.send({
                      address: counterConfig.address!,
                      abi: counterConfig.abi,
                      functionName: 'decrement',
                    })
                  }
                />
              </div>

              {/* Event Log */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Log</CardTitle>
                  <CardDescription>
                    Real-time{' '}
                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">CountChanged</code>{' '}
                    events from the contract
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {events.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No events yet. Increment or decrement to see events appear here.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-sm font-mono">
                      {events.map((event, i) => (
                        <li key={i} className="text-muted-foreground">
                          {event}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </NetworkGuard>
      </div>
    </div>
  )
}
