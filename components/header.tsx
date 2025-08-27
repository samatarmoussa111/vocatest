"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">Vocatest</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/lessons">Lessons</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/test">Test</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-1 py-2">
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link href="/lessons" onClick={() => setIsMenuOpen(false)}>
                  Lessons
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link href="/test" onClick={() => setIsMenuOpen(false)}>
                  Test
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                  Admin
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
