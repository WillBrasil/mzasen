"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, ArrowLeft, Clock, Coffee, Sun, Moon, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

export default function PlanoAlimentarPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Protege a rota
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Dados simulados do plano alimentar
  const [planoAlimentar] = useState({
    dataAtualizacao: "2024-03-15T14:00:00",
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
      },
      {
        id: 5,
        titulo: "Jantar",
        horario: "19:00",
        icon: Moon,
        alimentos: [
          "Omelete com 2 ovos",
          "Legumes refogados",
          "1 fatia de pão integral",
          "1 colher de azeite"
        ]
      }
    ]
  })

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold">MzaSen</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-sage-600 hover:text-sage-700"
                onClick={() => router.push("/painel")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Painel
              </Button>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-sage-900 mb-2">Seu Plano Alimentar</h1>
              <div className="flex items-center gap-4 text-sage-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Atualizado em {new Date(planoAlimentar.dataAtualizacao).toLocaleDateString("pt-BR")}</span>
                </div>
                <span>•</span>
                <span>Por {planoAlimentar.nutricionista}</span>
              </div>
            </div>

            <div className="grid gap-6">
              {planoAlimentar.refeicoes.map((refeicao) => (
                <Card key={refeicao.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {<refeicao.icon className="h-5 w-5 text-sage-600" />}
                      <div className="flex items-center gap-2">
                        {refeicao.titulo}
                        <span className="text-sm font-normal text-sage-600">
                          {refeicao.horario}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {refeicao.alimentos.map((alimento, index) => (
                        <li key={index} className="text-sage-800">
                          {alimento}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-sage-50 rounded-lg p-6 mt-4">
              <h2 className="text-xl font-semibold text-sage-900 mb-4">Observações Importantes</h2>
              <ul className="space-y-2 text-sage-800">
                <li>• Beba pelo menos 2 litros de água por dia</li>
                <li>• Evite alimentos processados</li>
                <li>• Mastigue bem os alimentos</li>
                <li>• Faça as refeições em ambiente tranquilo</li>
                <li>• Em caso de dúvidas, entre em contato com sua nutricionista</li>
              </ul>
            </div>
          </div>
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