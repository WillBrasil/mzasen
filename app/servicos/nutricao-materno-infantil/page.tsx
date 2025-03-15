import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Baby, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileMenu } from "@/components/mobile-menu"

export default function NutricaoMaternoInfantilPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/servicos" className="flex items-center gap-2 text-sky-600 hover:text-sky-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para Serviços</span>
              </Link>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-sky-100 px-3 py-1 text-sm text-sky-700">
                  Serviço Especializado
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-900">
                  Nutrição Materno-Infantil
                </h1>
                <p className="max-w-[900px] text-sky-700 md:text-xl/relaxed">
                  Acompanhamento nutricional especializado para gestantes, lactantes e crianças em todas as fases de
                  desenvolvimento.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição Materno-Infantil"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-sky-900">Nutrição para cada fase da vida</h2>
                <p className="text-sky-700">
                  A nutrição adequada durante a gestação, amamentação e primeira infância é fundamental para o
                  desenvolvimento saudável do bebê e para o bem-estar da mãe. Nosso serviço de Nutrição Materno-Infantil
                  oferece acompanhamento especializado para cada uma dessas fases tão importantes.
                </p>
                <p className="text-sky-700">
                  Com uma abordagem baseada em evidências científicas e adaptada às necessidades individuais, ajudamos a
                  garantir que mães e crianças recebam todos os nutrientes necessários para um desenvolvimento ótimo.
                </p>

                <h3 className="text-xl font-semibold text-sky-800 mt-6">Nosso acompanhamento inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Nutrição na Gestação</h4>
                      <p className="text-sky-600">
                        Planos alimentares personalizados para cada trimestre da gestação, garantindo o aporte adequado
                        de nutrientes para o desenvolvimento do bebê e saúde da mãe.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Suporte à Amamentação</h4>
                      <p className="text-sky-600">
                        Orientação nutricional para o período de lactação, favorecendo a produção e qualidade do leite
                        materno e a recuperação pós-parto.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Introdução Alimentar</h4>
                      <p className="text-sky-600">
                        Orientação para a introdução dos primeiros alimentos, respeitando o desenvolvimento do bebê e
                        promovendo hábitos alimentares saudáveis desde o início.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Nutrição Infantil</h4>
                      <p className="text-sky-600">
                        Acompanhamento nutricional para crianças em todas as fases de crescimento, com foco no
                        desenvolvimento saudável e prevenção de carências nutricionais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-sky-900 text-center mb-8">Benefícios do acompanhamento</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card className="border-sky-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                      <Baby className="h-6 w-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-800">Desenvolvimento Saudável</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-600">
                      Nutrição adequada para garantir o desenvolvimento físico e cognitivo ideal do bebê desde a
                      gestação.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sky-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                      <Baby className="h-6 w-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-800">Prevenção de Complicações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-600">
                      Redução do risco de complicações na gestação e promoção de uma recuperação pós-parto mais rápida.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sky-200 bg-white sm:col-span-2 md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                      <Baby className="h-6 w-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-800">Hábitos Alimentares Saudáveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-600">
                      Formação de preferências alimentares saudáveis desde cedo, prevenindo problemas futuros como
                      seletividade alimentar.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-sky-900">Cuide da saúde da sua família</h2>
              <p className="text-sky-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas em Nutrição Materno-Infantil e garanta o melhor início de
                vida para seu filho.
              </p>
              <Link href="/consulta-gratuita">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
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

