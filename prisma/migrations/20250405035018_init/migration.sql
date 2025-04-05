-- CreateEnum
CREATE TYPE "borrow_status" AS ENUM ('BORROWED', 'RETURNED');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "email" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "universityCard" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "role" "role" NOT NULL,
    "lastActivityDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_universityId_key" ON "User"("universityId");
