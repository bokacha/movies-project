-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cinema" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movie" ADD CONSTRAINT "movie_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
