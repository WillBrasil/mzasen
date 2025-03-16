"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Calendar,
  Clock,
  FileText,
  LogOut,
  Settings,
  User,
  Scale,
  TrendingUp,
  Leaf,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

import { Button } from "@/components/ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"

interface Consulta {
  id: string
  data: string
  horario: string
  status: string
  profissional: string
}

interface DadosPaciente {
  pesoInicial: number
  pesoAtual: number
  metaPeso: number
  imc: number
}

export default function PainelPacientePage() {
  const { user, logout } = useAuth()
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({
    pesoInicial: 0,
    pesoAtual: 0,
    metaPeso: 0,
    imc: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user || user.tipo !== "paciente") {
      router.push("/login")
      return
    }
    carregarDados()
  }, [user, router])

  const carregarDados = async () => {
    try {
      const [consultasRes, dadosRes] = await Promise.all([
        fetch(`/api/pacientes/${user?.id}/consultas`),
        fetch("/api/pacientes/dados"),
      ])

      if (!consultasRes.ok || !dadosRes.ok) {
        throw new Error("Erro ao carregar dados")
      }

      const consultasData = await consultasRes.json()
      const dadosData = await dadosRes.json()

      setConsultas(consultasData.consultas)
      setDadosPaciente(dadosData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold">MzaSen</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-sage-600 hover:text-sage-700"
              onClick={() => router.push("/painel-paciente/configuracoes")}
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
              Bem-vindo(a), {user.nome}
            </h1>
            <p className="text-gray-600">
              Acompanhe seu progresso e consultas
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próxima Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Carregando...</p>
                ) : consultas.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {consultas[0].data}
                        {consultas[0].horario !== "Horário não definido" && (
                          <>{" às "}{consultas[0].horario}</>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Profissional: {consultas[0].profissional}</span>
                    </div>
                    <div
                      className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        consultas[0].status === "confirmada"
                          ? "bg-green-100 text-green-800"
                          : consultas[0].status === "cancelada"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {consultas[0].status.charAt(0).toUpperCase() +
                        consultas[0].status.slice(1)}
                    </div>
                  </div>
                ) : (
                  <p>Nenhuma consulta agendada</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Progresso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Peso Inicial</span>
                    <span className="font-bold">{dadosPaciente.pesoInicial} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peso Atual</span>
                    <span className="font-bold">{dadosPaciente.pesoAtual} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Meta</span>
                    <span className="font-bold">{dadosPaciente.metaPeso} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>IMC</span>
                    <span className="font-bold">{dadosPaciente.imc.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/painel-paciente/plano-alimentar")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Plano Alimentar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/painel-paciente/agendamento")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Consulta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Consultas</CardTitle>
              <CardDescription>
                Acompanhe suas consultas anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Carregando...</p>
              ) : consultas.length > 0 ? (
                <div className="space-y-4">
                  {consultas.map((consulta) => (
                    <div
                      key={consulta.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">
                          {consulta.data}
                          {consulta.horario !== "Horário não definido" && (
                            <>{" às "}{consulta.horario}</>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          Profissional: {consulta.profissional}
                        </p>
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
                <p>Nenhuma consulta realizada</p>
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