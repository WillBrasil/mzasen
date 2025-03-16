import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Users, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"

export default function NutricaoEsportivaPage() {
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
          <Link href="/consulta-gratuita">
            <Button className="bg-sage-600 hover:bg-sage-700">Agendar Consulta</Button>
          </Link>
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-900">Nutrição Esportiva</h1>
                <p className="max-w-[900px] text-sky-700 md:text-xl/relaxed">
                  Planos nutricionais específicos para atletas e praticantes de atividades físicas, otimizando
                  performance e recuperação.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 lg:grid-cols-2">
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição Esportiva"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-sky-900">
                  Potencialize seu desempenho com nutrição especializada
                </h2>
                <p className="text-sky-700">
                  A Nutrição Esportiva é uma área especializada que foca nas necessidades nutricionais específicas de
                  atletas e praticantes de atividades físicas. Nossos especialistas trabalham para otimizar seu
                  desempenho, melhorar a recuperação e ajudar você a atingir seus objetivos esportivos através de
                  estratégias nutricionais baseadas em evidências científicas.
                </p>

                <h3 className="text-xl font-semibold text-sky-800 mt-6">Nosso programa inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Avaliação de Composição Corporal</h4>
                      <p className="text-sky-600">
                        Análise detalhada da sua composição corporal para determinar massa muscular, percentual de
                        gordura e outras métricas importantes para o desempenho.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Plano Nutricional para Performance</h4>
                      <p className="text-sky-600">
                        Estratégias alimentares personalizadas para otimizar energia, resistência, força e recuperação,
                        adaptadas ao seu esporte ou atividade física.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Suplementação Adequada</h4>
                      <p className="text-sky-600">
                        Recomendações baseadas em evidências sobre suplementos que podem beneficiar seu desempenho,
                        quando necessário e apropriado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sky-800">Periodização Nutricional</h4>
                      <p className="text-sky-600">
                        Ajustes estratégicos na sua alimentação de acordo com as fases de treinamento, competição e
                        recuperação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-sky-900 text-center mb-8">Para quem é indicado</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-sky-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                      <Users className="h-6 w-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-800">Atletas Profissionais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-600">
                      Estratégias nutricionais avançadas para maximizar performance em competições e otimizar a
                      recuperação.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sky-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                      <Users className="h-6 w-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-800">Praticantes Recreativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-600">
                      Orientações para melhorar o desempenho em atividades físicas regulares e alcançar objetivos de
                      condicionamento físico.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sky-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                      <Users className="h-6 w-6 text-sky-600" />
                    </div>
                    <CardTitle className="text-sky-800">Atletas em Desenvolvimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-600">
                      Suporte nutricional para jovens atletas, focando no crescimento saudável e desenvolvimento de
                      habilidades esportivas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-sky-900">Eleve seu desempenho ao próximo nível</h2>
              <p className="text-sky-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas em Nutrição Esportiva e descubra como a alimentação
                adequada pode transformar seus resultados.
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
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-sage-600" />
            <span className="text-xl font-bold text-sage-800">MzaSen</span>
          </div>
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

