"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Coffee, Sun, Moon, UtensilsCrossed, FileText, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"
import { use } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

interface Refeicao {
  id: string
  titulo: string
  horario: string
  alimentos: string[]
}

interface PlanoAlimentar {
  id: string
  refeicoes: Refeicao[]
  observacoes: string
  atualizadoEm: string
}

export default function PlanoAlimentarPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [planoAlimentar, setPlanoAlimentar] = useState<PlanoAlimentar | null>(null)

  useEffect(() => {
    if (!user || user.tipo !== "paciente") {
      router.push("/login")
      return
    }
    carregarPlanoAlimentar()
  }, [user, router])

  const carregarPlanoAlimentar = async () => {
    if (!user?.id) return

    try {
      const response = await fetch(`/api/pacientes/${user.id}/plano-alimentar`)
      if (!response.ok) {
        throw new Error("Erro ao carregar plano alimentar")
      }
      const data = await response.json()
      if (!data.id) {
        setPlanoAlimentar(null)
      } else {
        setPlanoAlimentar(data)
      }
    } catch (error) {
      console.error("Erro ao carregar plano alimentar:", error)
      toast.error("Erro ao carregar seu plano alimentar", {
        description: "Por favor, tente novamente mais tarde."
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/painel-paciente")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Seu Plano Alimentar
            </h1>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <p className="text-gray-600">Carregando seu plano alimentar...</p>
        </div>
      </div>
    )
  }

  if (!planoAlimentar) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/painel-paciente")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Seu Plano Alimentar
              </h1>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sage-600" />
                Plano Alimentar em Breve
              </CardTitle>
              <CardDescription>
                Seu plano alimentar personalizado está sendo preparado
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-sage-50 rounded-full">
                  <Clock className="h-12 w-12 text-sage-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Você ainda não possui um plano alimentar cadastrado.
                  </p>
                  <p className="text-gray-600">
                    Na sua próxima consulta, a nutricionista irá elaborar um plano personalizado 
                    considerando seus objetivos e necessidades específicas.
                  </p>
                </div>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/painel-paciente/agendamento")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Consulta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const getIconByTitulo = (titulo: string) => {
    const titulo_lower = titulo.toLowerCase()
    if (titulo_lower.includes("café") || titulo_lower.includes("cafe")) return Coffee
    if (titulo_lower.includes("almoço") || titulo_lower.includes("almoco")) return Sun
    if (titulo_lower.includes("jantar")) return Moon
    return UtensilsCrossed
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/painel-paciente")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Seu Plano Alimentar
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  Atualizado em{" "}
                  {format(new Date(planoAlimentar.atualizadoEm), "PPP", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {planoAlimentar.refeicoes.map((refeicao) => {
            const Icon = getIconByTitulo(refeicao.titulo)
            return (
              <Card key={refeicao.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <div className="flex items-center gap-2">
                      {refeicao.titulo}
                      <span className="text-sm font-normal text-gray-600">
                        {refeicao.horario}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {refeicao.alimentos.map((alimento, index) => (
                      <li key={index} className="text-gray-800">
                        {alimento}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {planoAlimentar.observacoes && (
          <Card>
            <CardHeader>
              <CardTitle>Observações Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {planoAlimentar.observacoes.split("\n").map((observacao, index) => (
                  <p key={index} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-800">{observacao}</span>
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 