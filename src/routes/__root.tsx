import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
})
