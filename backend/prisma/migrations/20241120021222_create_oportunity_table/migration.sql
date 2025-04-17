-- CreateTable
CREATE TABLE "Oportunity" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "requirements" TEXT[],
    "jobDescription" TEXT NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "managedJob" TEXT,
    "externalUrl" TEXT,
    "benefits" TEXT[],
    "location" TEXT NOT NULL,
    "workSchedule" TEXT NOT NULL,
    "availablePositions" INTEGER NOT NULL,
    "expectedStartDate" TIMESTAMP(3) NOT NULL,
    "companyInfo" JSONB NOT NULL,
    "mainResponsibilities" TEXT[],
    "toolsAndSoftware" JSONB[],
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oportunity_pkey" PRIMARY KEY ("id")
);
