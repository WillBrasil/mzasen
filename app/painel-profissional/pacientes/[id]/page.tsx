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
  CalendarRange
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const [pacienteRes, consultasRes] = await Promise.all([
        fetch(`/api/pacientes/${params.id}`),
        fetch(`/api/pacientes/${params.id}/consultas`)
      ])

      if (!pacienteRes.ok || !consultasRes.ok) {
        throw new Error("Erro ao carregar dados")
      }

      const pacienteData = await pacienteRes.json()
      const consultasData = await consultasRes.json()

      setPaciente(pacienteData.paciente)
      setConsultas(consultasData.consultas)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
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
                Último plano alimentar do paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  router.push(`/painel-profissional/pacientes/${paciente.id}/plano-alimentar`)
                }
              >
                Ver Plano Alimentar
              </Button>
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