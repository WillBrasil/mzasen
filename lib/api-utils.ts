import { verifyJWT } from './jwt'
import { prisma } from './prisma'

interface User {
  id: string
  nome: string
  email: string
  tipo: string
  telefone?: string
}

/**
 * Obtém o usuário autenticado a partir da requisição
 */
export async function getUser(request: Request): Promise<User | null> {
  // Obter o token do cabeçalho Authorization
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
    
    // Opcionalmente, buscar dados atualizados do usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        telefone: true
      }
    })
    
    if (!user) return null
    
    return user
  } catch (error) {
    console.error("Erro ao verificar token:", error)
    return null
  }
} 