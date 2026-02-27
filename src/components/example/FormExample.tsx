/**
 * TODO: This is an example form page demonstrating @tanstack/react-form + Zod v4
 * validation. Replace this with your own forms when building your DApp.
 */

import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  ethAddress: z
    .string()
    .refine(val => val === '' || /^0x[a-fA-F0-9]{40}$/.test(val), {
      message: 'Must be a valid Ethereum address (0x...)',
    })
    .optional()
    .default(''),
  message: z.string().min(1, 'Message is required'),
})

export function FormExample() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      ethAddress: '',
      message: '',
    },
    onSubmit: ({ value }) => {
      const parsed = formSchema.safeParse(value)
      if (!parsed.success) {
        toast.error('Validation failed')
        return
      }
      toast.success('Form submitted successfully!', {
        description: `Name: ${parsed.data.name}, Email: ${parsed.data.email}`,
      })
    },
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Form Example</h1>
          <p className="text-muted-foreground">
            Demonstrates{' '}
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">@tanstack/react-form</code>{' '}
            with Zod v4 validation via Standard Schema. No adapter needed.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>
              Fill out the form below. Validation runs on blur and submit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-6"
            >
              {/* Name */}
              <form.Field
                name="name"
                validators={{
                  onBlur: z.string().min(3, 'Name must be at least 3 characters'),
                }}
              >
                {field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Name *</Label>
                    <Input
                      id={field.name}
                      placeholder="Your name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {typeof field.state.meta.errors[0] === 'string'
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onBlur: z.string().email('Invalid email address'),
                }}
              >
                {field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email *</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {typeof field.state.meta.errors[0] === 'string'
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* ETH Address (optional) */}
              <form.Field
                name="ethAddress"
                validators={{
                  onBlur: z
                    .string()
                    .refine(val => val === '' || /^0x[a-fA-F0-9]{40}$/.test(val), {
                      message: 'Must be a valid Ethereum address (0x...)',
                    }),
                }}
              >
                {field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>ETH Address (optional)</Label>
                    <Input
                      id={field.name}
                      placeholder="0x..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {typeof field.state.meta.errors[0] === 'string'
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Message */}
              <form.Field
                name="message"
                validators={{
                  onBlur: z.string().min(1, 'Message is required'),
                }}
              >
                {field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Message *</Label>
                    <textarea
                      id={field.name}
                      placeholder="Your message..."
                      rows={4}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {typeof field.state.meta.errors[0] === 'string'
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
