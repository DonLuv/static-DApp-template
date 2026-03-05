import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const counterAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'newCount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'changedBy', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'CountChanged',
  },
  {
    type: 'function',
    inputs: [],
    name: 'count',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'decrement', outputs: [], stateMutability: 'nonpayable' },
  { type: 'function', inputs: [], name: 'increment', outputs: [], stateMutability: 'nonpayable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useReadCounter = /*#__PURE__*/ createUseReadContract({ abi: counterAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"count"`
 */
export const useReadCounterCount = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  functionName: 'count',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useWriteCounter = /*#__PURE__*/ createUseWriteContract({ abi: counterAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"decrement"`
 */
export const useWriteCounterDecrement = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'decrement',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useWriteCounterIncrement = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'increment',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useSimulateCounter = /*#__PURE__*/ createUseSimulateContract({ abi: counterAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"decrement"`
 */
export const useSimulateCounterDecrement = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
  functionName: 'decrement',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useSimulateCounterIncrement = /*#__PURE__*/ createUseSimulateContract({
  abi: counterAbi,
  functionName: 'increment',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__
 */
export const useWatchCounterEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: counterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link counterAbi}__ and `eventName` set to `"CountChanged"`
 */
export const useWatchCounterCountChangedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: counterAbi,
  eventName: 'CountChanged',
})
