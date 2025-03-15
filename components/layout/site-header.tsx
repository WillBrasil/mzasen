"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Função para determinar o URL correto baseado na página atual
  const getNavUrl = (anchor: string) => {
    return isHomePage ? `#${anchor}` : `/#${anchor}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-sage-600" />
          <span className="text-xl font-bold">MzaSen</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href={getNavUrl("services")} className="text-sm font-medium transition-colors hover:text-primary">
            Serviços
          </Link>
          <Link href={getNavUrl("about")} className="text-sm font-medium transition-colors hover:text-primary">
            Sobre Nós
          </Link>
          <Link href={getNavUrl("testimonials")} className="text-sm font-medium transition-colors hover:text-primary">
            Depoimentos
          </Link>
          <Link href={getNavUrl("contact")} className="text-sm font-medium transition-colors hover:text-primary">
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="outline" className="text-sage-600 hover:text-sage-700">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </Link>
          <Link href="/consulta-gratuita" className="hidden md:inline-flex">
            <Button className="bg-sage-600 hover:bg-sage-700">Agendar Consulta</Button>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

