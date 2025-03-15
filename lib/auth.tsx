"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  nome: string
  email: string
  cpf: string
  telefone: string
  dataNascimento: string
  tipo: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, senha: string) => Promise<void>
  register: (userData: Omit<User, "id" | "tipo"> & { senha: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há um token salvo
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (token && storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      
      // Verifica a rota atual
      const path = window.location.pathname
      
      // Só redireciona se estiver na home, login ou registro
      if (path === "/" || path === "/login" || path === "/registro") {
        if (user.tipo === "profissional") {
          router.push("/painel-profissional")
        } else {
          router.push("/painel-paciente")
        }
      }
    }
    
    setLoading(false)
  }, [router])

  const login = async (email: string, senha: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login')
      }

      setUser(data.user)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      
      // Redireciona baseado no tipo de usuário
      if (data.user.tipo === "profissional") {
        router.push("/painel-profissional")
      } else {
        router.push("/painel-paciente")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id" | "tipo"> & { senha: string }) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao registrar')
      }

      setUser(data.user)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/painel-paciente")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
} 