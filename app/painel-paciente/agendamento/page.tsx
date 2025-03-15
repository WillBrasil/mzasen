"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"

interface FormData {
  data: string
  horario: string
  periodo: string
  servico: string
}

export default function AgendamentoPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    data: "",
    horario: "",
    periodo: "manha",
    servico: "",
  })

  useEffect(() => {
    if (!user || user.tipo !== "paciente") {
      router.push("/login")
      return
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          nome: user?.nome,
          email: user?.email,
          telefone: user?.telefone,
          preferencia_contato: "email",
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao agendar consulta")
      }

      toast.success("Consulta agendada com sucesso!")
      router.push("/painel-paciente")
    } catch (error) {
      console.error("Erro ao agendar consulta:", error)
      toast.error("Erro ao agendar consulta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
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
              Agendar Consulta
            </h1>
            <p className="text-gray-600">
              Escolha a data e horário para sua consulta
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados da Consulta</CardTitle>
            <CardDescription>
              Preencha os dados para agendar sua consulta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, data: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="horario">Horário</Label>
                <Input
                  id="horario"
                  type="time"
                  value={formData.horario}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, horario: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Período Preferido</Label>
                <RadioGroup
                  value={formData.periodo}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, periodo: value }))
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manha" id="manha" />
                    <Label htmlFor="manha">Manhã</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tarde" id="tarde" />
                    <Label htmlFor="tarde">Tarde</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="noite" id="noite" />
                    <Label htmlFor="noite">Noite</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label>Serviço</Label>
                <Select
                  value={formData.servico}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, servico: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nutricao-clinica">
                      Nutrição Clínica
                    </SelectItem>
                    <SelectItem value="bem-estar">Bem-Estar Integral</SelectItem>
                    <SelectItem value="nutricao-esportiva">
                      Nutrição Esportiva
                    </SelectItem>
                    <SelectItem value="reeducacao-alimentar">
                      Reeducação Alimentar
                    </SelectItem>
                    <SelectItem value="emagrecimento">
                      Nutrição para Emagrecimento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Agendando..." : "Agendar Consulta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 