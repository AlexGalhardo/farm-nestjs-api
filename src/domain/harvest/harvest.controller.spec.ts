import { BadRequestException, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateHarvestDto } from "./dto/create-harvest.dto";
import { UpdateHarvestDto } from "./dto/update-harvest.dto";
import { HarvestController } from "./harvest.controller";
import { HarvestService } from "./harvest.service";

describe("HarvestController", () => {
	let controller: HarvestController;
	let loggerErrorSpy: jest.SpyInstance;

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

		loggerErrorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation(() => {});
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

		it("should handle errors and throw BadRequestException", async () => {
			const dto: CreateHarvestDto = {
				farmId: "farm-1",
				year: 2024,
			};
			const error = new Error("Create failed");

			mockHarvestService.create.mockRejectedValue(error);

			await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error creating harvest: ",
				expect.stringContaining("Error: Create failed"),
			);
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

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Find all failed");
			mockHarvestService.findAll.mockRejectedValue(error);

			await expect(controller.findAll()).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error fetching harvests",
				expect.stringContaining("Error: Find all failed"),
			);
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

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Find one failed");
			mockHarvestService.findOne.mockRejectedValue(error);

			await expect(controller.findOne("harvest-1")).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error fetching harvest with id harvest-1",
				expect.stringContaining("Error: Find one failed"),
			);
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

		it("should handle errors and throw BadRequestException", async () => {
			const dto: UpdateHarvestDto = { year: 2025 };
			const error = new Error("Update failed");

			mockHarvestService.update.mockRejectedValue(error);

			await expect(controller.update("harvest-1", dto)).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error updating harvest with id harvest-1",
				expect.stringContaining("Error: Update failed"),
			);
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

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Remove failed");
			mockHarvestService.remove.mockRejectedValue(error);

			await expect(controller.remove("harvest-1")).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error removing harvest with id harvest-1",
				expect.stringContaining("Error: Remove failed"),
			);
		});
	});
});
