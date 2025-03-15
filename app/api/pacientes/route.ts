import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get("busca") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const [pacientes, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          tipo: "paciente",
          OR: [
            { nome: { contains: busca, mode: "insensitive" } },
            { email: { contains: busca, mode: "insensitive" } },
            { telefone: { contains: busca } }
          ]
        },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          createdAt: true
        },
        skip,
        take: limit,
        orderBy: { nome: "asc" }
      }),
      prisma.user.count({
        where: {
          tipo: "paciente",
          OR: [
            { nome: { contains: busca, mode: "insensitive" } },
            { email: { contains: busca, mode: "insensitive" } },
            { telefone: { contains: busca } }
          ]
        }
      })
    ])

    const pacientesFormatados = pacientes.map(paciente => ({
      id: paciente.id,
      nome: paciente.nome,
      email: paciente.email,
      telefone: paciente.telefone,
      cadastradoEm: paciente.createdAt,
      ultimaConsulta: null, // Será implementado depois
      proximaConsulta: null // Será implementado depois
    }))

    return NextResponse.json({
      pacientes: pacientesFormatados,
      total,
      paginas: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error)
    return NextResponse.json(
      { error: "Erro ao buscar pacientes" },
      { status: 500 }
    )
  }
} 