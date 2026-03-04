import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3
              className="text-lg font-semibold"
              style={{
                background: 'linear-gradient(to right, #9333ea, #db2777)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {/* TODO: Replace with your project name */}
              DApp Template
            </h3>
            <p className="text-sm text-muted-foreground">
              {/* TODO: Replace with your project description */}A starter template for building
              static DApps with React, TypeScript, and Web3.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://wagmi.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  wagmi Docs
                </a>
              </li>
              <li>
                <a
                  href="https://tanstack.com/router"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  TanStack Router
                </a>
              </li>
              <li>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  shadcn/ui
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/examples/form" className="hover:text-primary transition-colors">
                  Form Example
                </Link>
              </li>
              <li>
                <Link to="/examples/contract" className="hover:text-primary transition-colors">
                  Contract Example
                </Link>
              </li>
              <li>
                <Link to="/examples/auth" className="hover:text-primary transition-colors">
                  Auth Example
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {/* TODO: Replace with your own social links */}
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          {/* TODO: Replace with your project name */}
          <p>
            &copy; {new Date().getFullYear()} DApp Template. Built with React, TypeScript, and Web3.
          </p>
        </div>
      </div>
    </footer>
  )
}
