import Link from "next/link"
import Image from "next/image"
import { Leaf, Mail } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui"

export default function EquipePage() {
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
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-terra-100 px-3 py-1 text-sm text-terra-700">
                  Nossa Equipe
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-terra-900">
                  Conheça Nossos Especialistas
                </h1>
                <p className="max-w-[900px] text-terra-700 md:text-xl/relaxed">
                  Nossa equipe é formada por profissionais altamente qualificados e apaixonados por nutrição e
                  bem-estar.
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-terra-200 bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1374&auto=format&fit=crop"
                      width={200}
                      height={200}
                      alt="Dra. Ana Silva"
                      className="rounded-full object-cover h-40 w-40"
                    />
                  </div>
                  <CardTitle className="text-terra-800">Dra. Ana Silva</CardTitle>
                  <CardDescription className="text-terra-600">Nutricionista Clínica</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-terra-700 mb-4">
                    Especialista em Nutrição Clínica com mais de 10 anos de experiência. Mestre em Ciências da Nutrição
                    e especialista em tratamento de doenças crônicas através da alimentação.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Nutrição Clínica
                    </span>
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Doenças Crônicas
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="border-terra-600 text-terra-700 hover:bg-terra-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatar
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-terra-200 bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop"
                      width={200}
                      height={200}
                      alt="Dr. Carlos Oliveira"
                      className="rounded-full object-cover h-40 w-40"
                    />
                  </div>
                  <CardTitle className="text-terra-800">Dr. Carlos Oliveira</CardTitle>
                  <CardDescription className="text-terra-600">Nutricionista Esportivo</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-terra-700 mb-4">
                    Especialista em Nutrição Esportiva com experiência no acompanhamento de atletas profissionais.
                    Doutor em Fisiologia do Exercício e pesquisador na área de suplementação esportiva.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Nutrição Esportiva
                    </span>
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Suplementação
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="border-terra-600 text-terra-700 hover:bg-terra-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatar
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-terra-200 bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop"
                      width={200}
                      height={200}
                      alt="Dra. Mariana Costa"
                      className="rounded-full object-cover h-40 w-40"
                    />
                  </div>
                  <CardTitle className="text-terra-800">Dra. Mariana Costa</CardTitle>
                  <CardDescription className="text-terra-600">Nutricionista Comportamental</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-terra-700 mb-4">
                    Especialista em Nutrição Comportamental e Mindful Eating. Mestre em Psicologia da Alimentação e
                    especialista em transtornos alimentares e reeducação alimentar.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Comportamental
                    </span>
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Mindful Eating
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="border-terra-600 text-terra-700 hover:bg-terra-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatar
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-terra-200 bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop"
                      width={200}
                      height={200}
                      alt="Dr. Rafael Santos"
                      className="rounded-full object-cover h-40 w-40"
                    />
                  </div>
                  <CardTitle className="text-terra-800">Dr. Rafael Santos</CardTitle>
                  <CardDescription className="text-terra-600">Nutricionista Materno-Infantil</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-terra-700 mb-4">
                    Especialista em Nutrição Materno-Infantil. Mestre em Nutrição Pediátrica e especialista em
                    alimentação para gestantes, lactantes e introdução alimentar.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Materno-Infantil
                    </span>
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Pediatria
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="border-terra-600 text-terra-700 hover:bg-terra-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatar
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-terra-200 bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=1376&auto=format&fit=crop"
                      width={200}
                      height={200}
                      alt="Dra. Juliana Lima"
                      className="rounded-full object-cover h-40 w-40"
                    />
                  </div>
                  <CardTitle className="text-terra-800">Dra. Juliana Lima</CardTitle>
                  <CardDescription className="text-terra-600">Nutricionista Funcional</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-terra-700 mb-4">
                    Especialista em Nutrição Funcional. Mestre em Bioquímica Nutricional e especialista em tratamento de
                    alergias alimentares e doenças autoimunes através da alimentação.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Funcional
                    </span>
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Alergias
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="border-terra-600 text-terra-700 hover:bg-terra-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatar
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-terra-200 bg-white">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1374&auto=format&fit=crop"
                      width={200}
                      height={200}
                      alt="Dr. Pedro Almeida"
                      className="rounded-full object-cover h-40 w-40"
                    />
                  </div>
                  <CardTitle className="text-terra-800">Dr. Pedro Almeida</CardTitle>
                  <CardDescription className="text-terra-600">Nutricionista para Longevidade</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-terra-700 mb-4">
                    Especialista em Nutrição para Longevidade. Doutor em Envelhecimento Saudável e pesquisador na área
                    de nutrientes anti-inflamatórios e prevenção de doenças crônicas.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Longevidade
                    </span>
                    <span className="inline-block rounded-full bg-terra-100 px-3 py-1 text-xs text-terra-700">
                      Anti-inflamatória
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="border-terra-600 text-terra-700 hover:bg-terra-100">
                    <Mail className="mr-2 h-4 w-4" />
                    Contatar
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4 text-terra-900">Trabalhe com os melhores profissionais</h2>
              <p className="text-terra-700 max-w-[600px] mx-auto mb-6">
                Nossa equipe está pronta para ajudar você a alcançar seus objetivos de saúde e bem-estar com atendimento
                personalizado e baseado em evidências científicas.
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

