-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "placename" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Places" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "placename" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Places_pkey" PRIMARY KEY ("id")
);
