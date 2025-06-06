import { Test, TestingModule } from "@nestjs/testing";
import { CreateHarvestDto } from "./dto/create-harvest.dto";
import { UpdateHarvestDto } from "./dto/update-harvest.dto";
import { HarvestController } from "./harvest.controller";
import { HarvestService } from "./harvest.service";

describe("HarvestController", () => {
	let controller: HarvestController;

	const mockHarvestService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HarvestController],
			providers: [{ provide: HarvestService, useValue: mockHarvestService }],
		}).compile();

		controller = module.get<HarvestController>(HarvestController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("should create a harvest and return success response", async () => {
			const dto: CreateHarvestDto = {
				farmId: "farm-1",
				year: 2024,
			};
			const createdHarvest = { id: "harvest-1", ...dto };

			mockHarvestService.create.mockResolvedValue(createdHarvest);

			const response = await controller.create(dto);
			expect(response).toEqual({ success: true, data: createdHarvest });
			expect(mockHarvestService.create).toHaveBeenCalledWith(dto);
		});
	});

	describe("findAll", () => {
		it("should return all harvests", async () => {
			const harvests = [{ id: "harvest-1", farmId: "farm-1", year: 2024 }];
			mockHarvestService.findAll.mockResolvedValue(harvests);

			const response = await controller.findAll();
			expect(response).toEqual({ success: true, data: harvests });
			expect(mockHarvestService.findAll).toHaveBeenCalled();
		});
	});

	describe("findOne", () => {
		it("should return a single harvest by id", async () => {
			const harvest = { id: "harvest-1", farmId: "farm-1", year: 2024 };
			mockHarvestService.findOne.mockResolvedValue(harvest);

			const response = await controller.findOne("harvest-1");
			expect(response).toEqual({ success: true, data: harvest });
			expect(mockHarvestService.findOne).toHaveBeenCalledWith("harvest-1");
		});
	});

	describe("update", () => {
		it("should update a harvest", async () => {
			const dto: UpdateHarvestDto = { year: 2025 };
			const updatedHarvest = { id: "harvest-1", farmId: "farm-1", year: 2025 };

			mockHarvestService.update.mockResolvedValue(updatedHarvest);

			const response = await controller.update("harvest-1", dto);
			expect(response).toEqual({ success: true, data: updatedHarvest });
			expect(mockHarvestService.update).toHaveBeenCalledWith("harvest-1", dto);
		});
	});

	describe("remove", () => {
		it("should delete a harvest", async () => {
			const deletedHarvest = { id: "harvest-1", farmId: "farm-1", year: 2024 };
			mockHarvestService.remove.mockResolvedValue(deletedHarvest);

			const response = await controller.remove("harvest-1");
			expect(response).toEqual({ success: true, data: deletedHarvest });
			expect(mockHarvestService.remove).toHaveBeenCalledWith("harvest-1");
		});
	});
});
