import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const consultas = await prisma.agendamento.findMany({
      where: {
        status: {
          not: "cancelada"
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      consultas: consultas.map(consulta => ({
        id: consulta.id,
        data: consulta.data,
        horario: consulta.horario,
        status: consulta.status,
        paciente: consulta.nome
      }))
    })
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    )
  }
} 