"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  User,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Agendamento {
  id: string
  nome: string
  email: string
  telefone: string
  preferencia_contato: string
  periodo: string
  servico: string
  status: string
  createdAt: string
}

interface StatusCount {
  pendente: number
  confirmado: number
  cancelado: number
}

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [statusCount, setStatusCount] = useState<StatusCount>({
    pendente: 0,
    confirmado: 0,
    cancelado: 0,
  })
  const router = useRouter()

  useEffect(() => {
    carregarAgendamentos()
  }, [])

  useEffect(() => {
    // Atualiza o contador de status
    const counts = agendamentos.reduce(
      (acc, agendamento) => {
        acc[agendamento.status as keyof StatusCount]++
        return acc
      },
      { pendente: 0, confirmado: 0, cancelado: 0 }
    )
    setStatusCount(counts)
  }, [agendamentos])

  const carregarAgendamentos = async () => {
    try {
      const response = await fetch("/api/agendamentos")
      if (!response.ok) throw new Error("Erro ao carregar agendamentos")
      const data = await response.json()
      
      // Ordena os agendamentos por data, mais recentes primeiro
      const agendamentosOrdenados = data.agendamentos.sort((a: Agendamento, b: Agendamento) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      
      setAgendamentos(agendamentosOrdenados)
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error)
      toast.error("Não foi possível carregar os agendamentos.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/agendamentos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status");
      }

      toast.success("Status atualizado com sucesso!");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao atualizar status do agendamento");
      console.error(error);
    }
  };

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    if (filtroStatus === "todos") return true
    return agendamento.status === filtroStatus
  })

  const traduzirPeriodo = (periodo: string) => {
    const traducoes: { [key: string]: string } = {
      manha: "Manhã",
      tarde: "Tarde",
      noite: "Noite",
    }
    return traducoes[periodo] || periodo
  }

  const traduzirServico = (servico: string) => {
    const traducoes: { [key: string]: string } = {
      "nutricao-clinica": "Nutrição Clínica",
      "bem-estar": "Bem-Estar Integral",
      "nutricao-esportiva": "Nutrição Esportiva",
      "reeducacao-alimentar": "Reeducação Alimentar",
      "emagrecimento": "Nutrição para Emagrecimento",
      "outro": "Outro",
    }
    return traducoes[servico] || servico
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Agendamentos</h1>
            <p className="text-gray-600">Gerencie os agendamentos de consultas</p>
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos ({agendamentos.length})</SelectItem>
              <SelectItem value="pendente">Pendentes ({statusCount.pendente})</SelectItem>
              <SelectItem value="confirmado">Confirmados ({statusCount.confirmado})</SelectItem>
              <SelectItem value="cancelado">Cancelados ({statusCount.cancelado})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-yellow-700">Pendentes</CardTitle>
              <CardDescription className="text-yellow-600">
                {statusCount.pendente} agendamentos
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">Confirmados</CardTitle>
              <CardDescription className="text-green-600">
                {statusCount.confirmado} agendamentos
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-700">Cancelados</CardTitle>
              <CardDescription className="text-red-600">
                {statusCount.cancelado} agendamentos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Carregando agendamentos...</div>
        ) : agendamentosFiltrados.length === 0 ? (
          <div className="text-center py-8">Nenhum agendamento encontrado</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agendamentosFiltrados.map((agendamento) => (
              <Card key={agendamento.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{agendamento.nome}</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      agendamento.status === "confirmado"
                        ? "bg-green-100 text-green-800"
                        : agendamento.status === "cancelado"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                    </div>
                  </div>
                  <CardDescription>
                    {format(new Date(agendamento.createdAt), "PPP 'às' HH:mm", { locale: ptBR })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{agendamento.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{agendamento.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Período: {traduzirPeriodo(agendamento.periodo)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Serviço: {traduzirServico(agendamento.servico)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Contato preferido: {agendamento.preferencia_contato}</span>
                    </div>

                    {agendamento.status === "pendente" && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleStatusChange(agendamento.id, "confirmado")}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Confirmar
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(agendamento.id, "cancelado")}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 