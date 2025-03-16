import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, ShieldCheck, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { MobileMenu } from "@/components/mobile-menu"

export default function NutricaoCondicoesEspecificasPage() {
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
            <Link href="/consulta-gratuita" className="hidden md:inline-flex">
              <Button className="bg-sage-600 hover:bg-sage-700">Agendar Consulta</Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-olive-900">
                  Nutrição para Condições Específicas
                </h1>
                <p className="max-w-[900px] text-olive-700 md:text-xl/relaxed">
                  Acompanhamento nutricional especializado para pessoas com condições de saúde específicas.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição para Condições Específicas"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-olive-900">Nutrição como parte do tratamento</h2>
                <p className="text-olive-700">
                  A alimentação adequada desempenha um papel fundamental no tratamento e controle de diversas condições
                  de saúde. Nosso serviço de Nutrição para Condições Específicas oferece acompanhamento especializado
                  para pessoas que necessitam de cuidados nutricionais diferenciados devido a condições médicas.
                </p>
                <p className="text-olive-700">
                  Trabalhamos em conjunto com sua equipe médica para desenvolver um plano alimentar personalizado que
                  complementa seu tratamento, ajuda a controlar sintomas e melhora sua qualidade de vida.
                </p>

                <h3 className="text-xl font-semibold text-olive-800 mt-6">Condições que atendemos:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Diabetes</h4>
                      <p className="text-olive-600">
                        Planos alimentares para controle glicêmico, adaptados ao tipo de diabetes, medicação e estilo de
                        vida, com foco na prevenção de complicações.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Hipertensão</h4>
                      <p className="text-olive-600">
                        Estratégias nutricionais para controle da pressão arterial, com atenção especial ao consumo de
                        sódio e alimentos que favorecem a saúde cardiovascular.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Doenças Gastrointestinais</h4>
                      <p className="text-olive-600">
                        Abordagem nutricional para condições como síndrome do intestino irritável, doença de Crohn,
                        colite ulcerativa, refluxo gastroesofágico e outras.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Alergias e Intolerâncias Alimentares</h4>
                      <p className="text-olive-600">
                        Identificação de alergias e intolerâncias, com desenvolvimento de planos alimentares que evitam
                        os alérgenos sem comprometer o valor nutricional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-olive-900 text-center mb-8">Nossa abordagem</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card className="border-olive-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <ShieldCheck className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Avaliação Detalhada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Análise completa do histórico médico, exames laboratoriais e necessidades nutricionais
                      específicas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-olive-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <ShieldCheck className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Plano Personalizado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Desenvolvimento de estratégias nutricionais adaptadas à sua condição, preferências e estilo de
                      vida.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-olive-200 bg-white sm:col-span-2 md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <ShieldCheck className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Acompanhamento Contínuo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Monitoramento regular do progresso, com ajustes no plano conforme necessário e em coordenação com
                      sua equipe médica.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-olive-900">Cuide da sua saúde de forma integral</h2>
              <p className="text-olive-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas e descubra como a nutrição adequada pode ajudar no controle
                da sua condição e na melhoria da sua qualidade de vida.
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

