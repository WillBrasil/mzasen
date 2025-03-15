import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PrivacidadePage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">
                  Política de Privacidade
                </h1>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed">
                  Saiba como coletamos, usamos e protegemos suas informações pessoais.
                </p>
              </div>
            </div>

            <div className="prose prose-sage max-w-4xl mx-auto">
              <h2 className="text-sage-800">1. Introdução</h2>
              <p className="text-sage-700">
                A MzaSen está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
                coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nossos
                serviços.
              </p>

              <h2 className="text-sage-800">2. Informações que Coletamos</h2>
              <p className="text-sage-700">Podemos coletar os seguintes tipos de informações:</p>
              <ul className="text-sage-700">
                <li>
                  <strong>Informações Pessoais:</strong> Nome, endereço, e-mail, telefone, data de nascimento e gênero.
                </li>
                <li>
                  <strong>Informações de Saúde:</strong> Histórico médico, condições de saúde, medicamentos, alergias
                  alimentares e preferências alimentares.
                </li>
                <li>
                  <strong>Informações de Pagamento:</strong> Dados de cartão de crédito, informações bancárias e
                  histórico de transações.
                </li>
                <li>
                  <strong>Informações de Uso:</strong> Como você interage com nosso site, incluindo páginas visitadas,
                  tempo gasto e ações realizadas.
                </li>
              </ul>

              <h2 className="text-sage-800">3. Como Usamos Suas Informações</h2>
              <p className="text-sage-700">Utilizamos suas informações para:</p>
              <ul className="text-sage-700">
                <li>Fornecer e personalizar nossos serviços de nutrição e bem-estar;</li>
                <li>Processar pagamentos e gerenciar sua conta;</li>
                <li>Comunicar-nos com você sobre consultas, serviços e promoções;</li>
                <li>Melhorar nossos serviços e desenvolver novos recursos;</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>

              <h2 className="text-sage-800">4. Compartilhamento de Informações</h2>
              <p className="text-sage-700">Podemos compartilhar suas informações com:</p>
              <ul className="text-sage-700">
                <li>Profissionais de saúde envolvidos em seu atendimento;</li>
                <li>Prestadores de serviços que nos ajudam a operar nosso negócio;</li>
                <li>Autoridades governamentais, quando exigido por lei.</li>
              </ul>
              <p className="text-sage-700">
                Não vendemos ou alugamos suas informações pessoais a terceiros para fins de marketing.
              </p>

              <h2 className="text-sage-800">5. Segurança de Dados</h2>
              <p className="text-sage-700">
                Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações
                contra acesso não autorizado, uso indevido ou divulgação.
              </p>

              <h2 className="text-sage-800">6. Seus Direitos</h2>
              <p className="text-sage-700">Você tem o direito de:</p>
              <ul className="text-sage-700">
                <li>Acessar, corrigir ou excluir suas informações pessoais;</li>
                <li>Retirar seu consentimento para o processamento de seus dados;</li>
                <li>Opor-se ao processamento de seus dados para determinados fins;</li>
                <li>Solicitar a portabilidade de seus dados.</li>
              </ul>

              <h2 className="text-sage-800">7. Retenção de Dados</h2>
              <p className="text-sage-700">
                Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta
                política, a menos que um período de retenção mais longo seja exigido por lei.
              </p>

              <h2 className="text-sage-800">8. Alterações nesta Política</h2>
              <p className="text-sage-700">
                Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre
                disponível em nosso site.
              </p>

              <h2 className="text-sage-800">9. Contato</h2>
              <p className="text-sage-700">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do e-mail
                privacidade@mzasen.com.br.
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
            <Link href="/termos" className="text-sage-600 hover:text-sage-800">
              Termos
            </Link>
            <Link href="/privacidade" className="text-sage-600 hover:text-sage-800 font-bold">
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

