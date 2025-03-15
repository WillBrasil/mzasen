"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowLeft,
  Calendar,
  FileText,
  Mail,
  Phone,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Paciente {
  id: string
  nome: string
  email: string
  telefone: string
  dataNascimento: string
  genero: string
  altura: number
  peso: number
  objetivos: string[]
  restricoes: string[]
}

interface Consulta {
  id: string
  data: string
  horario: string
  status: string
  observacoes: string
}

interface PlanoAlimentar {
  id: string
  data: string
  refeicoes: {
    nome: string
    horario: string
    alimentos: string[]
  }[]
  observacoes: string
}

interface PacientePageProps {
  params: {
    id: string
  }
}

export function PacientePage({ params }: PacientePageProps) {
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [planoAlimentar, setPlanoAlimentar] = useState<PlanoAlimentar | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pacienteRes, consultasRes, planoRes] = await Promise.all([
          fetch(`/api/pacientes/${params.id}`),
          fetch(`/api/pacientes/${params.id}/consultas`),
          fetch(`/api/pacientes/${params.id}/plano-alimentar`),
        ])

        if (!pacienteRes.ok || !consultasRes.ok || !planoRes.ok) {
          throw new Error("Erro ao carregar dados")
        }

        const [pacienteData, consultasData, planoData] = await Promise.all([
          pacienteRes.json(),
          consultasRes.json(),
          planoRes.json(),
        ])

        setPaciente(pacienteData.paciente)
        setConsultas(consultasData.consultas)
        setPlanoAlimentar(planoData.plano)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarDados()
  }, [params.id])

  if (isLoading) {
    return <div className="container py-8">Carregando...</div>
  }

  if (!paciente) {
    return <div className="container py-8">Paciente não encontrado</div>
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/painel-profissional")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {paciente.nome}
            </h1>
            <p className="text-gray-600">Detalhes do paciente</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{paciente.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{paciente.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>
                  {format(new Date(paciente.dataNascimento), "PPP", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Altura</p>
                  <p className="font-medium">{paciente.altura}m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Peso</p>
                  <p className="font-medium">{paciente.peso}kg</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Objetivos</p>
                <div className="flex flex-wrap gap-2">
                  {paciente.objetivos.map((objetivo) => (
                    <span
                      key={objetivo}
                      className="px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-sm"
                    >
                      {objetivo}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Restrições</p>
                <div className="flex flex-wrap gap-2">
                  {paciente.restricoes.map((restricao) => (
                    <span
                      key={restricao}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                    >
                      {restricao}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Plano Alimentar Atual
              </CardTitle>
              <CardDescription>
                {planoAlimentar
                  ? `Atualizado em ${format(
                      new Date(planoAlimentar.data),
                      "PPP",
                      { locale: ptBR }
                    )}`
                  : "Nenhum plano alimentar cadastrado"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {planoAlimentar ? (
                <div className="space-y-6">
                  {planoAlimentar.refeicoes.map((refeicao, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">
                        {refeicao.nome} - {refeicao.horario}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {refeicao.alimentos.map((alimento, i) => (
                          <li key={i}>{alimento}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {planoAlimentar.observacoes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        {planoAlimentar.observacoes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    router.push(
                      `/painel-profissional/pacientes/${params.id}/plano-alimentar/novo`
                    )
                  }
                >
                  Criar Plano Alimentar
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Consultas</CardTitle>
            <CardDescription>
              Todas as consultas realizadas com o paciente
            </CardDescription>
          </CardHeader>
          <CardContent>
            {consultas.length > 0 ? (
              <div className="space-y-4">
                {consultas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        {format(new Date(consulta.data), "PPP", {
                          locale: ptBR,
                        })}
                        {" às "}
                        {consulta.horario}
                      </p>
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-sm ${
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
                      {consulta.observacoes && (
                        <p className="text-sm text-gray-600 mt-2">
                          {consulta.observacoes}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(
                          `/painel-profissional/consultas/${consulta.id}`
                        )
                      }
                    >
                      Ver detalhes
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhuma consulta realizada</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 