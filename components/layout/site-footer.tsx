import Link from "next/link"
import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
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
  )
}

