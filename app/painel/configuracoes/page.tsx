"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, ArrowLeft, User, Bell, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth"

export default function ConfiguracoesPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Protege a rota
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Estado para as configurações
  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    telefone: user?.telefone || "",
    notificacoes: {
      email: true,
      whatsapp: true
    },
    privacidade: {
      compartilharProgresso: true,
      perfilPublico: false
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleToggleChange = (field: string, subfield: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof typeof prev],
        [subfield]: !prev[field as keyof typeof prev][subfield as keyof typeof prev[keyof typeof prev]]
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar as alterações
    console.log("Dados atualizados:", formData)
  }

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
              <h1 className="text-3xl font-bold text-sage-900 mb-2">Configurações</h1>
              <p className="text-sage-600">Gerencie suas preferências e informações pessoais</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-sage-600" />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informações de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-sage-600" />
                    Notificações
                  </CardTitle>
                  <CardDescription>
                    Escolha como deseja receber nossas comunicações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-sage-600">
                        Receba lembretes e atualizações por e-mail
                      </p>
                    </div>
                    <Switch
                      checked={formData.notificacoes.email}
                      onCheckedChange={() => handleToggleChange("notificacoes", "email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações por WhatsApp</Label>
                      <p className="text-sm text-sage-600">
                        Receba lembretes e atualizações por WhatsApp
                      </p>
                    </div>
                    <Switch
                      checked={formData.notificacoes.whatsapp}
                      onCheckedChange={() => handleToggleChange("notificacoes", "whatsapp")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-sage-600" />
                    Privacidade
                  </CardTitle>
                  <CardDescription>
                    Controle suas configurações de privacidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Compartilhar Progresso</Label>
                      <p className="text-sm text-sage-600">
                        Permitir que sua nutricionista compartilhe seu progresso
                      </p>
                    </div>
                    <Switch
                      checked={formData.privacidade.compartilharProgresso}
                      onCheckedChange={() => handleToggleChange("privacidade", "compartilharProgresso")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Perfil Público</Label>
                      <p className="text-sm text-sage-600">
                        Tornar seu perfil visível para outros usuários
                      </p>
                    </div>
                    <Switch
                      checked={formData.privacidade.perfilPublico}
                      onCheckedChange={() => handleToggleChange("privacidade", "perfilPublico")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-sage-600" />
                    Segurança
                  </CardTitle>
                  <CardDescription>
                    Altere sua senha e configure a autenticação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Alterar Senha
                  </Button>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/painel")}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Alterações
                </Button>
              </div>
            </form>
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