"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { LogOut } from "lucide-react"

export default function PainelPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Protege a rota - redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // Não renderiza nada enquanto verifica autenticação
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Painel do Paciente</h1>
          <Button 
            variant="ghost" 
            onClick={logout}
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="grid gap-6">
          <div className="rounded-lg border p-4 bg-white">
            <h2 className="text-lg font-semibold mb-2">Informações Pessoais</h2>
            <div className="grid gap-2">
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>E-mail:</strong> {user.email}</p>
              <p><strong>CPF:</strong> {user.cpf}</p>
              <p><strong>Telefone:</strong> {user.telefone}</p>
              <p><strong>Data de Nascimento:</strong> {user.dataNascimento}</p>
            </div>
          </div>

          {/* Aqui você pode adicionar mais seções como:
           * - Próximas consultas
           * - Histórico de consultas
           * - Plano alimentar
           * - Evolução
           * etc.
           */}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MzaSen. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
} 