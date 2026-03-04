import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import hre from 'hardhat'

async function deployCounter() {
  const { viem, networkHelpers } = await hre.network.connect()
  const counter = await viem.deployContract('Counter')
  const publicClient = await viem.getPublicClient()
  const [owner, user1] = await viem.getWalletClients()
  return { counter, viem, networkHelpers, publicClient, owner, user1 }
}

describe('Counter', () => {
  it('should start at zero', async () => {
    const { counter } = await deployCounter()
    const count = await counter.read.count()
    assert.equal(count, 0n)
  })

  it('should increment', async () => {
    const { counter } = await deployCounter()
    await counter.write.increment()
    const count = await counter.read.count()
    assert.equal(count, 1n)
  })

  it('should increment multiple times', async () => {
    const { counter } = await deployCounter()
    await counter.write.increment()
    await counter.write.increment()
    await counter.write.increment()
    const count = await counter.read.count()
    assert.equal(count, 3n)
  })

  it('should decrement', async () => {
    const { counter } = await deployCounter()
    await counter.write.increment()
    await counter.write.decrement()
    const count = await counter.read.count()
    assert.equal(count, 0n)
  })

  it('should revert when decrementing below zero', async () => {
    const { counter } = await deployCounter()
    await assert.rejects(counter.write.decrement())
  })

  it('should emit CountChanged on increment', async () => {
    const { counter, publicClient } = await deployCounter()
    const hash = await counter.write.increment()
    const receipt = await publicClient.getTransactionReceipt({ hash })
    assert.equal(receipt.logs.length > 0, true)
  })

  it('should emit CountChanged on decrement', async () => {
    const { counter, publicClient } = await deployCounter()
    await counter.write.increment()
    const hash = await counter.write.decrement()
    const receipt = await publicClient.getTransactionReceipt({ hash })
    assert.equal(receipt.logs.length > 0, true)
  })
})
