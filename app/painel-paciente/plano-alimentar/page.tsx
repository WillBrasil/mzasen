"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Coffee, Sun, Moon, UtensilsCrossed } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

interface Refeicao {
  id: number
  titulo: string
  horario: string
  icon: any
  alimentos: string[]
}

interface PlanoAlimentar {
  dataAtualizacao: string
  nutricionista: string
  refeicoes: Refeicao[]
  observacoes: string[]
}

export default function PlanoAlimentarPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [planoAlimentar, setPlanoAlimentar] = useState<PlanoAlimentar>({
    dataAtualizacao: new Date().toISOString(),
    nutricionista: "Dra. Maria Zanetti",
    refeicoes: [
      {
        id: 1,
        titulo: "Café da Manhã",
        horario: "07:00",
        icon: Coffee,
        alimentos: [
          "1 fatia de pão integral",
          "1 ovo cozido",
          "1 fatia de queijo branco",
          "1 xícara de café com leite desnatado",
          "1 fruta (banana ou maçã)"
        ]
      },
      {
        id: 2,
        titulo: "Lanche da Manhã",
        horario: "10:00",
        icon: UtensilsCrossed,
        alimentos: [
          "1 iogurte natural",
          "1 punhado de granola",
          "1 colher de mel"
        ]
      },
      {
        id: 3,
        titulo: "Almoço",
        horario: "13:00",
        icon: Sun,
        alimentos: [
          "2 colheres de arroz integral",
          "1 concha de feijão",
          "120g de proteína (frango ou peixe)",
          "Salada à vontade",
          "1 colher de azeite"
        ]
      },
      {
        id: 4,
        titulo: "Lanche da Tarde",
        horario: "16:00",
        icon: UtensilsCrossed,
        alimentos: [
          "1 fruta",
          "3 castanhas",
          "1 chá verde"
        ]
      }
    ],
    observacoes: [
      "Beba pelo menos 2 litros de água por dia",
      "Evite alimentos processados",
      "Mastigue bem os alimentos",
      "Faça as refeições em ambiente tranquilo",
      "Em caso de dúvidas, entre em contato"
    ]
  })

  useEffect(() => {
    if (!user || user.tipo !== "paciente") {
      router.push("/login")
      return
    }
  }, [user, router])

  if (!user) return null

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
                  {format(new Date(planoAlimentar.dataAtualizacao), "PPP", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <span>•</span>
              <span>Por {planoAlimentar.nutricionista}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {planoAlimentar.refeicoes.map((refeicao) => (
            <Card key={refeicao.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {<refeicao.icon className="h-5 w-5" />}
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
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Observações Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {planoAlimentar.observacoes.map((observacao, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-800">{observacao}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 