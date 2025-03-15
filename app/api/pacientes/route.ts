import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get("busca") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const orderBy = searchParams.get("orderBy") || "createdAt"
    const order = (searchParams.get("order") || "desc") as Prisma.SortOrder

    // Calcula o offset para paginação
    const skip = (page - 1) * limit

    // Constrói a query de busca
    const where: Prisma.UserWhereInput = busca
      ? {
          tipo: "paciente",
          OR: [
            { nome: { contains: busca, mode: "insensitive" } },
            { email: { contains: busca, mode: "insensitive" } },
            { telefone: { contains: busca } },
          ],
        }
      : { tipo: "paciente" }

    // Busca total de pacientes para paginação
    const total = await prisma.user.count({ where })

    // Busca os pacientes com filtros
    const pacientes = await prisma.user.findMany({
      where,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        createdAt: true,
      },
      orderBy: {
        [orderBy]: order,
      },
      skip,
      take: limit,
    })

    // Busca última e próxima consulta para cada paciente
    const pacientesComConsultas = await Promise.all(
      pacientes.map(async (paciente) => {
        const consultas = await prisma.agendamento.findMany({
          where: {
            email: paciente.email,
            status: { not: "cancelada" },
          },
          orderBy: {
            data: "desc",
          },
          take: 2,
          select: {
            data: true,
          },
        })

        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)

        const ultimaConsulta = consultas.find((c) => 
          c.data && new Date(c.data) <= hoje
        )
        const proximaConsulta = consultas.find((c) => 
          c.data && new Date(c.data) > hoje
        )

        return {
          ...paciente,
          cadastradoEm: paciente.createdAt,
          ultimaConsulta: ultimaConsulta?.data || null,
          proximaConsulta: proximaConsulta?.data || null,
        }
      })
    )

    return NextResponse.json({
      pacientes: pacientesComConsultas,
      paginas: Math.max(1, Math.ceil(total / limit)),
      total,
    })
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error)
    return NextResponse.json(
      { error: "Erro ao buscar pacientes" },
      { status: 500 }
    )
  }
} 