"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, User, Calendar, FileText, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PainelPage() {
  const [userData] = useState({
    nome: "João da Silva",
    email: "joao@exemplo.com",
    proximaConsulta: "2024-04-15T14:00:00",
    ultimaConsulta: "2024-03-15T14:00:00",
    pesoInicial: 85,
    pesoAtual: 82,
    metaPeso: 75,
    imc: 27.8,
  })

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log("Logout")
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
              className="text-sage-600 hover:text-sage-700"
              onClick={handleLogout}
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
              <h1 className="text-3xl font-bold text-sage-900">Bem-vindo(a), {userData.nome}</h1>
              <Button variant="outline" className="text-sage-600 hover:text-sage-700">
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
                      <Button variant="outline" size="sm">
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
                    <Button className="w-full">Ver plano completo</Button>
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