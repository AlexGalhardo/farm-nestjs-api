import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
	let appController: AppController;
	let appService: AppService;

	const mockDashboardData = {
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
	};

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: AppService,
					useValue: {
						getDashboard: jest.fn().mockResolvedValue(mockDashboardData),
					},
				},
			],
		}).compile();

		appController = moduleRef.get<AppController>(AppController);
		appService = moduleRef.get<AppService>(AppService);
	});

	describe("getDashboard", () => {
		it("should return dashboard data from the service", async () => {
			const result = await appController.getDashboard();
			expect(result).toEqual(mockDashboardData);
			// eslint-disable-next-line @typescript-eslint/unbound-method
			expect(appService.getDashboard).toHaveBeenCalled();
		});
	});
});
