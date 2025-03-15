import Link from "next/link"
import {
  ChevronLeft,
  Leaf,
  Apple,
  Heart,
  Users,
  Utensils,
  Brain,
  BarChart,
  Baby,
  Clock,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileMenu } from "@/components/mobile-menu"

export default function ServicosPage() {
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
              <Link href="/" className="flex items-center gap-2 text-olive-600 hover:text-olive-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para a página inicial</span>
              </Link>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-olive-100 px-3 py-1 text-sm text-olive-700">
                  Nossos Serviços
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-olive-900">
                  Soluções Completas em Nutrição e Bem-Estar
                </h1>
                <p className="max-w-[900px] text-olive-700 md:text-xl/relaxed">
                  Conheça todos os nossos serviços personalizados para atender às suas necessidades específicas.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="relative overflow-hidden border-olive-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                    <Apple className="h-6 w-6 text-olive-600" />
                  </div>
                  <CardTitle className="text-olive-800">Nutrição Clínica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-olive-600 mb-4">
                    Avaliação nutricional completa e planos alimentares personalizados para melhorar sua saúde.
                  </p>
                  <ul className="space-y-2 text-sm text-olive-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Avaliação antropométrica</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Análise de exames laboratoriais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Plano alimentar personalizado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Acompanhamento contínuo</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-clinica">
                    <Button variant="outline" className="w-full border-olive-600 text-olive-700 hover:bg-olive-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-terra-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                    <Heart className="h-6 w-6 text-terra-600" />
                  </div>
                  <CardTitle className="text-terra-800">Bem-Estar Integral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-terra-600 mb-4">
                    Programas que integram alimentação, atividade física e gerenciamento do estresse.
                  </p>
                  <ul className="space-y-2 text-sm text-terra-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Plano alimentar balanceado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Orientação para atividades físicas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Técnicas de gerenciamento de estresse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Acompanhamento multidisciplinar</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/bem-estar-integral">
                    <Button variant="outline" className="w-full border-terra-600 text-terra-700 hover:bg-terra-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-sky-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <CardTitle className="text-sky-800">Nutrição Esportiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-600 mb-4">
                    Planos nutricionais específicos para atletas e praticantes de atividades físicas.
                  </p>
                  <ul className="space-y-2 text-sm text-sky-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Avaliação de composição corporal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Plano nutricional para performance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Suplementação adequada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Periodização nutricional</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-esportiva">
                    <Button variant="outline" className="w-full border-sky-600 text-sky-700 hover:bg-sky-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-sage-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100">
                    <Utensils className="h-6 w-6 text-sage-600" />
                  </div>
                  <CardTitle className="text-sage-800">Reeducação Alimentar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-600 mb-4">
                    Aprenda a desenvolver uma relação saudável com a comida e hábitos alimentares sustentáveis.
                  </p>
                  <ul className="space-y-2 text-sm text-sage-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Identificação de padrões alimentares</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Estratégias para mudança de hábitos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Alimentação consciente</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Suporte contínuo para manutenção</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/reeducacao-alimentar">
                    <Button variant="outline" className="w-full border-sage-600 text-sage-700 hover:bg-sage-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-olive-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                    <Brain className="h-6 w-6 text-olive-600" />
                  </div>
                  <CardTitle className="text-olive-800">Nutrição Comportamental</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-olive-600 mb-4">
                    Abordagem que integra aspectos psicológicos e comportamentais à nutrição.
                  </p>
                  <ul className="space-y-2 text-sm text-olive-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Identificação de gatilhos emocionais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Estratégias para compulsão alimentar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Desenvolvimento de autocompaixão</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Técnicas de mindful eating</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-comportamental">
                    <Button variant="outline" className="w-full border-olive-600 text-olive-700 hover:bg-olive-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-terra-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                    <BarChart className="h-6 w-6 text-terra-600" />
                  </div>
                  <CardTitle className="text-terra-800">Nutrição para Emagrecimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-terra-600 mb-4">
                    Programas específicos para perda de peso saudável e sustentável.
                  </p>
                  <ul className="space-y-2 text-sm text-terra-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Avaliação metabólica</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Plano alimentar para déficit calórico</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Estratégias para controle da fome</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-terra-600"></div>
                      <span>Acompanhamento de resultados</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-emagrecimento">
                    <Button variant="outline" className="w-full border-terra-600 text-terra-700 hover:bg-terra-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-sky-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                    <Baby className="h-6 w-6 text-sky-600" />
                  </div>
                  <CardTitle className="text-sky-800">Nutrição Materno-Infantil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-600 mb-4">Acompanhamento nutricional para gestantes, lactantes e crianças.</p>
                  <ul className="space-y-2 text-sm text-sky-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Nutrição na gestação</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Suporte à amamentação</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Introdução alimentar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-600"></div>
                      <span>Nutrição infantil</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-materno-infantil">
                    <Button variant="outline" className="w-full border-sky-600 text-sky-700 hover:bg-sky-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-sage-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sage-100">
                    <Clock className="h-6 w-6 text-sage-600" />
                  </div>
                  <CardTitle className="text-sage-800">Nutrição para Longevidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-600 mb-4">
                    Estratégias nutricionais para envelhecimento saudável e qualidade de vida.
                  </p>
                  <ul className="space-y-2 text-sm text-sage-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Alimentos anti-inflamatórios</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Nutrientes para saúde cerebral</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Prevenção de doenças crônicas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-600"></div>
                      <span>Suplementação específica</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-longevidade">
                    <Button variant="outline" className="w-full border-sage-600 text-sage-700 hover:bg-sage-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-olive-200 bg-white md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                    <ShieldCheck className="h-6 w-6 text-olive-600" />
                  </div>
                  <CardTitle className="text-olive-800">Nutrição para Condições Específicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-olive-600 mb-4">
                    Acompanhamento nutricional para pessoas com condições de saúde específicas.
                  </p>
                  <ul className="space-y-2 text-sm text-olive-700">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Diabetes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Hipertensão</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Doenças gastrointestinais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-olive-600"></div>
                      <span>Alergias e intolerâncias alimentares</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-condicoes-especificas">
                    <Button variant="outline" className="w-full border-olive-600 text-olive-700 hover:bg-olive-100">
                      Saiba mais
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-olive-900">Pronto para começar sua jornada?</h2>
              <p className="text-olive-700 max-w-[600px] mx-auto mb-6">
                Nossa equipe está pronta para ajudar você a alcançar seus objetivos de saúde e bem-estar.
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

