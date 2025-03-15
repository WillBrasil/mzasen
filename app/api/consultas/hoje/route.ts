import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

export async function GET() {
  try {
    const hoje = format(new Date(), "yyyy-MM-dd")

    const consultas = await prisma.agendamento.findMany({
      where: {
        status: {
          not: "cancelada"
        }
      },
      select: {
        id: true,
        nome: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "asc"
      }
    })

    // Filtra as consultas do dia atual
    const consultasHoje = consultas.filter(consulta => 
      format(consulta.createdAt, "yyyy-MM-dd") === hoje
    )

    const consultasFormatadas = consultasHoje.map(consulta => ({
      id: consulta.id,
      paciente: consulta.nome,
      horario: format(consulta.createdAt, "HH:mm"),
      status: consulta.status
    }))

    return NextResponse.json({
      consultas: consultasFormatadas
    })
  } catch (error) {
    console.error("Erro ao buscar consultas do dia:", error)
    return NextResponse.json(
      { error: "Erro ao buscar consultas do dia" },
      { status: 500 }
    )
  }
} 