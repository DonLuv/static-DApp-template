import { createFileRoute } from '@tanstack/react-router'
import { AuthExample } from '@/components/example/AuthExample'

export const Route = createFileRoute('/examples/auth')({
  component: AuthExample,
})
