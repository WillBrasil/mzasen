import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui"

export default function TermosPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sage-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Termos de Uso</h1>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed">
                  Leia atentamente os termos e condições de uso dos nossos serviços.
                </p>
              </div>
            </div>

            <div className="prose prose-sage max-w-4xl mx-auto">
              <h2 className="text-sage-800">1. Aceitação dos Termos</h2>
              <p className="text-sage-700">
                Ao acessar e utilizar os serviços da MzaSen, você concorda em cumprir e estar sujeito a estes Termos de
                Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos
                serviços.
              </p>

              <h2 className="text-sage-800">2. Descrição dos Serviços</h2>
              <p className="text-sage-700">
                A MzaSen oferece serviços de consultoria em nutrição e bem-estar, incluindo, mas não se limitando a,
                consultas nutricionais, planos alimentares personalizados, acompanhamento nutricional e orientações
                sobre hábitos saudáveis.
              </p>

              <h2 className="text-sage-800">3. Responsabilidades do Usuário</h2>
              <p className="text-sage-700">Ao utilizar nossos serviços, você concorda em:</p>
              <ul className="text-sage-700">
                <li>Fornecer informações precisas e completas sobre sua saúde e histórico médico;</li>
                <li>Seguir as orientações e recomendações fornecidas pelos nossos profissionais;</li>
                <li>Informar sobre quaisquer alterações em sua condição de saúde;</li>
                <li>Utilizar os serviços de forma ética e legal;</li>
                <li>Não compartilhar seu plano alimentar personalizado com terceiros.</li>
              </ul>

              <h2 className="text-sage-800">4. Limitações de Responsabilidade</h2>
              <p className="text-sage-700">
                Os serviços da MzaSen não substituem o aconselhamento, diagnóstico ou tratamento médico. Recomendamos
                que você consulte seu médico antes de iniciar qualquer programa nutricional, especialmente se você tiver
                condições médicas pré-existentes.
              </p>

              <h2 className="text-sage-800">5. Propriedade Intelectual</h2>
              <p className="text-sage-700">
                Todo o conteúdo disponibilizado em nosso site e materiais, incluindo textos, gráficos, logotipos,
                imagens e software, é de propriedade da MzaSen ou de seus fornecedores de conteúdo e está protegido por
                leis de direitos autorais.
              </p>

              <h2 className="text-sage-800">6. Política de Cancelamento</h2>
              <p className="text-sage-700">
                Consultas podem ser canceladas ou remarcadas com pelo menos 24 horas de antecedência. Cancelamentos com
                menos de 24 horas de antecedência podem estar sujeitos a uma taxa de cancelamento.
              </p>

              <h2 className="text-sage-800">7. Alterações nos Termos</h2>
              <p className="text-sage-700">
                A MzaSen reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações
                entrarão em vigor imediatamente após sua publicação em nosso site. O uso contínuo dos nossos serviços
                após tais alterações constitui sua aceitação dos novos termos.
              </p>

              <h2 className="text-sage-800">8. Lei Aplicável</h2>
              <p className="text-sage-700">
                Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes termos será
                submetida à jurisdição exclusiva dos tribunais brasileiros.
              </p>

              <h2 className="text-sage-800">9. Contato</h2>
              <p className="text-sage-700">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail
                contato@mzasen.com.br.
              </p>

              <p className="text-sage-700 mt-8">Última atualização: {new Date().toLocaleDateString()}</p>
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
            <Link href="/termos" className="text-sage-600 hover:text-sage-800 font-bold">
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

