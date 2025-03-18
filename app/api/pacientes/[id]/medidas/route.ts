import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUser } from "@/lib/auth"

// GET /api/pacientes/[id]/medidas
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
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

    // Buscar todas as medidas do paciente
    const medidas = await prisma.medidaCorporal.findMany({
      where: {
        pacienteId: id,
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
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

    const data = await request.json()
    
    // Cálculo automático do IMC se peso e altura estiverem presentes
    if (data.peso && data.altura) {
      const alturaMetros = data.altura / 100 // Converter altura de cm para metros
      data.imc = parseFloat((data.peso / (alturaMetros * alturaMetros)).toFixed(2))
    }

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

    return NextResponse.json(medida, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar medida:", error)
    return NextResponse.json(
      { error: "Erro ao criar medida" },
      { status: 500 }
    )
  }
} 