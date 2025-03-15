import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Brain, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileMenu } from "@/components/mobile-menu"

export default function NutricaoComportamentalPage() {
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
                  Nutrição Comportamental
                </h1>
                <p className="max-w-[900px] text-olive-700 md:text-xl/relaxed">
                  Abordagem que integra aspectos psicológicos e comportamentais à nutrição para uma relação mais
                  saudável com a comida.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1470&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Nutrição Comportamental"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-olive-900">O que é Nutrição Comportamental?</h2>
                <p className="text-olive-700">
                  A Nutrição Comportamental é uma abordagem inovadora que vai além das recomendações nutricionais
                  tradicionais, integrando conhecimentos da psicologia, neurociência e ciências comportamentais para
                  compreender e transformar a relação das pessoas com a comida.
                </p>
                <p className="text-olive-700">
                  Esta abordagem reconhece que nossas escolhas alimentares são influenciadas por diversos fatores
                  emocionais, sociais, culturais e ambientais, e não apenas pelo conhecimento nutricional.
                </p>

                <h3 className="text-xl font-semibold text-olive-800 mt-6">Nossa abordagem inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Identificação de Gatilhos Emocionais</h4>
                      <p className="text-olive-600">
                        Reconhecimento dos fatores emocionais que influenciam suas escolhas alimentares, como estresse,
                        ansiedade, tédio ou celebrações.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Estratégias para Compulsão Alimentar</h4>
                      <p className="text-olive-600">
                        Desenvolvimento de técnicas eficazes para lidar com episódios de compulsão, identificando suas
                        causas e criando alternativas saudáveis.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Desenvolvimento de Autocompaixão</h4>
                      <p className="text-olive-600">
                        Cultivo de uma atitude mais gentil e compreensiva consigo mesmo, substituindo a autocrítica por
                        aceitação e cuidado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-olive-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-olive-800">Técnicas de Mindful Eating</h4>
                      <p className="text-olive-600">
                        Prática da alimentação consciente, que envolve prestar atenção plena ao momento da refeição,
                        reconhecendo sabores, texturas e sinais de fome e saciedade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-olive-900 text-center mb-8">Para quem é indicada</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card className="border-olive-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <Brain className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Pessoas com Compulsão Alimentar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Abordagem especializada para quem enfrenta episódios de compulsão alimentar ou comer emocional.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-olive-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <Brain className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Histórico de Dietas Restritivas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Pessoas que já tentaram diversas dietas sem sucesso duradouro e desejam uma abordagem diferente.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-olive-200 bg-white sm:col-span-2 md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                      <Brain className="h-6 w-6 text-olive-600" />
                    </div>
                    <CardTitle className="text-olive-800">Relação Difícil com a Comida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-olive-600">
                      Quem busca desenvolver uma relação mais saudável e prazerosa com a alimentação, livre de culpa e
                      ansiedade.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-olive-900">Transforme sua relação com a comida</h2>
              <p className="text-olive-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas em Nutrição Comportamental e descubra como desenvolver uma
                relação mais saudável e equilibrada com a alimentação.
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

