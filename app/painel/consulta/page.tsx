"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, ArrowLeft, Calendar, LineChart, Scale, Clock, User } from "lucide-react"
import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { useAuth } from "@/lib/auth"

export default function ConsultaPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Protege a rota
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Dados simulados da consulta
  const [consultaData] = useState({
    data: "2024-03-15T14:00:00",
    nutricionista: "Dra. Maria Zanetti",
    duracao: "50 minutos",
    medidas: {
      peso: 82,
      altura: 1.72,
      imc: 27.8,
      circunferencias: {
        cintura: 89,
        quadril: 98,
        braco: 32
      }
    },
    observacoes: [
      "Paciente relatou melhora no sono após ajustes na alimentação",
      "Aumento no consumo de água",
      "Redução no consumo de alimentos processados",
      "Praticando atividade física 3x por semana"
    ],
    evolucao: {
      pesoInicial: 85,
      pesoAtual: 82,
      metaPeso: 75,
      percentualProgresso: 30
    },
    recomendacoes: [
      "Manter o consumo de água em 2L/dia",
      "Aumentar consumo de vegetais",
      "Incluir proteína em todas as refeições principais",
      "Evitar açúcar refinado"
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
              <h1 className="text-3xl font-bold text-sage-900 mb-2">Detalhes da Consulta</h1>
              <div className="flex flex-wrap items-center gap-4 text-sage-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(consultaData.data).toLocaleDateString("pt-BR")}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{consultaData.duracao}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{consultaData.nutricionista}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-sage-600" />
                    Medidas Atuais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-sage-600">Peso</p>
                      <p className="text-xl font-semibold">{consultaData.medidas.peso} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-600">Altura</p>
                      <p className="text-xl font-semibold">{consultaData.medidas.altura} m</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-600">IMC</p>
                      <p className="text-xl font-semibold">{consultaData.medidas.imc.toFixed(1)}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="font-medium mb-2">Circunferências</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-sage-600">Cintura</p>
                          <p className="text-lg font-semibold">{consultaData.medidas.circunferencias.cintura} cm</p>
                        </div>
                        <div>
                          <p className="text-sm text-sage-600">Quadril</p>
                          <p className="text-lg font-semibold">{consultaData.medidas.circunferencias.quadril} cm</p>
                        </div>
                        <div>
                          <p className="text-sm text-sage-600">Braço</p>
                          <p className="text-lg font-semibold">{consultaData.medidas.circunferencias.braco} cm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-sage-600" />
                    Evolução
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-sage-600">Peso Inicial</p>
                        <p className="text-xl font-semibold">{consultaData.evolucao.pesoInicial} kg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-sage-600">Peso Atual</p>
                        <p className="text-xl font-semibold">{consultaData.evolucao.pesoAtual} kg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-sage-600">Meta</p>
                        <p className="text-xl font-semibold">{consultaData.evolucao.metaPeso} kg</p>
                      </div>
                    </div>
                    <div className="relative pt-4">
                      <div className="h-2 bg-sage-100 rounded-full">
                        <div 
                          className="absolute left-0 h-2 bg-sage-600 rounded-full"
                          style={{ width: `${consultaData.evolucao.percentualProgresso}%` }}
                        />
                      </div>
                      <p className="text-sm text-sage-600 mt-2 text-center">
                        {consultaData.evolucao.percentualProgresso}% do objetivo alcançado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Observações da Consulta</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {consultaData.observacoes.map((observacao, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-sage-600">•</span>
                        <span>{observacao}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recomendações</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {consultaData.recomendacoes.map((recomendacao, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-sage-600">•</span>
                        <span>{recomendacao}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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