-- CreateTable
CREATE TABLE "planos_alimentares" (
    "id" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planos_alimentares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refeicoes" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "planoAlimentarId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refeicoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alimentos" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "refeicaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alimentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refeicoes" ADD CONSTRAINT "refeicoes_planoAlimentarId_fkey" FOREIGN KEY ("planoAlimentarId") REFERENCES "planos_alimentares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimentos" ADD CONSTRAINT "alimentos_refeicaoId_fkey" FOREIGN KEY ("refeicaoId") REFERENCES "refeicoes"("id") ON DELETE CASCADE ON UPDATE CASCADE; 