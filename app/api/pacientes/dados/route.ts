import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // TODO: Pegar o ID do usuário do token e buscar dados reais do banco
    const dadosPaciente = {
      pesoInicial: 85,
      pesoAtual: 82,
      metaPeso: 75,
      imc: 27.8
    }

    return NextResponse.json(dadosPaciente)
  } catch (error) {
    console.error("Erro ao buscar dados do paciente:", error)
    return NextResponse.json(
      { error: "Erro ao buscar dados do paciente" },
      { status: 500 }
    )
  }
} 