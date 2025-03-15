import { Metadata } from "next"
import { PacientePage } from "@/components/pages/paciente-page"

export const metadata: Metadata = {
  title: "Detalhes do Paciente | MzaSen",
  description: "Detalhes e histórico do paciente",
}

export default function Page({ params }: any) {
  return <PacientePage params={params} />
} 