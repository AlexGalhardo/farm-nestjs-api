import { Test, TestingModule } from "@nestjs/testing";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { AppService } from "./app.service";
import { RepositoryService } from "./repository/repository.service";

describe("AppService", () => {
	let service: AppService;
	let prisma: DeepMockProxy<RepositoryService>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AppService, { provide: RepositoryService, useValue: mockDeep<RepositoryService>() }],
		}).compile();

		service = module.get<AppService>(AppService);
		prisma = module.get(RepositoryService);
	});

	it("should return dashboard data correctly", async () => {
		// mocks de contagem
		prisma.producer.count.mockResolvedValue(5);
		prisma.farm.count.mockResolvedValue(3);
		prisma.crop.count.mockResolvedValue(10);

		// mocks de agregação de áreas
		prisma.farm.aggregate
			.mockResolvedValueOnce({
				_sum: { arableArea: 100, vegetationArea: 0 },
				_count: {},
				_avg: {},
				_min: {},
				_max: {},
			})
			.mockResolvedValueOnce({
				_sum: { arableArea: 0, vegetationArea: 50 },
				_count: {},
				_avg: {},
				_min: {},
				_max: {},
			});

		// mocks de groupBy - estado e cidade (primeira chamada)
		prisma.farm.groupBy
			.mockResolvedValueOnce([
				{
					state: "SP",
					city: "",
					id: "0",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p1",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 2 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "MG",
					city: "",
					id: "0",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p2",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "",
					city: "Campinas",
					id: "1",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p1",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 2 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "",
					city: "Uberlândia",
					id: "1",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p2",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "",
					city: "",
					id: "1",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p2",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
			])
			.mockResolvedValueOnce([
				// segunda chamada do groupBy (provavelmente similar)
				{
					state: "SP",
					city: "",
					id: "0",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p1",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 2 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "MG",
					city: "",
					id: "0",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p2",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "",
					city: "Campinas",
					id: "1",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p1",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 2 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "",
					city: "Uberlândia",
					id: "1",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p2",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					state: "",
					city: "",
					id: "1",
					name: "",
					arableArea: 0,
					vegetationArea: 0,
					agriculturalArea: 0,
					totalArea: 0,
					producerId: "p2",
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
					_count: { id: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
			]);

		// mock crops grouped
		prisma.crop.groupBy.mockResolvedValue([
			{
				id: "1",
				name: "Milho",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
				useArableArea: 0,
				harvestId: "",
				_count: { id: 4 },
				_avg: {},
				_sum: {},
				_min: {},
				_max: {},
			},
			{
				id: "0",
				name: "Soja",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
				useArableArea: 0,
				harvestId: "",
				_count: { id: 3 },
				_avg: {},
				_sum: {},
				_min: {},
				_max: {},
			},
		]);

		// mock producers with farms and harvests
		prisma.producer.findMany.mockResolvedValue([
			{
				id: "p1",
				name: "Produtor 1",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
				cpfCnpj: "00000000000",
				// @ts-expect-error
				farms: [
					{
						id: "f1",
						name: "Fazenda A",
						arableArea: 60,
						vegetationArea: 30,
						totalArea: 90,
						harvests: [
							{
								year: "2022",
								crops: [
									{ name: "Milho", useArableArea: 20 },
									{ name: "Soja", useArableArea: 15 },
								],
							},
						],
					},
				],
			},
			{
				id: "p2",
				name: "Produtor 2",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
				cpfCnpj: "11111111111",
				// @ts-expect-error
				farms: [
					{
						id: "f2",
						name: "Fazenda B",
						arableArea: 40,
						vegetationArea: 20,
						totalArea: 60,
						harvests: [
							{
								year: "2023",
								crops: [{ name: "Soja", useArableArea: 10 }],
							},
						],
					},
				],
			},
		]);

		const result = await service.getDashboard();

		expect(result).toMatchObject({
			"PRODUCER: Produtor 1": expect.objectContaining({
				producerId: "p1",
				producerName: "Produtor 1",
				totalFarms: 1,
				totalCrops: 2,
				totalArableArea: 60,
				totalVegetationArea: 30,
				totalArea: 90,
				totalArablePercentage: 66.67,
				totalVegetationPercentage: 33.33,
				// Só confirmar que tem farms e allCrops, não o conteúdo
				farms: expect.any(Array),
				allCrops: expect.any(Array),
			}),
			"PRODUCER: Produtor 2": expect.objectContaining({
				producerId: "p2",
				producerName: "Produtor 2",
				totalFarms: 1,
				totalCrops: 1,
				totalArableArea: 40,
				totalVegetationArea: 20,
				totalArea: 60,
				totalArablePercentage: 66.67,
				totalVegetationPercentage: 33.33,
				farms: expect.any(Array),
				allCrops: expect.any(Array),
			}),
		});
	});
});
