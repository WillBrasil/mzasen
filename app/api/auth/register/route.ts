import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signJWT } from '@/lib/jwt'
import { validateCPF, validateEmail, validatePhone } from '@/lib/utils/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, email, cpf, telefone, dataNascimento, senha } = body

    // Validações
    if (!nome || !email || !cpf || !telefone || !dataNascimento || !senha) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      )
    }

    if (!validateCPF(cpf)) {
      return NextResponse.json(
        { error: 'CPF inválido' },
        { status: 400 }
      )
    }

    if (!validatePhone(telefone)) {
      return NextResponse.json(
        { error: 'Telefone inválido' },
        { status: 400 }
      )
    }

    // Verifica se já existe usuário com mesmo email ou CPF
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { cpf }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuário já cadastrado com este e-mail ou CPF' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10)

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        cpf,
        telefone,
        dataNascimento,
        senha: hashedPassword
      }
    })

    // Gera o token JWT
    const token = signJWT({
      id: user.id,
      email: user.email
    })

    // Remove a senha do objeto de retorno
    const { senha: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o registro' },
      { status: 500 }
    )
  }
} 