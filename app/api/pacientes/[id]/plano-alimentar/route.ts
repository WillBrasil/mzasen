import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const id = request.url.split("/pacientes/")[1].split("/plano-alimentar")[0]

    const planoAlimentar = await prisma.planoAlimentar.findFirst({
      where: {
        pacienteId: id
      },
      include: {
        refeicoes: {
          include: {
            alimentos: true
          }
        }
      }
    })

    if (!planoAlimentar) {
      return NextResponse.json({
        id: undefined,
        pacienteId: id,
        refeicoes: [],
        observacoes: "",
        atualizadoEm: new Date().toISOString()
      })
    }

    return NextResponse.json({
      id: planoAlimentar.id,
      pacienteId: planoAlimentar.pacienteId,
      refeicoes: planoAlimentar.refeicoes.map(refeicao => ({
        id: refeicao.id,
        titulo: refeicao.titulo,
        horario: refeicao.horario,
        alimentos: refeicao.alimentos.map(a => a.descricao)
      })),
      observacoes: planoAlimentar.observacoes,
      atualizadoEm: planoAlimentar.atualizadoEm.toISOString()
    })
  } catch (error) {
    console.error("Erro ao buscar plano alimentar:", error)
    return NextResponse.json(
      { error: "Erro ao buscar plano alimentar" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const id = request.url.split("/pacientes/")[1].split("/plano-alimentar")[0]
    const data = await request.json()

    // Cria o plano alimentar
    const planoAlimentar = await prisma.planoAlimentar.create({
      data: {
        pacienteId: id,
        observacoes: data.observacoes,
        refeicoes: {
          create: data.refeicoes.map((refeicao: any) => ({
            titulo: refeicao.titulo,
            horario: refeicao.horario,
            alimentos: {
              create: refeicao.alimentos.map((alimento: string) => ({
                descricao: alimento
              }))
            }
          }))
        }
      },
      include: {
        refeicoes: {
          include: {
            alimentos: true
          }
        }
      }
    })

    return NextResponse.json({
      id: planoAlimentar.id,
      pacienteId: planoAlimentar.pacienteId,
      refeicoes: planoAlimentar.refeicoes.map(refeicao => ({
        id: refeicao.id,
        titulo: refeicao.titulo,
        horario: refeicao.horario,
        alimentos: refeicao.alimentos.map(a => a.descricao)
      })),
      observacoes: planoAlimentar.observacoes,
      atualizadoEm: planoAlimentar.atualizadoEm.toISOString()
    })
  } catch (error) {
    console.error("Erro ao criar plano alimentar:", error)
    return NextResponse.json(
      { error: "Erro ao criar plano alimentar" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const id = request.url.split("/pacientes/")[1].split("/plano-alimentar")[0]
    const data = await request.json()

    // Primeiro deleta o plano existente e suas relações
    await prisma.planoAlimentar.delete({
      where: {
        id: data.id
      }
    })

    // Cria um novo plano com os dados atualizados
    const planoAlimentar = await prisma.planoAlimentar.create({
      data: {
        pacienteId: id,
        observacoes: data.observacoes,
        refeicoes: {
          create: data.refeicoes.map((refeicao: any) => ({
            titulo: refeicao.titulo,
            horario: refeicao.horario,
            alimentos: {
              create: refeicao.alimentos.map((alimento: string) => ({
                descricao: alimento
              }))
            }
          }))
        }
      },
      include: {
        refeicoes: {
          include: {
            alimentos: true
          }
        }
      }
    })

    return NextResponse.json({
      id: planoAlimentar.id,
      pacienteId: planoAlimentar.pacienteId,
      refeicoes: planoAlimentar.refeicoes.map(refeicao => ({
        id: refeicao.id,
        titulo: refeicao.titulo,
        horario: refeicao.horario,
        alimentos: refeicao.alimentos.map(a => a.descricao)
      })),
      observacoes: planoAlimentar.observacoes,
      atualizadoEm: planoAlimentar.atualizadoEm.toISOString()
    })
  } catch (error) {
    console.error("Erro ao atualizar plano alimentar:", error)
    return NextResponse.json(
      { error: "Erro ao atualizar plano alimentar" },
      { status: 500 }
    )
  }
} 