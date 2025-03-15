"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, LogIn, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para determinar o URL correto baseado na página atual
  const getNavUrl = (anchor: string) => {
    return isHomePage ? `#${anchor}` : `/#${anchor}`
  }

  const isActive = (path: string) => {
    if (isHomePage) {
      return pathname === "/" && window.location.hash === path
    }
    return pathname === path
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      isScrolled && "shadow-md"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Leaf className="h-6 w-6 text-sage-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent">
            MzaSen
          </span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {[
            { href: getNavUrl("services"), label: "Serviços" },
            { href: getNavUrl("about"), label: "Sobre Nós" },
            { href: getNavUrl("testimonials"), label: "Depoimentos" },
            { href: getNavUrl("contact"), label: "Contato" }
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-sage-600",
                "after:transition-all after:duration-300 hover:after:w-full",
                isActive(href) ? "text-sage-600 after:w-full" : "text-muted-foreground hover:text-sage-600"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:inline-flex">
            <Button 
              variant="outline" 
              className="text-sage-600 hover:text-sage-700 hover:bg-sage-50 transition-all duration-300"
            >
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </Link>
          <Link href="/consulta-gratuita" className="hidden md:inline-flex">
            <Button 
              className="bg-sage-600 hover:bg-sage-700 transition-all duration-300 shadow-lg hover:shadow-sage-200/50"
            >
              Agendar Consulta
            </Button>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

