"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"

interface Refeicao {
  id?: string
  titulo: string
  horario: string
  alimentos: string[]
}

interface PlanoAlimentar {
  id?: string
  pacienteId: string
  refeicoes: Refeicao[]
  observacoes: string
  atualizadoEm?: string
}

export default function PlanoAlimentarProfissionalPage({ params }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [planoAlimentar, setPlanoAlimentar] = useState<PlanoAlimentar>({
    pacienteId: params.id,
    refeicoes: [],
    observacoes: "",
  })
  const [paciente, setPaciente] = useState<{ nome: string }>({ nome: "" })

  useEffect(() => {
    if (!user || user.tipo !== "profissional") {
      router.push("/login")
      return
    }
    carregarDados()
  }, [user, router, params.id])

  const carregarDados = async () => {
    try {
      const [planoRes, pacienteRes] = await Promise.all([
        fetch(`/api/pacientes/${params.id}/plano-alimentar`),
        fetch(`/api/pacientes/${params.id}`),
      ])

      const pacienteData = await pacienteRes.json()
      setPaciente(pacienteData)

      if (planoRes.ok) {
        const planoData = await planoRes.json()
        setPlanoAlimentar(planoData)
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar dados do plano alimentar")
    } finally {
      setIsLoading(false)
    }
  }

  const adicionarRefeicao = () => {
    setPlanoAlimentar(prev => ({
      ...prev,
      refeicoes: [
        ...prev.refeicoes,
        {
          titulo: "",
          horario: "",
          alimentos: [""]
        }
      ]
    }))
  }

  const removerRefeicao = (index: number) => {
    setPlanoAlimentar(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.filter((_, i) => i !== index)
    }))
  }

  const atualizarRefeicao = (index: number, campo: keyof Refeicao, valor: any) => {
    setPlanoAlimentar(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.map((refeicao, i) => {
        if (i === index) {
          return { ...refeicao, [campo]: valor }
        }
        return refeicao
      })
    }))
  }

  const adicionarAlimento = (refeicaoIndex: number) => {
    setPlanoAlimentar(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.map((refeicao, i) => {
        if (i === refeicaoIndex) {
          return {
            ...refeicao,
            alimentos: [...refeicao.alimentos, ""]
          }
        }
        return refeicao
      })
    }))
  }

  const removerAlimento = (refeicaoIndex: number, alimentoIndex: number) => {
    setPlanoAlimentar(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.map((refeicao, i) => {
        if (i === refeicaoIndex) {
          return {
            ...refeicao,
            alimentos: refeicao.alimentos.filter((_, j) => j !== alimentoIndex)
          }
        }
        return refeicao
      })
    }))
  }

  const atualizarAlimento = (refeicaoIndex: number, alimentoIndex: number, valor: string) => {
    setPlanoAlimentar(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.map((refeicao, i) => {
        if (i === refeicaoIndex) {
          return {
            ...refeicao,
            alimentos: refeicao.alimentos.map((alimento, j) => {
              if (j === alimentoIndex) return valor
              return alimento
            })
          }
        }
        return refeicao
      })
    }))
  }

  const salvarPlanoAlimentar = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/pacientes/${params.id}/plano-alimentar`, {
        method: planoAlimentar.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planoAlimentar),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar plano alimentar")
      }

      toast.success("Plano alimentar salvo com sucesso!")
      router.push(`/painel-profissional/pacientes/${params.id}`)
    } catch (error) {
      console.error("Erro ao salvar plano alimentar:", error)
      toast.error("Erro ao salvar plano alimentar")
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) return null

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push(`/painel-profissional/pacientes/${params.id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Plano Alimentar - {paciente.nome}
            </h1>
            <p className="text-gray-600">
              Edite o plano alimentar do paciente
            </p>
          </div>
        </div>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Refeições</CardTitle>
                <CardDescription>
                  Adicione as refeições e seus respectivos alimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {planoAlimentar.refeicoes.map((refeicao, refeicaoIndex) => (
                    <div key={refeicaoIndex} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Título da Refeição</Label>
                            <Input
                              value={refeicao.titulo}
                              onChange={(e) => atualizarRefeicao(refeicaoIndex, "titulo", e.target.value)}
                              placeholder="Ex: Café da Manhã"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Horário</Label>
                            <Input
                              value={refeicao.horario}
                              onChange={(e) => atualizarRefeicao(refeicaoIndex, "horario", e.target.value)}
                              placeholder="Ex: 08:00"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-100"
                          onClick={() => removerRefeicao(refeicaoIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Alimentos</Label>
                        {refeicao.alimentos.map((alimento, alimentoIndex) => (
                          <div key={alimentoIndex} className="flex items-center gap-2">
                            <Input
                              value={alimento}
                              onChange={(e) => atualizarAlimento(refeicaoIndex, alimentoIndex, e.target.value)}
                              placeholder="Digite um alimento"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-100"
                              onClick={() => removerAlimento(refeicaoIndex, alimentoIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => adicionarAlimento(refeicaoIndex)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Alimento
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={adicionarRefeicao}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Refeição
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
                <CardDescription>
                  Adicione observações importantes sobre o plano alimentar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={planoAlimentar.observacoes}
                  onChange={(e) => setPlanoAlimentar(prev => ({ ...prev, observacoes: e.target.value }))}
                  placeholder="Digite as observações..."
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={salvarPlanoAlimentar}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar Plano Alimentar"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 