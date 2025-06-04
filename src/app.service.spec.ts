import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaService } from "./prisma/prisma.service";

describe("AppService", () => {
	let service: AppService;
	let prisma: DeepMockProxy<PrismaService>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AppService, { provide: PrismaService, useValue: mockDeep<PrismaService>() }],
		}).compile();

		service = module.get<AppService>(AppService);
		prisma = module.get(PrismaService);
	});

	it("should return dashboard data correctly", async () => {
		prisma.producer.count.mockResolvedValue(5);
		prisma.farm.count.mockResolvedValue(3);
		prisma.crop.count.mockResolvedValue(10);

		prisma.farm.aggregate.mockResolvedValueOnce({
			_sum: { arableArea: 100 },
			_count: {},
			_avg: {},
			_min: {},
			_max: {},
		});
		prisma.farm.aggregate.mockResolvedValueOnce({
			_sum: { vegetationArea: 50 },
			_count: {},
			_avg: {},
			_min: {},
			_max: {},
		});

		prisma.farm.groupBy
			.mockResolvedValueOnce([
				{
					id: "1",
					state: "SP",
					name: "",
					arableArea: 0,
					totalArea: 0,
					agriculturalArea: 0,
					vegetationArea: 0,
					city: "",
					producerId: "",
					_count: { producerId: 2 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					id: "2",
					state: "MG",
					name: "",
					arableArea: 0,
					totalArea: 0,
					agriculturalArea: 0,
					vegetationArea: 0,
					city: "",
					producerId: "",
					_count: { producerId: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
			])
			.mockResolvedValueOnce([
				{
					id: "1",
					city: "Campinas",
					name: "",
					arableArea: 0,
					totalArea: 0,
					agriculturalArea: 0,
					vegetationArea: 0,
					state: "",
					producerId: "",
					_count: { producerId: 2 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
				{
					id: "2",
					city: "Uberlândia",
					name: "",
					arableArea: 0,
					totalArea: 0,
					agriculturalArea: 0,
					vegetationArea: 0,
					state: "",
					producerId: "",
					_count: { producerId: 3 },
					_avg: {},
					_sum: {},
					_min: {},
					_max: {},
				},
			]);

		prisma.crop.groupBy.mockResolvedValue([
			{
				id: "1",
				harvestId: "h1",
				name: "Milho",
				season: "Verão",
				_count: { id: 4 },
				_min: {},
				_max: {},
			},
			{
				id: "2",
				harvestId: "h2",
				name: "Soja",
				season: "Inverno",
				_count: { id: 3 },
				_min: {},
				_max: {},
			},
		]);

		const result = await service.getDashboard();

		expect(result).toEqual({
			totalProducers: 5,
			totalFarms: 3,
			totalCrops: 10,
			totalArableArea: 100,
			totalVegetationArea: 50,
			totalArea: 150,
			arablePercentage: 66.67,
			vegetationPercentage: 33.33,
			producersByState: [
				{ state: "SP", count: 2 },
				{ state: "MG", count: 3 },
			],
			producersByCity: [
				{ city: "Campinas", count: 2 },
				{ city: "Uberlândia", count: 3 },
			],
			mostCommonCrops: [
				{ name: "Milho", season: "Verão", count: 4 },
				{ name: "Soja", season: "Inverno", count: 3 },
			],
		});
	});
});
