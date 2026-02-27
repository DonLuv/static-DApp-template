import { createFileRoute } from '@tanstack/react-router'
import { ContractExample } from '@/components/contracts/example-contract/ContractExample'

export const Route = createFileRoute('/examples/contract')({
  component: ContractExample,
})
