import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui"

export default function CookiesPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Política de Cookies</h1>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed">
                  Entenda como utilizamos cookies e tecnologias semelhantes em nosso site.
                </p>
              </div>
            </div>

            <div className="prose prose-sage max-w-4xl mx-auto">
              <h2 className="text-sage-800">1. O que são Cookies?</h2>
              <p className="text-sage-700">
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou
                celular) quando você visita um site. Eles permitem que o site reconheça seu dispositivo e lembre-se de
                suas ações e preferências ao longo do tempo.
              </p>

              <h2 className="text-sage-800">2. Como Utilizamos Cookies</h2>
              <p className="text-sage-700">Utilizamos cookies para os seguintes fins:</p>
              <ul className="text-sage-700">
                <li>
                  <strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site, permitindo
                  recursos como navegação e acesso a áreas seguras.
                </li>
                <li>
                  <strong>Cookies de Preferências:</strong> Permitem que o site lembre de informações que mudam a forma
                  como o site se comporta ou aparece, como seu idioma preferido.
                </li>
                <li>
                  <strong>Cookies Estatísticos:</strong> Ajudam-nos a entender como os visitantes interagem com o site,
                  coletando e relatando informações anonimamente.
                </li>
                <li>
                  <strong>Cookies de Marketing:</strong> Utilizados para rastrear visitantes em sites. A intenção é
                  exibir anúncios relevantes e envolventes para o usuário individual.
                </li>
              </ul>

              <h2 className="text-sage-800">3. Tipos de Cookies que Utilizamos</h2>
              <p className="text-sage-700">Nosso site utiliza os seguintes tipos de cookies:</p>
              <ul className="text-sage-700">
                <li>
                  <strong>Cookies de Sessão:</strong> Temporários, são excluídos quando você fecha o navegador.
                </li>
                <li>
                  <strong>Cookies Persistentes:</strong> Permanecem no seu dispositivo até que expirem ou sejam
                  excluídos manualmente.
                </li>
                <li>
                  <strong>Cookies Próprios:</strong> Definidos por nós e usados para melhorar sua experiência em nosso
                  site.
                </li>
                <li>
                  <strong>Cookies de Terceiros:</strong> Definidos por nossos parceiros, como serviços de análise e
                  publicidade.
                </li>
              </ul>

              <h2 className="text-sage-800">4. Controle de Cookies</h2>
              <p className="text-sage-700">Você pode controlar e gerenciar cookies de várias maneiras:</p>
              <ul className="text-sage-700">
                <li>
                  Configurações do Navegador: A maioria dos navegadores permite que você veja quais cookies você tem e
                  exclua-os individualmente ou bloqueie cookies de sites específicos ou todos os sites.
                </li>
                <li>
                  Ferramentas de Opt-out: Muitos serviços de publicidade oferecem ferramentas para optar por não receber
                  publicidade direcionada.
                </li>
                <li>
                  Banner de Cookies: Nosso site exibe um banner de cookies que permite que você escolha quais tipos de
                  cookies deseja aceitar.
                </li>
              </ul>
              <p className="text-sage-700">
                Note que bloquear alguns tipos de cookies pode afetar sua experiência em nosso site e os serviços que
                podemos oferecer.
              </p>

              <h2 className="text-sage-800">5. Cookies de Terceiros</h2>
              <p className="text-sage-700">
                Nosso site pode incluir conteúdo de terceiros, como vídeos do YouTube, mapas do Google Maps, botões de
                compartilhamento de redes sociais e anúncios. Esses terceiros podem usar cookies, web beacons e
                tecnologias similares para coletar informações sobre você. Não temos controle sobre esses cookies.
              </p>

              <h2 className="text-sage-800">6. Alterações nesta Política</h2>
              <p className="text-sage-700">
                Podemos atualizar esta Política de Cookies periodicamente. A versão mais recente estará sempre
                disponível em nosso site.
              </p>

              <h2 className="text-sage-800">7. Contato</h2>
              <p className="text-sage-700">
                Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através do e-mail
                cookies@mzasen.com.br.
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
            <Link href="/privacidade" className="text-sage-600 hover:text-sage-800">
              Privacidade
            </Link>
            <Link href="/cookies" className="text-sage-600 hover:text-sage-800 font-bold">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

