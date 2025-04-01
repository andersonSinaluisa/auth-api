/*
  Warnings:

  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_token_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "token",
ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "session_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_login" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "UserAzureAD" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "UserAzureAD_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAzureAD_email_key" ON "UserAzureAD"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAzureAD_uid_key" ON "UserAzureAD"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_id_key" ON "Session"("session_id");
