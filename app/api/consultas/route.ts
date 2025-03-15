import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    // TODO: Pegar o ID do usuário do token
    const consultas = await prisma.agendamento.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        data: true,
        horario: true,
        status: true,
        profissional: true
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