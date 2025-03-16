import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Clock, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { MobileMenu } from "@/components/mobile-menu"

export default function NutricaoLongevidadePage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sage-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/servicos" className="flex items-center gap-2 text-sage-600 hover:text-sage-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para Serviços</span>
              </Link>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-sage-100 px-3 py-1 text-sm text-sage-700">
                  Serviço Especializado
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">
                  Nutrição para Longevidade
                </h1>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed">
                  Estratégias nutricionais para envelhecimento saudável e qualidade de vida em todas as fases da vida.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição para Longevidade"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-sage-900">Nutrição como pilar da longevidade</h2>
                <p className="text-sage-700">
                  A ciência da longevidade tem demonstrado que a nutrição é um dos principais fatores que influenciam
                  não apenas quanto tempo vivemos, mas principalmente a qualidade de vida durante o envelhecimento.
                  Nosso programa de Nutrição para Longevidade utiliza os mais recentes avanços científicos para promover
                  um envelhecimento saudável.
                </p>
                <p className="text-sage-700">
                  Através de estratégias nutricionais específicas, ajudamos a otimizar a função celular, reduzir a
                  inflamação crônica e fortalecer os mecanismos de reparo do corpo, contribuindo para uma vida mais
                  longa e com mais saúde.
                </p>

                <h3 className="text-xl font-semibold text-sage-800 mt-6">Nosso programa inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sage-800">Alimentos Anti-inflamatórios</h4>
                      <p className="text-sage-600">
                        Identificação e incorporação de alimentos com propriedades anti-inflamatórias, fundamentais para
                        prevenir doenças crônicas associadas ao envelhecimento.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sage-800">Nutrientes para Saúde Cerebral</h4>
                      <p className="text-sage-600">
                        Estratégias nutricionais focadas na preservação da função cognitiva e prevenção de doenças
                        neurodegenerativas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sage-800">Prevenção de Doenças Crônicas</h4>
                      <p className="text-sage-600">
                        Abordagem nutricional para reduzir o risco de doenças cardiovasculares, diabetes, osteoporose e
                        outras condições associadas ao envelhecimento.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sage-800">Suplementação Específica</h4>
                      <p className="text-sage-600">
                        Recomendações personalizadas de suplementos quando necessário, baseadas em evidências
                        científicas e nas necessidades individuais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-sage-900 text-center mb-8">Benefícios para sua saúde</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card className="border-sage-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100">
                      <Clock className="h-6 w-6 text-sage-600" />
                    </div>
                    <CardTitle className="text-sage-800">Vitalidade e Energia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sage-600">
                      Otimização do metabolismo energético para maior disposição e vitalidade no dia a dia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100">
                      <Clock className="h-6 w-6 text-sage-600" />
                    </div>
                    <CardTitle className="text-sage-800">Saúde Celular</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sage-600">
                      Nutrientes que apoiam os mecanismos de reparo celular e proteção contra danos oxidativos.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200 bg-white sm:col-span-2 md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100">
                      <Clock className="h-6 w-6 text-sage-600" />
                    </div>
                    <CardTitle className="text-sage-800">Qualidade de Vida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sage-600">
                      Estratégias para manter independência, mobilidade e bem-estar em todas as fases da vida.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-sage-900">Invista na sua longevidade</h2>
              <p className="text-sage-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas e descubra como a nutrição pode ser sua aliada para uma
                vida longa e saudável.
              </p>
              <Link href="/consulta-gratuita">
                <Button size="lg" className="bg-sage-600 hover:bg-sage-700">
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

