"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Bell, Lock, User, Clock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { Switch } from "@/components/ui"
import { useAuth } from "@/lib/auth"

interface ConfiguracoesProfissional {
  notificacoes: {
    email: boolean
    consultas: boolean
    novoPaciente: boolean
  }
  privacidade: {
    perfilPublico: boolean
    exibirAvaliacao: boolean
  }
  agenda: {
    lembreteConsulta: boolean
    intervaloConsultas: number
  }
}

export default function ConfiguracoesProfissionalPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
    confirmacao: ""
  })
  
  // Estado para as configurações
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesProfissional>({
    notificacoes: {
      email: true,
      consultas: true,
      novoPaciente: true
    },
    privacidade: {
      perfilPublico: true,
      exibirAvaliacao: true
    },
    agenda: {
      lembreteConsulta: true,
      intervaloConsultas: 30
    }
  })

  useEffect(() => {
    if (!user || user.tipo !== "profissional") {
      router.push("/login")
      return
    }
    
    // Simulação de carregamento das configurações
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [user, router])

  const handleNotificacaoChange = (campo: keyof typeof configuracoes.notificacoes, valor: boolean) => {
    setConfiguracoes(prev => ({
      ...prev,
      notificacoes: {
        ...prev.notificacoes,
        [campo]: valor
      }
    }))
  }

  const handlePrivacidadeChange = (campo: keyof typeof configuracoes.privacidade, valor: boolean) => {
    setConfiguracoes(prev => ({
      ...prev,
      privacidade: {
        ...prev.privacidade,
        [campo]: valor
      }
    }))
  }

  const handleAgendaChange = (campo: keyof typeof configuracoes.agenda, valor: any) => {
    setConfiguracoes(prev => ({
      ...prev,
      agenda: {
        ...prev.agenda,
        [campo]: valor
      }
    }))
  }

  const handleSenhaChange = (campo: keyof typeof senha, valor: string) => {
    setSenha(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  const salvarConfiguracoes = async () => {
    setIsSaving(true)
    
    // Simulação de salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Configurações salvas com sucesso!")
    setIsSaving(false)
  }

  const alterarSenha = async () => {
    if (senha.nova !== senha.confirmacao) {
      toast.error("As senhas não coincidem")
      return
    }
    
    if (senha.nova.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres")
      return
    }
    
    setIsSaving(true)
    
    // Simulação de alteração de senha
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Senha alterada com sucesso!")
    setSenha({ atual: "", nova: "", confirmacao: "" })
    setIsSaving(false)
  }

  if (!user) return null

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/painel-profissional")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-sage-900 mb-2">Configurações</h1>
            <p className="text-gray-600">
              Gerencie suas preferências e informações profissionais
            </p>
          </div>
        </div>

        {isLoading ? (
          <p>Carregando configurações...</p>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-sage-600" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Gerencie como você recebe notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por e-mail</p>
                    <p className="text-sm text-gray-500">Receba atualizações por e-mail</p>
                  </div>
                  <Switch
                    checked={configuracoes.notificacoes.email}
                    onCheckedChange={(checked) => handleNotificacaoChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembretes de consultas</p>
                    <p className="text-sm text-gray-500">Receba lembretes sobre suas consultas agendadas</p>
                  </div>
                  <Switch
                    checked={configuracoes.notificacoes.consultas}
                    onCheckedChange={(checked) => handleNotificacaoChange("consultas", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos pacientes</p>
                    <p className="text-sm text-gray-500">Seja notificado quando um novo paciente for cadastrado</p>
                  </div>
                  <Switch
                    checked={configuracoes.notificacoes.novoPaciente}
                    onCheckedChange={(checked) => handleNotificacaoChange("novoPaciente", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-sage-600" />
                  Privacidade
                </CardTitle>
                <CardDescription>
                  Controle suas configurações de privacidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-gray-500">Tornar seu perfil visível para pacientes em potencial</p>
                  </div>
                  <Switch
                    checked={configuracoes.privacidade.perfilPublico}
                    onCheckedChange={(checked) => handlePrivacidadeChange("perfilPublico", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Exibir avaliações</p>
                    <p className="text-sm text-gray-500">Mostrar avaliações de pacientes em seu perfil</p>
                  </div>
                  <Switch
                    checked={configuracoes.privacidade.exibirAvaliacao}
                    onCheckedChange={(checked) => handlePrivacidadeChange("exibirAvaliacao", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sage-600" />
                  Agenda
                </CardTitle>
                <CardDescription>
                  Configure suas preferências de agenda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembrete de consulta</p>
                    <p className="text-sm text-gray-500">Receber lembrete antes das consultas</p>
                  </div>
                  <Switch
                    checked={configuracoes.agenda.lembreteConsulta}
                    onCheckedChange={(checked) => handleAgendaChange("lembreteConsulta", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intervalo-consultas">Intervalo entre consultas (minutos)</Label>
                  <Input
                    id="intervalo-consultas"
                    type="number"
                    min={15}
                    max={120}
                    step={15}
                    value={configuracoes.agenda.intervaloConsultas}
                    onChange={(e) => handleAgendaChange("intervaloConsultas", parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-sage-600" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Altere sua senha
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="senha-atual">Senha atual</Label>
                    <Input
                      id="senha-atual"
                      type="password"
                      value={senha.atual}
                      onChange={(e) => handleSenhaChange("atual", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nova-senha">Nova senha</Label>
                    <Input
                      id="nova-senha"
                      type="password"
                      value={senha.nova}
                      onChange={(e) => handleSenhaChange("nova", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                    <Input
                      id="confirmar-senha"
                      type="password"
                      value={senha.confirmacao}
                      onChange={(e) => handleSenhaChange("confirmacao", e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={alterarSenha}
                    disabled={isSaving || !senha.atual || !senha.nova || !senha.confirmacao}
                    className="w-full md:w-auto md:self-end"
                  >
                    Alterar senha
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={salvarConfiguracoes}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar configurações"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 