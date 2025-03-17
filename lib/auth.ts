import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { verifyToken } from "./jwt"

// Tipos
interface User {
  id: string
  nome: string
  email: string
  tipo: string
  telefone?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, senha: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

// Contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para usar a autenticação
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}

// Função para obter o usuário a partir da requisição (para APIs)
export async function getUser(request: Request): Promise<User | null> {
  // Obter o token do cookie Authorization
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  
  const token = authHeader.substring(7)
  try {
    const payload = await verifyToken(token)
    if (!payload || !payload.id) {
      return null
    }
    
    return {
      id: payload.id,
      nome: payload.nome,
      email: payload.email,
      tipo: payload.tipo,
      telefone: payload.telefone
    }
  } catch (error) {
    console.error("Erro ao verificar token:", error)
    return null
  }
}

// Provider de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado ao carregar
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setLoading(false)
          return
        }

        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          // Token inválido, remover do localStorage
          localStorage.removeItem("token")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, message: data.error || "Erro ao fazer login" }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return { success: false, message: "Erro ao conectar-se ao servidor" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 