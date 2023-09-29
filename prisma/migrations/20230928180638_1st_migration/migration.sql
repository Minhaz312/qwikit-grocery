-- CreateTable
CREATE TABLE "ProductList" (
    "id" SERIAL NOT NULL,
    "p_name" TEXT NOT NULL,
    "p_slug" TEXT NOT NULL,
    "p_category" TEXT NOT NULL,
    "p_price" BIGINT NOT NULL,
    "p_image" TEXT NOT NULL,
    "p_desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" CHAR(255) NOT NULL,
    "mail" CHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
