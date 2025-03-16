"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  Clock,
  CalendarRange,
  Bell
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Paciente {
  id: string
  nome: string
  email: string
  cpf: string
  telefone: string
  dataNascimento: string
  tipo: string
}

interface Consulta {
  id: string
  data: string
  horario: string
  status: string
  servico: string
}

export default function DetalhesPacientePage() {
  const params = useParams()
  const router = useRouter()
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [consultasPendentes, setConsultasPendentes] = useState(0)
  const [planosParaAtualizar, setPlanosParaAtualizar] = useState(0)
  const [planoAlimentar, setPlanoAlimentar] = useState<{
    id: string;
    refeicoes: {
      titulo: string;
      horario: string;
      alimentos: string[];
    }[];
    observacoes: string;
    atualizadoEm: string;
  } | null>(null)

  useEffect(() => {
    carregarDados()
  }, [])

  useEffect(() => {
    // Atualiza o contador de consultas pendentes
    const pendentes = consultas.filter(c => c.status === "pendente").length
    setConsultasPendentes(pendentes)

    // TODO: Implementar lógica para contar planos alimentares que precisam de atualização
    setPlanosParaAtualizar(3) // Valor mockado por enquanto
  }, [consultas])

  const carregarDados = async () => {
    try {
      setIsLoading(true)
      const [pacienteRes, consultasRes, planoRes] = await Promise.all([
        fetch(`/api/pacientes/${params.id}`),
        fetch(`/api/pacientes/${params.id}/consultas`),
        fetch(`/api/pacientes/${params.id}/plano-alimentar`)
      ])

      if (!pacienteRes.ok || !consultasRes.ok) {
        throw new Error("Erro ao carregar dados")
      }

      const pacienteData = await pacienteRes.json()
      const consultasData = await consultasRes.json()
      const planoData = await planoRes.json()

      setPaciente(pacienteData.paciente)
      setConsultas(consultasData.consultas)
      setPlanoAlimentar(planoData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar dados do paciente", {
        duration: 4000,
        description: "Verifique sua conexão e tente novamente."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const atualizarStatusConsulta = async (consultaId: string, novoStatus: string) => {
    try {
      const response = await fetch(`/api/consultas/${consultaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: novoStatus }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar consulta")
      }

      // Atualiza a consulta na lista local
      setConsultas(consultas.map(consulta => 
        consulta.id === consultaId 
          ? { ...consulta, status: novoStatus }
          : consulta
      ))

      const mensagem = novoStatus === "confirmada" 
        ? "Consulta confirmada com sucesso! O paciente será notificado."
        : "Consulta cancelada com sucesso! O paciente será notificado."

      toast.success(mensagem, {
        duration: 4000,
        description: format(new Date(), "'Data da atualização:' dd/MM/yyyy 'às' HH:mm", {
          locale: ptBR
        })
      })

      // Recarrega os dados para garantir sincronização
      await carregarDados()
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast.error("Não foi possível atualizar o status da consulta", {
        duration: 4000,
        description: "Verifique sua conexão e tente novamente."
      })
    }
  }

  if (isLoading) {
    return <div className="container py-8">Carregando...</div>
  }

  if (!paciente) {
    return <div className="container py-8">Paciente não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          {(consultasPendentes > 0 || planosParaAtualizar > 0) && (
            <div className="mb-6 space-y-3">
              {consultasPendentes > 0 && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <Bell className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">
                    Consultas Pendentes
                  </AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    {consultasPendentes} {consultasPendentes === 1 ? 'consulta precisa' : 'consultas precisam'} de confirmação
                  </AlertDescription>
                </Alert>
              )}

              {planosParaAtualizar > 0 && (
                <Alert className="bg-blue-50 border-blue-200">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">
                    Planos Alimentares
                  </AlertTitle>
                  <AlertDescription className="text-blue-700">
                    {planosParaAtualizar} {planosParaAtualizar === 1 ? 'plano alimentar precisa' : 'planos alimentares precisam'} de atualização
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-900">
            Detalhes do Paciente
          </h1>
          <p className="text-gray-600">
            Informações completas e histórico de consultas
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome</label>
                  <p className="text-gray-900">{paciente.nome}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-900">{paciente.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-gray-900">{paciente.telefone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CPF</label>
                  <p className="text-gray-900">{paciente.cpf}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Data de Nascimento
                  </label>
                  <p className="text-gray-900">{paciente.dataNascimento}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Plano Alimentar
              </CardTitle>
              <CardDescription>
                {planoAlimentar ? (
                  `Atualizado em ${format(new Date(planoAlimentar.atualizadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`
                ) : (
                  "Nenhum plano alimentar cadastrado"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {planoAlimentar ? (
                <div className="space-y-4">
                  {planoAlimentar.refeicoes.map((refeicao, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <h3 className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {refeicao.titulo} - {refeicao.horario}
                      </h3>
                      <ul className="mt-2 space-y-1">
                        {refeicao.alimentos.map((alimento, i) => (
                          <li key={i} className="text-gray-600 ml-6">
                            • {alimento}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {planoAlimentar.observacoes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Observações:</strong> {planoAlimentar.observacoes}
                      </p>
                    </div>
                  )}
                  <div className="pt-4">
                    <Button
                      onClick={() =>
                        router.push(`/painel-profissional/pacientes/${paciente?.id}/plano-alimentar`)
                      }
                    >
                      Editar Plano Alimentar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Este paciente ainda não possui um plano alimentar cadastrado.</p>
                  <Button
                    onClick={() =>
                      router.push(`/painel-profissional/pacientes/${paciente?.id}/plano-alimentar`)
                    }
                  >
                    Criar Plano Alimentar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico de Consultas
            </CardTitle>
            <CardDescription>
              Todas as consultas realizadas e agendadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {consultas.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultas.map((consulta) => (
                      <TableRow key={consulta.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarRange className="h-4 w-4 text-gray-500" />
                            <span>{consulta.data}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{consulta.horario}</span>
                          </div>
                        </TableCell>
                        <TableCell>{consulta.servico}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                            {consulta.status === "pendente" && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800"
                                  onClick={() => atualizarStatusConsulta(consulta.id, "confirmada")}
                                >
                                  Confirmar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800"
                                  onClick={() => atualizarStatusConsulta(consulta.id, "cancelada")}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-gray-500">Nenhuma consulta encontrada</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 