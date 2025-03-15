import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function PATCH(request: NextRequest, props: Props) {
  try {
    const data = await request.json()
    const { id } = props.params

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