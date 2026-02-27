/**
 * TODO: This is an example page demonstrating Sign-In with Ethereum (SIWE)
 * authentication states. Replace with your own auth-gated content.
 */

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthExample() {
  const { isConnected, isAuthenticated, address, isAuthenticating, signIn, signOut } = useAuth()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Auth Example</h1>
          <p className="text-muted-foreground">
            Demonstrates Sign-In with Ethereum (SIWE) authentication using{' '}
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">viem/siwe</code> and the{' '}
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">useAuth</code> hook.
          </p>
        </div>

        {/* Status indicator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Status
              {!isConnected && <Badge variant="secondary">Disconnected</Badge>}
              {isConnected && !isAuthenticated && (
                <Badge
                  variant="outline"
                  className="border-yellow-500 text-yellow-600 dark:text-yellow-400"
                >
                  Connected
                </Badge>
              )}
              {isConnected && isAuthenticated && (
                <Badge className="bg-green-600 hover:bg-green-600">Verified</Badge>
              )}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Disconnected state */}
        {!isConnected && (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Use the <strong>Connect Wallet</strong> button in the header to get started. This
                example will walk through the three auth states: disconnected, connected, and
                verified.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Connected but not authenticated */}
        {isConnected && !isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Identity</CardTitle>
              <CardDescription>
                Your wallet is connected as{' '}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </code>
                , but you haven&apos;t proven ownership yet. Connecting a wallet only shares an
                address — it doesn&apos;t prove you control it. SIWE asks you to sign a message with
                your private key, providing cryptographic proof of ownership.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => signIn()} disabled={isAuthenticating}>
                {isAuthenticating ? 'Signing...' : 'Sign In with Ethereum'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Authenticated */}
        {isConnected && isAuthenticated && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Authenticated
                  <Badge className="bg-green-600 hover:bg-green-600">Verified</Badge>
                </CardTitle>
                <CardDescription>
                  Wallet{' '}
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </code>{' '}
                  has been verified via SIWE. In a real application, the signed message would be
                  sent to a backend for verification and session creation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  This is where your auth-gated content would go — dashboards, settings, premium
                  features, or any UI that requires a verified wallet.
                </div>
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
