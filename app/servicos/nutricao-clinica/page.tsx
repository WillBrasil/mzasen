import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Apple, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function NutricaoClinicaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-olive-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/servicos" className="flex items-center gap-2 text-olive-600 hover:text-olive-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para Serviços</span>
              </Link>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-olive-100 px-3 py-1 text-sm text-olive-700">
                  Serviço Especializado
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-olive-900">Nutrição Clínica</h1>
                <p className="max-w-[900px] text-olive-700 md:text-xl/relaxed">
                  Avaliação nutricional completa e planos alimentares personalizados para melhorar sua saúde.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição Clínica"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-olive-900">Como funciona a Nutrição Clínica?</h2>
                <p className="text-olive-700">
                  A Nutrição Clínica é uma área especializada que utiliza princípios científicos para avaliar,
                  diagnosticar e tratar problemas de saúde relacionados à alimentação. Nossos nutricionistas clínicos
                  trabalham com você para desenvolver um plano alimentar personalizado que atenda às suas necessidades
                  específicas.
                </p>

                <h3 className="text-xl font-semibold text-olive-800 mt-6">Nosso processo inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Avaliação Antropométrica Completa</h4>
                      <p className="text-olive-600">
                        Medição precisa de peso, altura, circunferências e composição corporal para estabelecer uma
                        linha de base e monitorar seu progresso.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Análise de Exames Laboratoriais</h4>
                      <p className="text-olive-600">
                        Interpretação de exames de sangue e outros testes para identificar deficiências nutricionais e
                        condições que podem ser melhoradas através da alimentação.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Plano Alimentar Personalizado</h4>
                      <p className="text-olive-600">
                        Desenvolvimento de um plano alimentar adaptado às suas necessidades, preferências, estilo de
                        vida e objetivos de saúde.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Acompanhamento Contínuo</h4>
                      <p className="text-olive-600">
                        Consultas regulares para ajustar seu plano, responder perguntas e garantir que você esteja
                        progredindo em direção aos seus objetivos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-olive-900 text-center mb-8">Condições que podemos ajudar</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card className="border-olive-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <Apple className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Controle de Peso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Estratégias personalizadas para perda ou ganho de peso saudável, com foco em mudanças sustentáveis
                      de hábitos.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-olive-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <Apple className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Doenças Crônicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Manejo nutricional para diabetes, hipertensão, colesterol elevado, doenças cardíacas e outras
                      condições crônicas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-olive-200 bg-white sm:col-span-2 md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <Apple className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Saúde Digestiva</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Abordagens nutricionais para síndrome do intestino irritável, doença inflamatória intestinal,
                      refluxo e outras condições digestivas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-olive-900">Pronto para transformar sua saúde?</h2>
              <p className="text-olive-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas em Nutrição Clínica e dê o primeiro passo para uma vida
                mais saudável.
              </p>
              <Link href="/consulta-gratuita">
                <Button size="lg" className="bg-olive-600 hover:bg-olive-700">
                  Agendar Consulta
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

