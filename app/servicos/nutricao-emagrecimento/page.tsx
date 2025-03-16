import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, BarChart, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { MobileMenu } from "@/components/mobile-menu"

export default function NutricaoEmagrecimentoPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-terra-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/servicos" className="flex items-center gap-2 text-terra-600 hover:text-terra-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para Serviços</span>
              </Link>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-terra-100 px-3 py-1 text-sm text-terra-700">
                  Serviço Especializado
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-terra-900">
                  Nutrição para Emagrecimento
                </h1>
                <p className="max-w-[900px] text-terra-700 md:text-xl/relaxed">
                  Programas específicos para perda de peso saudável e sustentável, com foco em resultados duradouros.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição para Emagrecimento"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-terra-900">Emagrecimento saudável e duradouro</h2>
                <p className="text-terra-700">
                  Nossa abordagem para emagrecimento vai além da simples redução de calorias. Desenvolvemos um programa
                  personalizado que considera seu metabolismo, histórico de saúde, preferências alimentares e estilo de
                  vida, para garantir resultados efetivos e duradouros.
                </p>
                <p className="text-terra-700">
                  Acreditamos que o emagrecimento saudável deve ocorrer de forma gradual e sustentável, preservando a
                  massa muscular, a saúde metabólica e, principalmente, sua relação com a comida.
                </p>

                <h3 className="text-xl font-semibold text-terra-800 mt-6">Nosso programa inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Avaliação Metabólica</h4>
                      <p className="text-terra-600">
                        Análise detalhada do seu metabolismo, composição corporal e fatores que podem estar dificultando
                        a perda de peso.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Plano Alimentar para Déficit Calórico</h4>
                      <p className="text-terra-600">
                        Desenvolvimento de um plano alimentar personalizado que cria um déficit calórico adequado, sem
                        restrições extremas que comprometem a adesão e os resultados.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Estratégias para Controle da Fome</h4>
                      <p className="text-terra-600">
                        Técnicas eficazes para gerenciar a fome e a saciedade, incluindo escolhas alimentares
                        estratégicas e padrões de refeição otimizados.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Acompanhamento de Resultados</h4>
                      <p className="text-terra-600">
                        Monitoramento regular do seu progresso, com ajustes no plano conforme necessário para garantir
                        resultados contínuos e sustentáveis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-terra-900 text-center mb-8">Diferenciais do nosso programa</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card className="border-terra-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                      <BarChart className="h-6 w-6 text-terra-600" />
                    </div>
                    <CardTitle className="text-terra-800">Abordagem Individualizada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terra-600">
                      Cada plano é único, desenvolvido especificamente para suas necessidades, preferências e objetivos.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-terra-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                      <BarChart className="h-6 w-6 text-terra-600" />
                    </div>
                    <CardTitle className="text-terra-800">Sem Restrições Extremas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terra-600">
                      Nossos planos são flexíveis e incluem todos os grupos alimentares, permitindo até mesmo suas
                      comidas favoritas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-terra-200 bg-white sm:col-span-2 md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                      <BarChart className="h-6 w-6 text-terra-600" />
                    </div>
                    <CardTitle className="text-terra-800">Foco na Manutenção</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terra-600">
                      Desenvolvemos estratégias específicas para a fase de manutenção, garantindo que os resultados
                      sejam duradouros.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-terra-900">Comece sua jornada de transformação</h2>
              <p className="text-terra-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas e descubra como nosso programa de emagrecimento pode ajudar
                você a alcançar seus objetivos de forma saudável e sustentável.
              </p>
              <Link href="/consulta-gratuita">
                <Button size="lg" className="bg-terra-600 hover:bg-terra-700">
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

