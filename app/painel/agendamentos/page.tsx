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

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filtroStatus, setFiltroStatus] = useState("todos")

  useEffect(() => {
    carregarAgendamentos()
  }, [])

  const carregarAgendamentos = async () => {
    try {
      const response = await fetch("/api/agendamentos")
      if (!response.ok) throw new Error("Erro ao carregar agendamentos")
      const data = await response.json()
      setAgendamentos(data.agendamentos)
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const atualizarStatusAgendamento = async (id: string, novoStatus: string) => {
    try {
      const response = await fetch(`/api/agendamentos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: novoStatus }),
      })

      if (!response.ok) throw new Error("Erro ao atualizar status")
      
      await carregarAgendamentos()
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      alert("Erro ao atualizar status do agendamento")
    }
  }

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Agendamentos</h1>
          <p className="text-gray-600">Gerencie os agendamentos de consultas</p>
        </div>
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendente">Pendentes</SelectItem>
            <SelectItem value="confirmado">Confirmados</SelectItem>
            <SelectItem value="cancelado">Cancelados</SelectItem>
          </SelectContent>
        </Select>
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
                        onClick={() => atualizarStatusAgendamento(agendamento.id, "confirmado")}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button
                        onClick={() => atualizarStatusAgendamento(agendamento.id, "cancelado")}
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
  )
} 