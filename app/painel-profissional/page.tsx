"use client"

import { useEffect, useState, useCallback } from "react"
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
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  CalendarRange,
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
import { Input } from "@/components/ui"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui"

interface Paciente {
  id: string
  nome: string
  email: string
  telefone: string
  cadastradoEm: string
  ultimaConsulta: string | null
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
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const router = useRouter()

  const carregarConsultasHoje = useCallback(async () => {
    try {
      const response = await fetch("/api/consultas/hoje")
      if (!response.ok) throw new Error("Erro ao carregar consultas")
      
      const data = await response.json()
      setConsultasHoje(data.consultas)
    } catch (error) {
      console.error("Erro ao carregar consultas:", error)
    }
  }, [])

  const carregarPacientes = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        busca: busca,
        page: pagina.toString(),
        limit: "5",
        orderBy: "createdAt",
        order: "desc"
      })

      console.log("Carregando pacientes com parâmetros:", {
        busca,
        pagina,
        params: params.toString()
      })

      const response = await fetch(`/api/pacientes?${params}`)
      if (!response.ok) throw new Error("Erro ao carregar pacientes")

      const data = await response.json()
      console.log("Dados recebidos:", {
        totalPacientes: data.pacientes?.length,
        paginas: data.paginas,
        total: data.total
      })

      if (Array.isArray(data.pacientes)) {
        setPacientes(data.pacientes)
        setTotalPaginas(data.paginas || 1)
      } else {
        console.error("Dados de pacientes inválidos:", data)
        setPacientes([])
        setTotalPaginas(1)
      }
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error)
      setPacientes([])
      setTotalPaginas(1)
    } finally {
      setIsLoading(false)
    }
  }, [busca, pagina])

  useEffect(() => {
    if (!user || user.tipo !== "profissional") {
      router.push("/login")
      return
    }
    carregarConsultasHoje()
    carregarPacientes()
  }, [user, router, carregarConsultasHoje, carregarPacientes])

  useEffect(() => {
    if (user?.tipo !== "profissional") return

    const timer = setTimeout(() => {
      carregarPacientes()
    }, 300)

    return () => clearTimeout(timer)
  }, [busca, pagina, user?.tipo, carregarPacientes])

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value)
    setPagina(1)
  }

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
                <div className="space-y-3">
                  {consultasHoje.filter(c => c.status === "pendente").length > 0 && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <Bell className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-800">
                        Consultas Pendentes
                      </AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        {consultasHoje.filter(c => c.status === "pendente").length}{" "}
                        {consultasHoje.filter(c => c.status === "pendente").length === 1
                          ? "consulta precisa"
                          : "consultas precisam"} de confirmação
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* TODO: Implementar lógica real para planos alimentares */}
                  <Alert className="bg-blue-50 border-blue-200">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">
                      Planos Alimentares
                    </AlertTitle>
                    <AlertDescription className="text-blue-700">
                      3 planos alimentares precisam de atualização
                    </AlertDescription>
                  </Alert>
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
                    placeholder="Buscar por nome, email ou telefone..."
                    value={busca}
                    onChange={handleBuscaChange}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Carregando...</div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Contato</TableHead>
                          <TableHead>Última Consulta</TableHead>
                          <TableHead>Próxima Consulta</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pacientes.map((paciente) => (
                          <TableRow key={paciente.id}>
                            <TableCell>
                              <div className="font-medium">{paciente.nome}</div>
                              <div className="text-sm text-gray-500">
                                Cadastrado em{" "}
                                {format(new Date(paciente.cadastradoEm), "dd/MM/yyyy")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{paciente.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{paciente.telefone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {paciente.ultimaConsulta ? (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span>
                                    {format(new Date(paciente.ultimaConsulta), "dd/MM/yyyy")}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-500">Nenhuma consulta</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {paciente.proximaConsulta ? (
                                <div className="flex items-center gap-2">
                                  <CalendarRange className="h-4 w-4 text-gray-500" />
                                  <span>
                                    {format(new Date(paciente.proximaConsulta), "dd/MM/yyyy")}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-500">Não agendada</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    router.push(`/painel-profissional/pacientes/${paciente.id}`)
                                  }
                                >
                                  Ver Detalhes
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    router.push(`/painel-profissional/pacientes/${paciente.id}/plano-alimentar`)
                                  }
                                >
                                  Plano Alimentar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between space-x-2 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagina(Math.max(1, pagina - 1))}
                      disabled={pagina === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Anterior
                    </Button>
                    <div className="text-sm text-gray-600">
                      Página {pagina} de {totalPaginas}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
                      disabled={pagina === totalPaginas}
                    >
                      Próxima
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
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