import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ agendamentos })
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    return NextResponse.json({ 
      error: "Erro ao buscar agendamentos" 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Gera uma data e horário para o agendamento
    const hoje = new Date()
    const dataAgendamento = hoje.toISOString().split('T')[0]
    const horarioAgendamento = `${hoje.getHours()}:${hoje.getMinutes()}`
    
    const agendamento = await prisma.agendamento.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        preferencia_contato: data.preferencia_contato,
        periodo: data.periodo,
        servico: data.servico,
        data: dataAgendamento,
        horario: horarioAgendamento,
        profissional: "Dra. Maria Zanetti" // Valor padrão
      },
    })

    return NextResponse.json({ 
      message: "Agendamento criado com sucesso",
      agendamento 
    }, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return NextResponse.json({ 
      error: "Erro ao processar o agendamento" 
    }, { status: 500 })
  }
} 