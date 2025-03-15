import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Heart, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BemEstarIntegralPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-terra-900">Bem-Estar Integral</h1>
                <p className="max-w-[900px] text-terra-700 md:text-xl/relaxed">
                  Programas que integram alimentação, atividade física e gerenciamento do estresse para uma vida
                  equilibrada.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 lg:grid-cols-2">
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=1374&auto=format&fit=crop"
                  width={800}
                  height={600}
                  alt="Bem-Estar Integral"
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-terra-900">Uma abordagem holística para sua saúde</h2>
                <p className="text-terra-700">
                  Nosso programa de Bem-Estar Integral reconhece que a verdadeira saúde vai além da alimentação.
                  Integramos nutrição, atividade física, gerenciamento do estresse e hábitos de vida saudáveis para
                  criar uma abordagem personalizada que trata você como um todo.
                </p>

                <h3 className="text-xl font-semibold text-terra-800 mt-6">Nosso programa inclui:</h3>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Plano Alimentar Balanceado</h4>
                      <p className="text-terra-600">
                        Desenvolvido para nutrir seu corpo, dar energia e apoiar seu bem-estar geral, adaptado às suas
                        necessidades específicas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Orientação para Atividades Físicas</h4>
                      <p className="text-terra-600">
                        Recomendações personalizadas de exercícios que se encaixam no seu estilo de vida, nível de
                        condicionamento e preferências pessoais.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Técnicas de Gerenciamento de Estresse</h4>
                      <p className="text-terra-600">
                        Práticas de mindfulness, respiração e relaxamento para reduzir o estresse e melhorar sua saúde
                        mental e emocional.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terra-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-terra-800">Acompanhamento Multidisciplinar</h4>
                      <p className="text-terra-600">
                        Acesso a uma equipe de profissionais que trabalham juntos para apoiar todos os aspectos da sua
                        saúde e bem-estar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-terra-900 text-center mb-8">Benefícios do Bem-Estar Integral</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-terra-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                      <Heart className="h-6 w-6 text-terra-600" />
                    </div>
                    <CardTitle className="text-terra-800">Mais Energia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terra-600">
                      Sinta-se mais disposto e energizado para aproveitar todas as atividades do seu dia a dia.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-terra-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                      <Heart className="h-6 w-6 text-terra-600" />
                    </div>
                    <CardTitle className="text-terra-800">Redução do Estresse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terra-600">
                      Aprenda a lidar melhor com as pressões do dia a dia e encontre mais equilíbrio emocional.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-terra-200 bg-white">
                  <CardHeader className="pb-2">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                      <Heart className="h-6 w-6 text-terra-600" />
                    </div>
                    <CardTitle className="text-terra-800">Melhor Qualidade de Vida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terra-600">
                      Experimente uma melhora geral na sua saúde física e mental, resultando em uma vida mais plena e
                      satisfatória.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-terra-900">Comece sua jornada de bem-estar hoje</h2>
              <p className="text-terra-700 max-w-[600px] mx-auto mb-6">
                Agende uma consulta com nossos especialistas e descubra como nosso programa de Bem-Estar Integral pode
                transformar sua vida.
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

