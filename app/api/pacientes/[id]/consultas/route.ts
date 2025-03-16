import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { format, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"

export async function GET(request: Request) {
  try {
    // Extrai o ID do paciente da URL
    const id = request.url.split("/pacientes/")[1].split("/consultas")[0]
    console.log("ID do paciente recebido:", id)

    // Primeiro busca o paciente para pegar email
    const paciente = await prisma.user.findUnique({
      where: {
        id: id,
        tipo: "paciente"
      },
      select: {
        id: true,
        email: true
      }
    })

    console.log("Paciente encontrado:", paciente)

    if (!paciente) {
      return NextResponse.json(
        { error: "Paciente não encontrado" },
        { status: 404 }
      )
    }

    // Busca todas as consultas do paciente
    const consultasDB = await prisma.agendamento.findMany({
      where: {
        email: paciente.email // Usando o email do paciente
      },
      orderBy: [
        { data: "desc" },
        { horario: "desc" }
      ],
      select: {
        id: true,
        data: true,
        horario: true,
        status: true,
        servico: true,
        profissional: true
      }
    })

    console.log("Consultas encontradas:", consultasDB)

    // Formata as datas das consultas
    const consultas = consultasDB.map(consulta => {
      let dataFormatada = "Data não definida"
      
      if (consulta.data) {
        try {
          const data = new Date(consulta.data)
          if (isValid(data)) {
            dataFormatada = format(data, "dd/MM/yyyy", { locale: ptBR })
          }
        } catch (error) {
          console.error("Erro ao formatar data:", error)
        }
      }

      return {
        id: consulta.id,
        data: dataFormatada,
        horario: consulta.horario || "Horário não definido",
        status: consulta.status,
        servico: consulta.servico,
        profissional: consulta.profissional
      }
    })

    console.log("Consultas formatadas:", consultas)

    return NextResponse.json({ consultas })
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar consultas" },
      { status: 500 }
    )
  }
} 