import { createFileRoute } from '@tanstack/react-router'
import { FormExample } from '@/components/FormExample'

export const Route = createFileRoute('/examples/form')({
  component: FormExample,
})
