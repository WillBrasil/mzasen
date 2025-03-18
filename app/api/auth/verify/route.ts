import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação usando a função getUser
    const user = await getUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 401 }
      )
    }

    // Se necessário, buscar dados adicionais do usuário no banco de dados
    // Isso é útil se o token contiver apenas informações básicas
    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        telefone: true,
        // Não retorna a senha!
      },
    })

    if (!userDetails) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    // Retornar detalhes do usuário
    return NextResponse.json({ user: userDetails })
  } catch (error) {
    console.error("Erro na verificação do token:", error)
    return NextResponse.json(
      { error: "Erro ao verificar autenticação" },
      { status: 500 }
    )
  }
} 