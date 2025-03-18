"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { setCookie, getCookie, removeCookie } from "./cookies-utils"
import { verifyJWT } from "./jwt"

export interface User {
  id: string
  nome: string
  email: string
  tipo: "paciente" | "profissional"
  telefone?: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, senha: string) => Promise<boolean>
  register: (nome: string, email: string, senha: string, tipo: "paciente" | "profissional", telefone?: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}

export async function getUser(request: Request): Promise<User | null> {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  
  const token = authHeader.substring(7)
  try {
    const payload = verifyJWT(token) as any
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Função para verificar autenticação
  const checkAuth = async () => {
    // Evita chamadas duplicadas
    if (isCheckingAuth) return;
    setIsCheckingAuth(true);
    
    console.log("Verificando autenticação...")
    const token = getCookie("token")
    
    if (!token) {
      console.log("Nenhum token encontrado")
      setLoading(false)
      setIsCheckingAuth(false)
      
      // Se não há token e o usuário está tentando acessar uma rota protegida
      if (pathname?.startsWith("/painel-") && !pathname?.includes("/login")) {
        router.push("/login")
      }
      return
    }

    console.log("Token encontrado, verificando...")
    try {
      const response = await fetch("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Token válido, usuário:", data.user)
        setUser(data.user)
        
        // Redireciona se estiver na página de login ou na raiz
        if (pathname === "/login" || pathname === "/") {
          const redirectPath = data.user.tipo === "profissional" 
            ? "/painel-profissional" 
            : "/painel-paciente"
          console.log("Redirecionando para:", redirectPath)
          router.push(redirectPath)
        }
      } else {
        console.log("Token inválido, removendo...")
        removeCookie("token")
        setUser(null)
        
        // Se o usuário está tentando acessar uma rota protegida
        if (pathname?.startsWith("/painel-")) {
          router.push("/login")
        }
      }
    } catch (err) {
      console.error("Erro ao verificar token:", err)
      setError("Erro ao verificar autenticação")
    } finally {
      setLoading(false)
      setIsCheckingAuth(false)
    }
  }

  useEffect(() => {
    // Impede verificações quando já temos usuário confirmado
    // e estamos navegando em páginas protegidas
    if (user && pathname?.startsWith("/painel-")) {
      setLoading(false);
      return;
    }
    
    // Verifica autenticação quando a rota muda
    checkAuth();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const login = async (email: string, senha: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    console.log("Tentando login para:", email)
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()
      console.log("Resposta do login:", data)

      if (!response.ok) {
        console.log("Login falhou:", data.error || data.message)
        setError(data.error || data.message || "Falha ao efetuar login")
        setLoading(false)
        return false
      }

      // Salva o token em um cookie (7 dias de validade)
      setCookie("token", data.token, 7)
      setUser(data.user)
      
      // Redirecionar baseado no tipo do usuário
      const redirectPath = data.user.tipo === "profissional" 
        ? "/painel-profissional" 
        : "/painel-paciente"
      
      console.log("Login bem-sucedido, redirecionando para:", redirectPath)
      setTimeout(() => {
        router.push(redirectPath)
      }, 100);
      return true
    } catch (err) {
      console.error("Erro no login:", err)
      setError("Erro de conexão com o servidor")
      setLoading(false)
      return false
    }
  }

  const register = async (
    nome: string,
    email: string,
    senha: string,
    tipo: "paciente" | "profissional",
    telefone?: string
  ): Promise<boolean> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, tipo, telefone }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || data.message || "Falha ao registrar")
        setLoading(false)
        return false
      }

      // Salva o token em um cookie
      setCookie("token", data.token, 7)
      setUser(data.user)
      
      // Redirecionar baseado no tipo do usuário
      setTimeout(() => {
        router.push(data.user.tipo === "profissional" ? "/painel-profissional" : "/painel-paciente")
      }, 100);
      return true
    } catch (err) {
      setError("Erro de conexão com o servidor")
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    removeCookie("token")
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 