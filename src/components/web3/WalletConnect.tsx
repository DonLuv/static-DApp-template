import { useConnect, useDisconnect } from 'wagmi'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function WalletConnect() {
  const { address, isConnected, isAuthenticated, isAuthenticating, signIn, signOut } = useAuth()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  const handleDisconnect = () => {
    signOut()
    disconnect()
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        {isAuthenticated && <span className="text-xs text-green-500 hidden sm:inline">✓</span>}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!isAuthenticated && (
              <DropdownMenuItem onClick={() => signIn()} disabled={isAuthenticating}>
                {isAuthenticating ? 'Signing...' : 'Sign In with Ethereum'}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending}>
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {connectors.map(connector => (
          <DropdownMenuItem
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isPending}
          >
            {connector.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
