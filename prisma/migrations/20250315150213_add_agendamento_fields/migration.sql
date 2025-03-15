/*
  Warnings:

  - Added the required column `data` to the `agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agendamentos" ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "horario" TEXT NOT NULL,
ADD COLUMN     "profissional" TEXT NOT NULL DEFAULT 'Dra. Maria Zanetti';
