import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signJWT } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    console.log("Recebida solicitação de login")
    const body = await request.json()
    const { email, senha } = body
    console.log("Tentativa de login para:", email)

    if (!email || !senha) {
      console.log("Erro: E-mail ou senha não fornecidos")
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        tipo: true,
        senha: true
      }
    })

    console.log("Usuário encontrado:", user ? "Sim" : "Não")

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(senha, user.senha)
    console.log("Senha correta:", passwordMatch ? "Sim" : "Não")

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos' },
        { status: 401 }
      )
    }

    // Gera o token JWT
    const token = signJWT({
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    })

    // Remove a senha do objeto de retorno
    const { senha: _, ...userWithoutPassword } = user

    console.log("Login bem-sucedido para:", email, "Tipo:", user.tipo)
    
    return NextResponse.json({
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o login' },
      { status: 500 }
    )
  }
} 