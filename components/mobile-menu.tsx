"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Função para determinar o URL correto baseado na página atual
  const getNavUrl = (anchor: string) => {
    return isHomePage ? `#${anchor}` : `/#${anchor}`
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[350px]">
        <div className="flex flex-col gap-6 px-2 py-6">
          <Link
            href={getNavUrl("services")}
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Serviços
          </Link>
          <Link
            href={getNavUrl("about")}
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Sobre Nós
          </Link>
          <Link
            href={getNavUrl("testimonials")}
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Depoimentos
          </Link>
          <Link
            href={getNavUrl("contact")}
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Contato
          </Link>
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full text-sage-600 hover:text-sage-700">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </Link>
          <Link href="/consulta-gratuita" onClick={() => setOpen(false)}>
            <Button className="w-full bg-sage-600 hover:bg-sage-700">Agendar Consulta</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

