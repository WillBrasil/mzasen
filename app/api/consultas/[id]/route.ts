import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: Request) {
  try {
    const id = request.url.split("/consultas/")[1]
    const { status } = await request.json()

    // Valida o status
    if (!["pendente", "confirmada", "cancelada"].includes(status)) {
      return NextResponse.json(
        { error: "Status inválido" },
        { status: 400 }
      )
    }

    // Busca a consulta para verificar se existe
    const consultaExistente = await prisma.agendamento.findUnique({
      where: { id }
    })

    if (!consultaExistente) {
      return NextResponse.json(
        { error: "Consulta não encontrada" },
        { status: 404 }
      )
    }

    // Atualiza o status da consulta
    const consulta = await prisma.agendamento.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        data: true,
        horario: true,
        status: true,
        email: true,
        servico: true
      }
    })

    return NextResponse.json({ consulta })
  } catch (error) {
    console.error("Erro ao atualizar consulta:", error)
    return NextResponse.json(
      { error: "Erro ao atualizar consulta" },
      { status: 500 }
    )
  }
} 