import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const paciente = await prisma.user.findUnique({
      where: {
        id: params.id,
        tipo: "paciente"
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        dataNascimento: true,
        tipo: true
      }
    })

    if (!paciente) {
      return NextResponse.json(
        { error: "Paciente não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ paciente })
  } catch (error) {
    console.error("Erro ao buscar paciente:", error)
    return NextResponse.json(
      { error: "Erro ao buscar paciente" },
      { status: 500 }
    )
  }
} 