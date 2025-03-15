import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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

    // Busca todas as consultas do paciente
    const consultasDB = await prisma.agendamento.findMany({
      where: {
        email: paciente.email
      },
      orderBy: {
        data: "desc"
      }
    })

    // Formata as datas das consultas
    const consultas = consultasDB.map(consulta => ({
      id: consulta.id,
      data: consulta.data ? format(new Date(consulta.data), "dd/MM/yyyy", { locale: ptBR }) : "Data não definida",
      horario: consulta.horario || "Horário não definido",
      status: consulta.status,
      servico: consulta.servico
    }))

    return NextResponse.json({ consultas })
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    )
  }
} 