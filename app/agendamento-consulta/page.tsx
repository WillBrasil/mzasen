"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Calendar, Clock, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { RadioGroup, RadioGroupItem } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { Textarea } from "@/components/ui"
import { MobileMenu } from "@/components/mobile-menu"

interface FormData {
  nome: string
  email: string
  telefone: string
  preferencia_contato: string
  periodo: string
  servico: string
}

export default function AgendamentoConsultaPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    preferencia_contato: "whatsapp",
    periodo: "manha",
    servico: "",
  })

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao processar agendamento")
      }

      setFormSubmitted(true)
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        preferencia_contato: "whatsapp",
        periodo: "manha",
        servico: "",
      })
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      alert("Erro ao processar seu agendamento. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold">MzaSen</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#services" className="text-sm font-medium transition-colors hover:text-primary">
              Serviços
            </Link>
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              Sobre Nós
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Depoimentos
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/agendamento-consulta" className="hidden md:inline-flex">
              <Button className="bg-sage-600 hover:bg-sage-700">Agendar Consulta</Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-terra-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center gap-2 text-terra-600 hover:text-terra-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para a página inicial</span>
              </Link>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-terra-100 px-3 py-1 text-sm text-terra-700">
                  Agendamento
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-terra-900">
                  Agende Sua Consulta
                </h1>
                <p className="max-w-[900px] text-terra-700 md:text-xl/relaxed">
                  Dê o primeiro passo para uma vida mais saudável. Nossa consulta inicial.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl mt-12">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <div className="rounded-lg overflow-hidden mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=1470&auto=format&fit=crop"
                      width={500}
                      height={400}
                      alt="Consulta de Nutrição"
                      className="w-full object-cover"
                    />
                  </div>

                  <Card className="border-terra-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-terra-800">Por que agendar uma consulta?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                        <p className="text-terra-700">
                          Conheça nossa abordagem personalizada para nutrição e bem-estar
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                        <p className="text-terra-700">Avaliação inicial das suas necessidades e objetivos</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                        <p className="text-terra-700">Tire suas dúvidas com nossos especialistas</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                        <p className="text-terra-700">Sem compromisso ou obrigação de contratação</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                        <p className="text-terra-700">Receba dicas iniciais personalizadas para seus objetivos</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-terra-200 bg-white order-1 lg:order-2">
                  <CardHeader>
                    <CardTitle className="text-terra-800">Preencha o formulário</CardTitle>
                    <CardDescription className="text-terra-600">
                      Informe seus dados para agendarmos sua consulta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {formSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                        <div className="rounded-full bg-terra-100 p-3">
                          <CheckCircle2 className="h-8 w-8 text-terra-600" />
                        </div>
                        <h3 className="text-xl font-bold text-terra-800">Agendamento Recebido!</h3>
                        <p className="text-terra-700">
                          Entraremos em contato em breve para confirmar sua consulta.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="nome" className="text-terra-700">
                            Nome Completo
                          </Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => handleChange("nome", e.target.value)}
                            placeholder="Digite seu nome completo"
                            required
                            className="border-terra-300 focus-visible:ring-terra-500"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="email" className="text-terra-700">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="seu.email@exemplo.com"
                            required
                            className="border-terra-300 focus-visible:ring-terra-500"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="telefone" className="text-terra-700">
                            Telefone
                          </Label>
                          <Input
                            id="telefone"
                            value={formData.telefone}
                            onChange={(e) => handleChange("telefone", e.target.value)}
                            placeholder="(00) 00000-0000"
                            required
                            className="border-terra-300 focus-visible:ring-terra-500"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-terra-700">Preferência de Contato</Label>
                          <RadioGroup 
                            value={formData.preferencia_contato}
                            onValueChange={(value) => handleChange("preferencia_contato", value)}
                            className="flex flex-wrap gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="whatsapp" id="whatsapp" className="text-terra-600" />
                              <Label htmlFor="whatsapp" className="text-terra-700">
                                WhatsApp
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="telefone" id="telefone" className="text-terra-600" />
                              <Label htmlFor="telefone" className="text-terra-700">
                                Telefone
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="email-option" className="text-terra-600" />
                              <Label htmlFor="email-option" className="text-terra-700">
                                Email
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-terra-700">Melhor período para consulta</Label>
                          <RadioGroup 
                            value={formData.periodo}
                            onValueChange={(value) => handleChange("periodo", value)}
                            className="flex flex-wrap gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="manha" id="manha" className="text-terra-600" />
                              <Label htmlFor="manha" className="text-terra-700">
                                Manhã
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="tarde" id="tarde" className="text-terra-600" />
                              <Label htmlFor="tarde" className="text-terra-700">
                                Tarde
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="noite" id="noite" className="text-terra-600" />
                              <Label htmlFor="noite" className="text-terra-700">
                                Noite
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="servico" className="text-terra-700">
                            Serviço de Interesse
                          </Label>
                          <Select 
                            value={formData.servico}
                            onValueChange={(value) => handleChange("servico", value)}
                          >
                            <SelectTrigger className="border-terra-300 focus-visible:ring-terra-500">
                              <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nutricao-clinica">Nutrição Clínica</SelectItem>
                              <SelectItem value="bem-estar">Bem-Estar Integral</SelectItem>
                              <SelectItem value="nutricao-esportiva">Nutrição Esportiva</SelectItem>
                              <SelectItem value="reeducacao-alimentar">Reeducação Alimentar</SelectItem>
                              <SelectItem value="emagrecimento">Nutrição para Emagrecimento</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-terra-600 hover:bg-terra-700"
                          disabled={isLoading}
                        >
                          {isLoading ? "Enviando..." : "Agendar Consulta"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-terra-900">Como funciona?</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 mt-6">
                  <div className="flex flex-col items-center p-4">
                    <div className="rounded-full bg-terra-100 p-3 mb-4">
                      <Calendar className="h-6 w-6 text-terra-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-terra-800">1. Agendamento</h3>
                    <p className="text-terra-700 text-center">
                      Preencha o formulário e escolha o melhor horário para você.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <div className="rounded-full bg-terra-100 p-3 mb-4">
                      <Clock className="h-6 w-6 text-terra-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-terra-800">2. Consulta</h3>
                    <p className="text-terra-700 text-center">
                      Converse com nossos especialistas sobre seus objetivos e necessidades.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <div className="rounded-full bg-terra-100 p-3 mb-4">
                      <CheckCircle2 className="h-6 w-6 text-terra-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-terra-800">3. Plano Personalizado</h3>
                    <p className="text-terra-700 text-center">
                      Receba uma proposta de plano nutricional personalizado para suas necessidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-sage-200 bg-sage-50 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold text-sage-800">MzaSen</span>
          </Link>
          <p className="text-center text-sm text-sage-600 md:text-left">
            &copy; {new Date().getFullYear()} MzaSen. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/termos" className="text-sage-600 hover:text-sage-800">
              Termos
            </Link>
            <Link href="/privacidade" className="text-sage-600 hover:text-sage-800">
              Privacidade
            </Link>
            <Link href="/cookies" className="text-sage-600 hover:text-sage-800">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

