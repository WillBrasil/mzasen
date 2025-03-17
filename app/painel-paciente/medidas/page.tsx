"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowLeft, Plus, Ruler, Weight, LineChart } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { useAuth } from "@/lib/auth"

interface MedidaCorporal {
  id: string
  pacienteId: string
  data: string
  peso?: number
  altura?: number
  circunfCintura?: number
  circunfQuadril?: number
  circunfBraco?: number
  circunfCoxa?: number
  imc?: number
  percentualGordura?: number
  observacoes?: string
}

export default function MedidasPacientePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [medidas, setMedidas] = useState<MedidaCorporal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Omit<MedidaCorporal, "id" | "pacienteId" | "data">>({
    peso: undefined,
    altura: undefined,
    circunfCintura: undefined,
    circunfQuadril: undefined,
    circunfBraco: undefined,
    circunfCoxa: undefined,
    percentualGordura: undefined,
    observacoes: ""
  })

  const carregarMedidas = useCallback(async () => {
    // Simulação de carregamento - remova e use a API real quando estiver pronta
    setIsLoading(true)
    
    try {
      // Dados de exemplo para simular a API
      const medidasSimuladas: MedidaCorporal[] = [
        {
          id: "1",
          pacienteId: user?.id || "",
          data: new Date(2023, 5, 15).toISOString(),
          peso: 70.5,
          altura: 170,
          circunfCintura: 80,
          circunfQuadril: 95,
          imc: 24.4,
          observacoes: "Medidas iniciais"
        },
        {
          id: "2",
          pacienteId: user?.id || "",
          data: new Date(2023, 6, 15).toISOString(),
          peso: 69.2,
          altura: 170,
          circunfCintura: 78,
          circunfQuadril: 94,
          imc: 23.9,
          observacoes: "Progresso após 1 mês"
        },
        {
          id: "3",
          pacienteId: user?.id || "",
          data: new Date().toISOString(),
          peso: 68.0,
          altura: 170,
          circunfCintura: 76,
          circunfQuadril: 93,
          imc: 23.5,
          observacoes: "Medidas atuais"
        }
      ]
      
      // Simulando atraso da rede
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setMedidas(medidasSimuladas)
    } catch (error) {
      console.error("Erro ao carregar medidas:", error)
      toast.error("Erro ao carregar dados de medidas")
    } finally {
      setIsLoading(false)
    }
    
    // Quando a API estiver pronta, descomente e use este código:
    /*
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/pacientes/${user?.id}/medidas`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error("Erro ao carregar medidas")
      }
      
      const data = await response.json()
      setMedidas(data)
    } catch (error) {
      console.error("Erro ao carregar medidas:", error)
      toast.error("Erro ao carregar dados de medidas")
    } finally {
      setIsLoading(false)
    }
    */
  }, [user?.id])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    
    if (user.tipo !== "paciente") {
      router.push("/painel-profissional")
      return
    }

    carregarMedidas()
  }, [user, router, carregarMedidas])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Converter para número se for um campo numérico
    const numericFields = ["peso", "altura", "circunfCintura", "circunfQuadril", "circunfBraco", "circunfCoxa", "percentualGordura"]
    const newValue = numericFields.includes(name) && value !== "" ? parseFloat(value) : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulação de envio - remova e use a API real quando estiver pronta
    try {
      // Simular atraso de rede
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const novaMedida: MedidaCorporal = {
        id: Date.now().toString(),
        pacienteId: user?.id || "",
        data: new Date().toISOString(),
        ...formData,
        imc: formData.peso && formData.altura 
          ? parseFloat((formData.peso / Math.pow(formData.altura / 100, 2)).toFixed(2))
          : undefined
      }
      
      setMedidas(prev => [novaMedida, ...prev])
      setShowForm(false)
      setFormData({
        peso: undefined,
        altura: undefined,
        circunfCintura: undefined,
        circunfQuadril: undefined,
        circunfBraco: undefined,
        circunfCoxa: undefined,
        percentualGordura: undefined,
        observacoes: ""
      })
      
      toast.success("Medidas registradas com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar medidas:", error)
      toast.error("Erro ao salvar medidas")
    }
    
    // Quando a API estiver pronta, descomente e use este código:
    /*
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/pacientes/${user?.id}/medidas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error("Erro ao salvar medidas")
      }
      
      const novaMedida = await response.json()
      setMedidas(prev => [novaMedida, ...prev])
      setShowForm(false)
      setFormData({
        peso: undefined,
        altura: undefined,
        circunfCintura: undefined,
        circunfQuadril: undefined,
        circunfBraco: undefined,
        circunfCoxa: undefined,
        percentualGordura: undefined,
        observacoes: ""
      })
      
      toast.success("Medidas registradas com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar medidas:", error)
      toast.error("Erro ao salvar medidas")
    }
    */
  }

  const formatarData = (dataString: string) => {
    return format(new Date(dataString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

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
              Acompanhamento de Medidas Corporais
            </h1>
            <p className="text-gray-600">
              Registre e acompanhe a evolução das suas medidas
            </p>
          </div>
        </div>

        {!showForm ? (
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Novas Medidas
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Registrar Novas Medidas</CardTitle>
              <CardDescription>
                Preencha os campos abaixo com suas medidas atuais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="peso"
                        name="peso"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 70.5"
                        value={formData.peso || ""}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="altura"
                        name="altura"
                        type="number"
                        placeholder="Ex: 170"
                        value={formData.altura || ""}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="circunfCintura">Circunferência da Cintura (cm)</Label>
                    <Input
                      id="circunfCintura"
                      name="circunfCintura"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 80"
                      value={formData.circunfCintura || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="circunfQuadril">Circunferência do Quadril (cm)</Label>
                    <Input
                      id="circunfQuadril"
                      name="circunfQuadril"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 95"
                      value={formData.circunfQuadril || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="circunfBraco">Circunferência do Braço (cm)</Label>
                    <Input
                      id="circunfBraco"
                      name="circunfBraco"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 30"
                      value={formData.circunfBraco || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="circunfCoxa">Circunferência da Coxa (cm)</Label>
                    <Input
                      id="circunfCoxa"
                      name="circunfCoxa"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 55"
                      value={formData.circunfCoxa || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="percentualGordura">Percentual de Gordura (%)</Label>
                    <Input
                      id="percentualGordura"
                      name="percentualGordura"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 25"
                      value={formData.percentualGordura || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Input
                      id="observacoes"
                      name="observacoes"
                      placeholder="Observações adicionais"
                      value={formData.observacoes || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Salvar Medidas
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-sage-600" />
              Histórico de Medidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Carregando medidas...</p>
            ) : medidas.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-3">Nenhuma medida registrada</p>
                <Button onClick={() => setShowForm(true)}>
                  Registrar Primeiras Medidas
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2">Data</th>
                      <th className="px-4 py-2 text-right">Peso (kg)</th>
                      <th className="px-4 py-2 text-right">IMC</th>
                      <th className="px-4 py-2 text-right">Cintura (cm)</th>
                      <th className="px-4 py-2 text-right">Quadril (cm)</th>
                      <th className="px-4 py-2">Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medidas.map((medida) => (
                      <tr key={medida.id}>
                        <td className="border px-4 py-2">{formatarData(medida.data)}</td>
                        <td className="border px-4 py-2 text-right">{medida.peso?.toFixed(1)}</td>
                        <td className="border px-4 py-2 text-right">{medida.imc?.toFixed(1)}</td>
                        <td className="border px-4 py-2 text-right">{medida.circunfCintura?.toFixed(1)}</td>
                        <td className="border px-4 py-2 text-right">{medida.circunfQuadril?.toFixed(1)}</td>
                        <td className="border px-4 py-2">{medida.observacoes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 