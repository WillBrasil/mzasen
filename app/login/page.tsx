"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, ChevronLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { validateEmail } from "@/lib/utils/validation"
import { Alert, AlertDescription } from "@/components/ui"

export default function LoginPage() {
  const { login, loading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })
  const [formErrors, setFormErrors] = useState({
    email: "",
    senha: "",
  })

  const validateForm = () => {
    const errors = {
      email: "",
      senha: "",
    }

    if (!formData.email) {
      errors.email = "E-mail é obrigatório"
    } else if (!validateEmail(formData.email)) {
      errors.email = "E-mail inválido"
    }

    if (!formData.senha) {
      errors.senha = "Senha é obrigatória"
    }

    setFormErrors(errors)
    return !Object.values(errors).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await login(formData.email, formData.senha)
    } catch (err) {
      console.error("Erro ao fazer login:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpa o erro do campo quando o usuário começa a digitar
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

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
            <Link href="/registro" className="text-sm font-medium text-sage-600 hover:text-sage-700">
              Criar conta
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sage-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center gap-2 text-sage-600 hover:text-sage-700">
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar para a página inicial</span>
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sage-900">
                  Acesse sua conta
                </h1>
                <p className="max-w-[600px] text-sage-700 md:text-xl/relaxed">
                  Entre para acessar suas informações nutricionais e acompanhar seu progresso.
                </p>
              </div>
            </div>

            <Card className="mx-auto max-w-lg mt-8">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Digite suas credenciais para acessar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="senha">Senha</Label>
                    <div className="relative">
                      <Input
                        id="senha"
                        name="senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                        className={formErrors.senha ? "border-red-500" : ""}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-600 hover:text-sage-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {formErrors.senha && (
                      <p className="text-sm text-red-500">{formErrors.senha}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href="/esqueci-senha" className="text-sm text-sage-600 hover:text-sage-700">
                      Esqueceu sua senha?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-sage-600 hover:bg-sage-700"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>

                  <p className="text-center text-sm text-sage-600">
                    Não tem uma conta?{" "}
                    <Link href="/registro" className="text-sage-700 hover:underline">
                      Registre-se
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
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