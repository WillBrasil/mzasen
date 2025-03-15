import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const id = request.url.split("/pacientes/")[1].split("/consultas")[0]

    // Primeiro busca o paciente para pegar email
    const paciente = await prisma.user.findUnique({
      where: {
        id: id,
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
        email: paciente.email,
        status: {
          not: "cancelada"
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    const consultasFormatadas = consultas.map(consulta => ({
      id: consulta.id,
      data: consulta.data,
      horario: consulta.horario,
      status: consulta.status,
      servico: consulta.servico
    }))

    return NextResponse.json({ consultas: consultasFormatadas })
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    )
  }
} 