/**
 * Contract ABI and address configuration.
 *
 * TODO: Replace the Counter ABI below with your actual contract ABI.
 *       Set VITE_CONTRACT_ADDRESS in your .env file.
 *       When you have multiple contracts, create one file per contract
 *       (e.g., `token.ts`, `nft.ts`) and follow the same pattern.
 */

import { type Abi, type Address } from 'viem'
import { env } from '../../env'

// ---------------------------------------------------------------------------
// ABI — Replace this with your actual contract ABI
// ---------------------------------------------------------------------------

export const counterAbi = [
  // Read: get current count
  {
    type: 'function',
    name: 'count',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  // Write: increment the counter
  {
    type: 'function',
    name: 'increment',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // Write: decrement the counter
  {
    type: 'function',
    name: 'decrement',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // Event: emitted on increment/decrement
  {
    type: 'event',
    name: 'CountChanged',
    inputs: [
      { name: 'newCount', type: 'uint256', indexed: false },
      { name: 'changedBy', type: 'address', indexed: true },
    ],
  },
] as const satisfies Abi

// ---------------------------------------------------------------------------
// Contract config — used by wagmi hooks
// ---------------------------------------------------------------------------

export const counterConfig = {
  address: (env.VITE_CONTRACT_ADDRESS || undefined) as Address | undefined,
  abi: counterAbi,
} as const
