import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteContext {
  params: {
    id: string
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const data = await request.json()
    const { id } = context.params

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