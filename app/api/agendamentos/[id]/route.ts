import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id

  if (!id) {
    return NextResponse.json(
      { error: "ID do agendamento é obrigatório" },
      { status: 400 }
    )
  }

  try {
    const data = await request.json()
    const agendamento = await prisma.agendamento.update({
      where: { id },
      data: {
        status: data.status,
      },
    })

    return NextResponse.json({ 
      message: "Status atualizado com sucesso",
      agendamento 
    })
  } catch (error) {
    console.error("Erro ao atualizar status:", error)
    return NextResponse.json({ 
      error: "Erro ao atualizar status do agendamento" 
    }, { status: 500 })
  }
} 