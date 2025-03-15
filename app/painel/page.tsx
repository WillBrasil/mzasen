"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, User, Calendar, FileText, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

export default function PainelPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Protege a rota - redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Dados simulados que serão substituídos por dados reais posteriormente
  const [userData] = useState({
    proximaConsulta: "2024-04-15T14:00:00",
    ultimaConsulta: "2024-03-15T14:00:00",
    pesoInicial: 85,
    pesoAtual: 82,
    metaPeso: 75,
    imc: 27.8,
  })

  if (!user) {
    return null // Não renderiza nada enquanto verifica autenticação
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold">MzaSen</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-red-600 hover:text-red-700 hover:bg-red-100"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-sage-900">Bem-vindo(a), {user.nome}</h1>
              <Button 
                variant="outline" 
                className="text-sage-600 hover:text-sage-700"
                onClick={() => router.push("/painel/configuracoes")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-sage-600" />
                    Próxima Consulta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">
                    {new Date(userData.proximaConsulta).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-sage-600">
                    {new Date(userData.proximaConsulta).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-sage-600" />
                    Progresso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-sage-600">Peso Inicial</p>
                      <p className="text-xl font-semibold">{userData.pesoInicial} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-600">Peso Atual</p>
                      <p className="text-xl font-semibold">{userData.pesoAtual} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-600">Meta</p>
                      <p className="text-xl font-semibold">{userData.metaPeso} kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-sage-600" />
                    IMC Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{userData.imc.toFixed(1)}</p>
                  <p className="text-sm text-sage-600">
                    {userData.imc < 18.5
                      ? "Abaixo do peso"
                      : userData.imc < 25
                      ? "Peso normal"
                      : userData.imc < 30
                      ? "Sobrepeso"
                      : "Obesidade"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Agendamentos</CardTitle>
                  <CardDescription>Gerencie os agendamentos de consultas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => router.push("/painel/agendamentos")}
                    className="w-full bg-sage-600 hover:bg-sage-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver Agendamentos
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Consultas</CardTitle>
                  <CardDescription>Suas últimas consultas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Última Consulta</p>
                        <p className="text-sm text-sage-600">
                          {new Date(userData.ultimaConsulta).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push("/painel/consulta")}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plano Alimentar</CardTitle>
                  <CardDescription>Seu plano alimentar atual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className="w-full"
                      onClick={() => router.push("/painel/plano-alimentar")}
                    >
                      Ver plano completo
                    </Button>
                    <p className="text-sm text-sage-600">
                      Última atualização:{" "}
                      {new Date(userData.ultimaConsulta).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-sage-200 bg-sage-50 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-sage-600 md:text-left">
            &copy; {new Date().getFullYear()} MzaSen. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
} 