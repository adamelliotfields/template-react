import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Computer, Menu, Moon, Sun } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { Link, useRoute } from 'wouter'

import { type ThemeType, useTheme } from '@/components/Theme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import title from '@/lib/title'
import { cn } from '@/lib/utils'

// const { VITE_HOMEPAGE, VITE_TITLE } = import.meta.env

const THEMES = [
  { id: 'light' as ThemeType, icon: Sun },
  { id: 'dark' as ThemeType, icon: Moon },
  { id: 'system' as ThemeType, icon: Computer }
]

export default function Header() {
  const { theme, setTheme } = useTheme()

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[2]
  const { icon: Icon } = activeTheme

  return (
    <header className="h-16 w-full sticky top-0 flex items-center border-b border-neutral-300 dark:border-neutral-700">
      <div className="container flex md:max-w-5xl">
        <nav className="hidden flex-col md:flex md:flex-row md:items-center md:gap-4">
          <HeaderBrand>App</HeaderBrand>
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/about">About</HeaderLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-neutral-300 dark:border-neutral-700">
            <nav className="grid gap-6 text-lg font-medium">
              <h1 className="text-xl font-semibold">App</h1>
              <HeaderLink href="/">Home</HeaderLink>
              <HeaderLink href="/about">About</HeaderLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-auto flex items-center gap-4">
          {/* GitHub link */}
          <a
            href="https://github.com/adamelliotfields/react-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          {/* Theme menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon className="h-5 w-5" />
                <span className="sr-only">{`${title(activeTheme.id)} theme`}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {THEMES.map((t) => (
                <DropdownMenuItem
                  key={t.id}
                  className="cursor-pointer"
                  onClick={() => {
                    setTheme(t.id)
                  }}
                >
                  <t.icon className="h-5 w-5" strokeWidth={1.75} />
                  <span className="ml-1.5 font-normal text-sm">{title(t.id)}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function HeaderBrand({ children }: PropsWithChildren) {
  return (
    <Link to="/" className="min-w-fit text-base font-bold md:-mt-0.5 md:text-lg">
      {children}
    </Link>
  )
}

function HeaderLink({ href, children }: { href: string; children: string }) {
  const [isActive] = useRoute(href)
  return (
    <Link
      to={href}
      className={cn(
        'font-medium text-base',
        isActive
          ? 'text-neutral-700 dark:text-neutral-300'
          : 'text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
