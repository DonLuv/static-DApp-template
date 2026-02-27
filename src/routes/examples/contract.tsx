import { createFileRoute } from '@tanstack/react-router'
import { ContractExample } from '@/components/example/ContractExample'

export const Route = createFileRoute('/examples/contract')({
  component: ContractExample,
})
