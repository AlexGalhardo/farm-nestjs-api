import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const prisma = new PrismaClient();

async function clearSeedData() {
	await prisma.crop.deleteMany({
		where: {
			name: {
				startsWith: "SEED -",
			},
		},
	});

	await prisma.harvest.deleteMany({
		where: {
			farm: {
				name: {
					startsWith: "SEED -",
				},
			},
		},
	});

	await prisma.farm.deleteMany({
		where: {
			name: {
				startsWith: "SEED -",
			},
		},
	});

	await prisma.producer.deleteMany({
		where: {
			name: {
				startsWith: "SEED -",
			},
		},
	});
}

async function createSeedData() {
	const states = ["MG", "SP", "GO", "RS", "MT"];
	const crops = ["Soja", "Milho", "Algodão", "Trigo", "Café", "Arroz"];

	for (let i = 0; i < 10; i++) {
		const producer = await prisma.producer.create({
			data: {
				name: `SEED - ${faker.person.fullName()}`,
				cpfCnpj: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
				farms: {
					create: [
						{
							name: `SEED - ${faker.location.city()} Farm`,
							city: faker.location.city(),
							state: faker.helpers.arrayElement(states),
							totalArea: 100,
							agriculturalArea: 60,
							vegetationArea: 40,
							harvests: {
								create: [
									{
										year: faker.date.anytime().getFullYear(),
										crops: {
											create: Array.from({ length: 2 }).map(() => ({
												name: `SEED - ${faker.helpers.arrayElement(crops)}`,
												useArableArea: faker.number.int({ min: 1, max: 60 }),
											})),
										},
									},
								],
							},
						},
					],
				},
			},
		});

		console.log(`✅ Created producer: ${producer.name}`);
	}
}

async function main() {
	console.log("🧹 Cleaning old SEED data...");
	await clearSeedData();

	console.log("🌱 Creating new SEED data...");
	await createSeedData();

	console.log("✅ Seed finished!");
}

main()
	.catch((error) => {
		console.error("Error running database seed: ", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
