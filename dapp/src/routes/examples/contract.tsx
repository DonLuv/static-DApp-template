import { createFileRoute } from '@tanstack/react-router'
import { ContractExample } from '@/components/contracts/counter/ContractExample'

export const Route = createFileRoute('/examples/contract')({
  component: ContractExample,
})
