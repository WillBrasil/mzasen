import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/api-utils"

// GET /api/pacientes/[id]/medidas
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== params.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Buscar todas as medidas do paciente
    const medidas = await prisma.medidaCorporal.findMany({
      where: {
        pacienteId: params.id,
      },
      orderBy: {
        data: "desc",
      },
    })

    return NextResponse.json(medidas)
  } catch (error) {
    console.error("Erro ao buscar medidas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar medidas" },
      { status: 500 }
    )
  }
}

// POST /api/pacientes/[id]/medidas
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== params.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const data = await request.json()
    
    // Cálculo automático do IMC se peso e altura estiverem presentes
    if (data.peso && data.altura) {
      const alturaMetros = data.altura / 100 // Converter altura de cm para metros
      data.imc = parseFloat((data.peso / (alturaMetros * alturaMetros)).toFixed(2))
    }

    // Criar nova medida
    const medida = await prisma.medidaCorporal.create({
      data: {
        pacienteId: params.id,
        peso: data.peso,
        altura: data.altura,
        circunfCintura: data.circunfCintura,
        circunfQuadril: data.circunfQuadril,
        circunfBraco: data.circunfBraco,
        circunfCoxa: data.circunfCoxa,
        imc: data.imc,
        percentualGordura: data.percentualGordura,
        observacoes: data.observacoes,
      },
    })

    return NextResponse.json(medida, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar medida:", error)
    return NextResponse.json(
      { error: "Erro ao criar medida" },
      { status: 500 }
    )
  }
}

// DELETE /api/pacientes/[id]/medidas/[medidaId]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; medidaId: string } }
) {
  try {
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== params.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Verificar se a medida existe
    const medida = await prisma.medidaCorporal.findUnique({
      where: {
        id: params.medidaId,
        pacienteId: params.id,
      },
    })

    if (!medida) {
      return NextResponse.json(
        { error: "Medida não encontrada" },
        { status: 404 }
      )
    }

    // Excluir medida
    await prisma.medidaCorporal.delete({
      where: {
        id: params.medidaId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir medida:", error)
    return NextResponse.json(
      { error: "Erro ao excluir medida" },
      { status: 500 }
    )
  }
} 