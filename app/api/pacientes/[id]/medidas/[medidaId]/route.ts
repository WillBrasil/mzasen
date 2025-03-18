import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/auth"

// DELETE /api/pacientes/[id]/medidas/[medidaId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; medidaId: string }> }
) {
  const { id, medidaId } = await params
  
  try {
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Verificar se a medida existe
    const medida = await prisma.medidaCorporal.findUnique({
      where: {
        id: medidaId,
      },
    })

    if (!medida) {
      return NextResponse.json(
        { error: "Medida não encontrada" },
        { status: 404 }
      )
    }

    // Verificar se a medida pertence ao paciente
    if (medida.pacienteId !== id) {
      return NextResponse.json(
        { error: "Medida não pertence ao paciente" },
        { status: 403 }
      )
    }

    // Excluir medida
    await prisma.medidaCorporal.delete({
      where: {
        id: medidaId,
      },
    })

    return NextResponse.json({ success: true, message: "Medida excluída com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir medida:", error)
    return NextResponse.json(
      { error: "Erro ao excluir medida" },
      { status: 500 }
    )
  }
} 