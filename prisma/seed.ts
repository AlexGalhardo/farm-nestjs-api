import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const producer = await prisma.producer.create({
    data: {
      name: 'João Silva',
      cpfCnpj: '12345678900',
      properties: {
        create: [
          {
            name: 'Fazenda Primavera',
            city: 'Uberlândia',
            state: 'MG',
            totalArea: 100,
            agriculturalArea: 60,
            vegetationArea: 40,
            harvests: {
              create: [
                {
                  year: 2021,
                  crops: {
                    create: [
                      { name: 'Soja', season: 'Verão' },
                      { name: 'Milho', season: 'Inverno' }
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed concluído com sucesso!');
}

main().finally(() => prisma.$disconnect());
