-- CreateTable
CREATE TABLE "UrlDB" (
    "id" SERIAL NOT NULL,
    "longUrl" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UrlDB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlDB_linkId_key" ON "UrlDB"("linkId");
