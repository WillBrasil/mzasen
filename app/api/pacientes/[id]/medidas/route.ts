import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/auth"

// GET /api/pacientes/[id]/medidas
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Descomente quando o modelo estiver pronto
    /*
    // Buscar todas as medidas do paciente
    const medidas = await prisma.medidaCorporal.findMany({
      where: {
        pacienteId: id,
      },
      orderBy: {
        data: "desc",
      },
    })
    */

    // Mock até o modelo estar pronto
    const medidas = [
      {
        id: "1",
        pacienteId: id,
        data: new Date().toISOString(),
        peso: 70.5,
        altura: 170,
        circunfCintura: 80,
        circunfQuadril: 95,
        imc: 24.2,
        observacoes: "Boa evolução"
      }
    ]

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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const data = await request.json()
    
    // Cálculo automático do IMC se peso e altura estiverem presentes
    if (data.peso && data.altura) {
      const alturaMetros = data.altura / 100 // Converter altura de cm para metros
      data.imc = parseFloat((data.peso / (alturaMetros * alturaMetros)).toFixed(2))
    }

    // Descomente quando o modelo estiver pronto
    /*
    // Criar nova medida
    const medida = await prisma.medidaCorporal.create({
      data: {
        pacienteId: id,
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
    */

    // Mock até o modelo estar pronto
    const medida = {
      id: Date.now().toString(),
      pacienteId: id,
      data: new Date().toISOString(),
      ...data
    }

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
  request: NextRequest,
  { params }: { params: Promise<{ id: string; medidaId: string }> }
) {
  try {
    const { id, medidaId } = await params;
    
    // Verificar autenticação
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar permissão (próprio paciente ou profissional)
    if (user.tipo !== "profissional" && user.id !== id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    // Comentado até que o modelo esteja pronto
    /*
    // Verificar se a medida existe
    const medida = await prisma.medidaCorporal.findUnique({
      where: {
        id: medidaId,
        pacienteId: id,
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
        id: medidaId,
      },
    })
    */

    // Mock para desenvolvimento
    return NextResponse.json({ success: true, message: `Medida ${medidaId} excluída com sucesso` })
  } catch (error) {
    console.error("Erro ao excluir medida:", error)
    return NextResponse.json(
      { error: "Erro ao excluir medida" },
      { status: 500 }
    )
  }
} 