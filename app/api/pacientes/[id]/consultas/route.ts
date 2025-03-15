import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Primeiro busca o paciente para pegar email
    const paciente = await prisma.user.findUnique({
      where: {
        id: params.id,
        tipo: "paciente"
      },
      select: {
        email: true
      }
    })

    if (!paciente) {
      return NextResponse.json(
        { error: "Paciente não encontrado" },
        { status: 404 }
      )
    }

    // Busca as consultas do paciente pelo email
    const consultas = await prisma.agendamento.findMany({
      where: {
        email: paciente.email
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        data: true,
        horario: true,
        status: true,
        servico: true
      }
    })

    return NextResponse.json({ consultas })
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    )
  }
} 