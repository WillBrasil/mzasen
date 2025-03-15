import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Apple, Users, Calendar, ArrowRight, Mail, Phone, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Importe os componentes SiteHeader e SiteFooter
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Seção Hero */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-sage-50 to-sage-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-sage-800">
                    Nutrição e Bem-Estar para uma Vida Melhor
                  </h1>
                  <p className="max-w-[600px] text-sage-700 md:text-xl">
                    Transforme sua saúde com nossos especialistas em nutrição. Planos personalizados para seus objetivos
                    e necessidades.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/consulta-gratuita">
                    <Button size="lg" className="bg-sage-600 hover:bg-sage-700 w-full sm:w-auto">
                      Consulta Gratuita
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/servicos" className="mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-sage-600 text-sage-700 hover:bg-sage-100 w-full sm:w-auto"
                    >
                      Conheça Nossos Serviços
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop"
                  width={550}
                  height={550}
                  alt="Nutrição e Bem-Estar"
                  className="rounded-lg object-cover w-full max-w-[400px] lg:max-w-[550px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção Serviços - Note o id="services" para a âncora */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-olive-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-olive-100 px-3 py-1 text-sm text-olive-700">
                  Nossos Serviços
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-olive-900">
                  Soluções Completas em Nutrição e Bem-Estar
                </h2>
                <p className="max-w-[900px] text-olive-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Oferecemos uma variedade de serviços personalizados para atender às suas necessidades específicas.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="relative overflow-hidden border-olive-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-olive-100">
                    <Apple className="h-6 w-6 text-olive-600" />
                  </div>
                  <CardTitle className="text-olive-800">Nutrição Clínica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-olive-600">
                    Avaliação nutricional completa e planos alimentares personalizados para melhorar sua saúde.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-clinica">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-olive-700 hover:text-olive-900 hover:bg-olive-100"
                    >
                      Saiba mais <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="relative overflow-hidden border-olive-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-terra-100">
                    <Heart className="h-6 w-6 text-terra-600" />
                  </div>
                  <CardTitle className="text-olive-800">Bem-Estar Integral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-olive-600">
                    Programas que integram alimentação, atividade física e gerenciamento do estresse.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/bem-estar-integral">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-olive-700 hover:text-olive-900 hover:bg-olive-100"
                    >
                      Saiba mais <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="relative overflow-hidden border-olive-200 bg-white sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <CardTitle className="text-olive-800">Nutrição Esportiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-olive-600">
                    Planos nutricionais específicos para atletas e praticantes de atividades físicas.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/servicos/nutricao-esportiva">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-olive-700 hover:text-olive-900 hover:bg-olive-100"
                    >
                      Saiba mais <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção Sobre - Note o id="about" para a âncora */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-terra-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1374&auto=format&fit=crop"
                  width={500}
                  height={500}
                  alt="Nossa Equipe"
                  className="rounded-lg object-cover w-full max-w-[400px]"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="inline-block rounded-lg bg-terra-100 px-3 py-1 text-sm text-terra-700 w-fit">
                  Sobre Nós
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-terra-900">
                  Especialistas em Nutrição e Bem-Estar
                </h2>
                <p className="text-terra-700 md:text-xl/relaxed">
                  Nossa equipe é formada por nutricionistas e especialistas em bem-estar com ampla experiência e
                  formação acadêmica. Trabalhamos com uma abordagem personalizada, entendendo que cada pessoa é única e
                  possui necessidades específicas.
                </p>
                <p className="text-terra-700 md:text-xl/relaxed">
                  Nosso compromisso é proporcionar um atendimento humanizado, baseado em evidências científicas, para
                  ajudar nossos clientes a alcançarem seus objetivos de saúde e qualidade de vida.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/equipe">
                    <Button size="lg" className="bg-terra-600 hover:bg-terra-700 w-full sm:w-auto">
                      Conheça Nossa Equipe
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Depoimentos - Note o id="testimonials" para a âncora */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-sky-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-sky-100 px-3 py-1 text-sm text-sky-700">Depoimentos</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-sky-900">
                  O Que Nossos Clientes Dizem
                </h2>
                <p className="max-w-[900px] text-sky-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Histórias reais de pessoas que transformaram sua saúde e bem-estar com nosso apoio.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-sky-200 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-sky-100 p-2">
                      <Image
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop"
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-sky-800">Ana Silva</CardTitle>
                      <CardDescription className="text-sky-600">Cliente há 1 ano</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    "Os planos nutricionais personalizados mudaram completamente minha relação com a comida. Perdi peso
                    de forma saudável e me sinto com muito mais energia."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-sky-200 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-sky-100 p-2">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop"
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-sky-800">Carlos Oliveira</CardTitle>
                      <CardDescription className="text-sky-600">Cliente há 6 meses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    "Como atleta, precisava de uma nutrição específica para melhorar meu desempenho. Os resultados
                    superaram minhas expectativas. Recomendo a todos!"
                  </p>
                </CardContent>
              </Card>
              <Card className="border-sky-200 bg-white md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-sky-100 p-2">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop"
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-sky-800">Mariana Costa</CardTitle>
                      <CardDescription className="text-sky-600">Cliente há 2 anos</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">
                    "Após anos lutando contra problemas digestivos, finalmente encontrei uma abordagem que funciona. A
                    equipe é extremamente profissional e atenciosa."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Outras seções */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sage-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-sage-100 px-3 py-1 text-sm text-sage-700 w-fit">
                  Agende Sua Consulta
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-sage-900">
                  Comece Sua Jornada para uma Vida Mais Saudável
                </h2>
                <p className="text-sage-700 md:text-xl/relaxed">
                  Oferecemos uma consulta inicial gratuita para entender suas necessidades e objetivos. Nossos
                  especialistas irão desenvolver um plano personalizado para você.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/consulta-gratuita">
                    <Button size="lg" className="gap-2 bg-sage-600 hover:bg-sage-700 w-full sm:w-auto">
                      <Calendar className="h-5 w-5" />
                      Agendar Agora
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1455894127589-22f75500213a?q=80&w=1374&auto=format&fit=crop"
                  width={600}
                  height={400}
                  alt="Consulta de Nutrição"
                  className="rounded-lg object-cover w-full max-w-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção Contato - Note o id="contact" para a âncora */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-olive-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-olive-100 px-3 py-1 text-sm text-olive-700">Contato</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-olive-900">
                  Entre em Contato Conosco
                </h2>
                <p className="max-w-[900px] text-olive-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Estamos à disposição para responder suas dúvidas e ajudar você a iniciar sua jornada.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 grid-cols-1 lg:grid-cols-2">
              <Card className="border-olive-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-olive-800">Envie uma Mensagem</CardTitle>
                  <CardDescription className="text-olive-600">
                    Preencha o formulário abaixo e entraremos em contato em breve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none text-olive-700">
                        Nome
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-olive-300 bg-white px-3 py-2 text-sm text-olive-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive-500"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none text-olive-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-olive-300 bg-white px-3 py-2 text-sm text-olive-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive-500"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none text-olive-700">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-olive-300 bg-white px-3 py-2 text-sm text-olive-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive-500"
                        placeholder="Como podemos ajudar?"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-olive-600 hover:bg-olive-700">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-6 mt-8 lg:mt-0">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-olive-100 p-2">
                    <Phone className="h-6 w-6 text-olive-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-olive-800">Telefone</h3>
                    <p className="text-olive-600">(11) 9999-9999</p>
                    <p className="text-olive-600">(11) 8888-8888</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-olive-100 p-2">
                    <Mail className="h-6 w-6 text-olive-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-olive-800">Email</h3>
                    <p className="text-olive-600">contato@mzasen.com.br</p>
                    <p className="text-olive-600">atendimento@mzasen.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-olive-100 p-2">
                    <MapPin className="h-6 w-6 text-olive-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-olive-800">Endereço</h3>
                    <p className="text-olive-600">Av. Paulista, 1000 - Bela Vista</p>
                    <p className="text-olive-600">São Paulo - SP, 01310-100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

