-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "producer_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" INTEGER NOT NULL,
    "agricultural_area" INTEGER NOT NULL,
    "arable_area" INTEGER NOT NULL DEFAULT 0,
    "vegetation_area" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "useArableArea" INTEGER NOT NULL,
    "harvest_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_cpf_cnpj_key" ON "producers"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_harvest_id_fkey" FOREIGN KEY ("harvest_id") REFERENCES "harvests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
