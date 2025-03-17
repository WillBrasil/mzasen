"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, ChevronLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { 
  validateCPF, 
  validatePhone, 
  validateEmail, 
  validatePassword,
  validateDate,
  formatCPF,
  formatPhone
} from "@/lib/utils/validation"
import { Alert, AlertDescription } from "@/components/ui"

export default function RegistroPage() {
  const { login, loading } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  })
  const [formErrors, setFormErrors] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  })

  const validateForm = () => {
    const errors = {
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      dataNascimento: "",
      senha: "",
      confirmarSenha: "",
    }

    if (!formData.nome) {
      errors.nome = "Nome é obrigatório"
    } else if (formData.nome.length < 3) {
      errors.nome = "Nome deve ter pelo menos 3 caracteres"
    }

    if (!formData.email) {
      errors.email = "E-mail é obrigatório"
    } else if (!validateEmail(formData.email)) {
      errors.email = "E-mail inválido"
    }

    if (!formData.cpf) {
      errors.cpf = "CPF é obrigatório"
    } else if (!validateCPF(formData.cpf)) {
      errors.cpf = "CPF inválido"
    }

    if (!formData.telefone) {
      errors.telefone = "Telefone é obrigatório"
    } else if (!validatePhone(formData.telefone)) {
      errors.telefone = "Telefone inválido"
    }

    if (!formData.dataNascimento) {
      errors.dataNascimento = "Data de nascimento é obrigatória"
    } else if (!validateDate(formData.dataNascimento)) {
      errors.dataNascimento = "Data de nascimento inválida"
    }

    if (!formData.senha) {
      errors.senha = "Senha é obrigatória"
    } else if (!validatePassword(formData.senha)) {
      errors.senha = "Senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número"
    }

    if (!formData.confirmarSenha) {
      errors.confirmarSenha = "Confirmação de senha é obrigatória"
    } else if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem"
    }

    setFormErrors(errors)
    return !Object.values(errors).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setIsRegistering(true)
      setError(null)
      
      const { confirmarSenha, ...userData } = formData
      
      // Faz a chamada para a API de registro
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      const registerData = await registerResponse.json()
      
      if (!registerResponse.ok) {
        throw new Error(registerData.error || 'Erro ao registrar')
      }
      
      // Login automático após registro bem-sucedido
      const loginResult = await login(userData.email, userData.senha)
      if (!loginResult.success) {
        setError("Registro realizado, mas erro ao fazer login automático")
      }
    } catch (err) {
      console.error("Erro ao registrar:", err)
      setError(err instanceof Error ? err.message : "Erro ao registrar")
    } finally {
      setIsRegistering(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Aplica formatação para CPF e telefone
    if (name === "cpf") {
      formattedValue = formatCPF(value)
    } else if (name === "telefone") {
      formattedValue = formatPhone(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
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
            <Link href="/login" className="text-sm font-medium text-sage-600 hover:text-sage-700">
              Já tem conta? Faça login
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
                  Crie sua conta
                </h1>
                <p className="max-w-[600px] text-sage-700 md:text-xl/relaxed">
                  Registre-se para ter acesso às suas informações nutricionais e acompanhar seu progresso.
                </p>
              </div>
            </div>

            <Card className="mx-auto max-w-lg mt-8">
              <CardHeader>
                <CardTitle>Registro de Paciente</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para criar sua conta
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
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Digite seu nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className={formErrors.nome ? "border-red-500" : ""}
                    />
                    {formErrors.nome && (
                      <p className="text-sm text-red-500">{formErrors.nome}</p>
                    )}
                  </div>

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
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleChange}
                      required
                      maxLength={14}
                      className={formErrors.cpf ? "border-red-500" : ""}
                    />
                    {formErrors.cpf && (
                      <p className="text-sm text-red-500">{formErrors.cpf}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      maxLength={15}
                      className={formErrors.telefone ? "border-red-500" : ""}
                    />
                    {formErrors.telefone && (
                      <p className="text-sm text-red-500">{formErrors.telefone}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      name="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      required
                      className={formErrors.dataNascimento ? "border-red-500" : ""}
                    />
                    {formErrors.dataNascimento && (
                      <p className="text-sm text-red-500">{formErrors.dataNascimento}</p>
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

                  <div className="grid gap-2">
                    <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                    <div className="relative">
                      <Input
                        id="confirmarSenha"
                        name="confirmarSenha"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        required
                        className={formErrors.confirmarSenha ? "border-red-500" : ""}
                      />
                    </div>
                    {formErrors.confirmarSenha && (
                      <p className="text-sm text-red-500">{formErrors.confirmarSenha}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-sage-600 hover:bg-sage-700"
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Criando conta..." : "Criar Conta"}
                  </Button>

                  <p className="text-center text-sm text-sage-600">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-sage-700 hover:underline">
                      Faça login
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