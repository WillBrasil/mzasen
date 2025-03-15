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
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, senha: string) => Promise<void>
  register: (userData: Omit<User, "id"> & { senha: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, senha: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulando uma chamada à API
      // TODO: Implementar chamada real à API
      if (email === "teste@exemplo.com" && senha === "123456") {
        const mockUser: User = {
          id: "1",
          nome: "Usuário Teste",
          email,
          cpf: "000.000.000-00",
          telefone: "(00) 00000-0000",
          dataNascimento: "1990-01-01"
        }
        
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        router.push("/painel")
      } else {
        throw new Error("Credenciais inválidas")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id"> & { senha: string }) => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulando uma chamada à API
      // TODO: Implementar chamada real à API
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData
      }
      
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      router.push("/painel")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
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