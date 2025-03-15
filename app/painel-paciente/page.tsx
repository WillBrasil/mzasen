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
} from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Consulta {
  id: string
  data: string
  horario: string
  status: string
  profissional: string
}

export default function PainelPacientePage() {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    carregarConsultas()
  }, [])

  const carregarConsultas = async () => {
    try {
      const response = await fetch("/api/consultas/paciente")
      if (!response.ok) throw new Error("Erro ao carregar consultas")
      const data = await response.json()
      setConsultas(data.consultas)
    } catch (error) {
      console.error("Erro ao carregar consultas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meu Painel</h1>
            <p className="text-gray-600">Gerencie suas consultas e planos alimentares</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-sage-600 hover:text-sage-700"
              onClick={() => router.push("/painel-paciente/configuracoes")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
                      {format(new Date(consultas[0].data), "PPP", {
                        locale: ptBR,
                      })}
                      {" às "}
                      {consultas[0].horario}
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
                <FileText className="h-5 w-5" />
                Plano Alimentar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => router.push("/painel-paciente/plano-alimentar")}
              >
                Ver meu plano alimentar
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Consultas</CardTitle>
            <CardDescription>
              Suas últimas consultas e seus respectivos status
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
                        {format(new Date(consulta.data), "PPP", {
                          locale: ptBR,
                        })}
                        {" às "}
                        {consulta.horario}
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
    </div>
  )
} 