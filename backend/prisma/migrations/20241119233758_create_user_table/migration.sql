-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT,
    "init_date_school" TIMESTAMP(3),
    "end_date_school" TIMESTAMP(3),
    "software_skills" TEXT[],
    "personal_skills" TEXT[],    
    "portfolio_url" TEXT, 
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
