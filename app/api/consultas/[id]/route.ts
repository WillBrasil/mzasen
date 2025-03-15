import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: Request) {
  try {
    const id = request.url.split("/consultas/")[1]
    const { status } = await request.json()

    const consulta = await prisma.agendamento.update({
      where: {
        id: id
      },
      data: {
        status: status
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