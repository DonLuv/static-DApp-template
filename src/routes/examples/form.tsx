import { createFileRoute } from '@tanstack/react-router'
import { FormExample } from '@/components/example/FormExample'

export const Route = createFileRoute('/examples/form')({
  component: FormExample,
})
