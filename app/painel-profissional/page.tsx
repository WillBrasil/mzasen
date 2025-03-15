"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Calendar,
  Clock,
  LogOut,
  Search,
  Settings,
  Users,
  FileText,
  TrendingUp,
  Bell,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Paciente {
  id: string
  nome: string
  email: string
  telefone: string
  ultimaConsulta: string
  proximaConsulta: string | null
}

interface ConsultaHoje {
  id: string
  paciente: string
  horario: string
  status: string
}

export default function PainelProfissionalPage() {
  const { user, logout } = useAuth()
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [consultasHoje, setConsultasHoje] = useState<ConsultaHoje[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [busca, setBusca] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!user || user.tipo !== "profissional") {
      router.push("/login")
      return
    }
    carregarDados()
  }, [user, router])

  const carregarDados = async () => {
    try {
      const [pacientesRes, consultasRes] = await Promise.all([
        fetch("/api/pacientes"),
        fetch("/api/consultas/hoje"),
      ])

      if (!pacientesRes.ok || !consultasRes.ok) {
        throw new Error("Erro ao carregar dados")
      }

      const pacientesData = await pacientesRes.json()
      const consultasData = await consultasRes.json()

      setPacientes(pacientesData.pacientes)
      setConsultasHoje(consultasData.consultas)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(busca.toLowerCase())
  )

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold">Painel Profissional</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-sage-600 hover:text-sage-700"
              onClick={() => router.push("/painel-profissional/configuracoes")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
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

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo(a), Dr(a). {user.nome}
            </h1>
            <p className="text-gray-600">
              Gerencie seus pacientes e consultas do dia
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Consultas de Hoje
                </CardTitle>
                <CardDescription>
                  {format(new Date(), "PPP", { locale: ptBR })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Carregando...</p>
                ) : consultasHoje.length > 0 ? (
                  <div className="space-y-4">
                    {consultasHoje.map((consulta) => (
                      <div
                        key={consulta.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{consulta.paciente}</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">
                              {consulta.horario}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${
                            consulta.status === "confirmada"
                              ? "bg-green-100 text-green-800"
                              : consulta.status === "cancelada"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {consulta.status.charAt(0).toUpperCase() +
                            consulta.status.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nenhuma consulta agendada para hoje</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resumo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total de Pacientes</span>
                    <span className="font-bold">{pacientes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Consultas Hoje</span>
                    <span className="font-bold">{consultasHoje.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Consultas Pendentes</span>
                    <span className="font-bold">
                      {consultasHoje.filter((c) => c.status === "pendente").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                    <Bell className="h-4 w-4" />
                    <p className="text-sm">2 consultas precisam de confirmação</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <FileText className="h-4 w-4" />
                    <p className="text-sm">3 planos alimentares para atualizar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Pacientes</CardTitle>
              <CardDescription>
                Gerencie seus pacientes e acesse seus históricos
              </CardDescription>
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Buscar paciente..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Carregando...</p>
              ) : pacientesFiltrados.length > 0 ? (
                <div className="space-y-4">
                  {pacientesFiltrados.map((paciente) => (
                    <div
                      key={paciente.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{paciente.nome}</p>
                        <p className="text-sm text-gray-500">{paciente.email}</p>
                        <p className="text-sm text-gray-500">
                          Última consulta:{" "}
                          {format(new Date(paciente.ultimaConsulta), "PPP", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            router.push(
                              `/painel-profissional/pacientes/${paciente.id}/plano-alimentar`
                            )
                          }
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Plano Alimentar
                        </Button>
                        <Button
                          variant="default"
                          onClick={() =>
                            router.push(
                              `/painel-profissional/pacientes/${paciente.id}`
                            )
                          }
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum paciente encontrado</p>
              )}
            </CardContent>
          </Card>
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