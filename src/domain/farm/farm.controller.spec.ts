import { BadRequestException, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";
import { FarmController } from "./farm.controller";
import { FarmService } from "./farm.service";

describe("FarmController", () => {
	let controller: FarmController;
	let loggerErrorSpy: jest.SpyInstance;

	const mockFarmService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FarmController],
			providers: [{ provide: FarmService, useValue: mockFarmService }],
		}).compile();

		controller = module.get<FarmController>(FarmController);

		loggerErrorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("should create a farm and return success response", async () => {
			const dto: CreateFarmDto = {
				name: "Farm 1",
				city: "City A",
				state: "State B",
				totalArea: 1000,
				agriculturalArea: 800,
				vegetationArea: 200,
				producerId: "producer-1",
			};
			const createdFarm = { id: "farm-1", ...dto };

			mockFarmService.create.mockResolvedValue(createdFarm);

			const response = await controller.create(dto);
			expect(response).toEqual({ success: true, data: createdFarm });
			expect(mockFarmService.create).toHaveBeenCalledWith(dto);
		});
	});

	describe("findAll", () => {
		it("should return all farms", async () => {
			const farms = [{ id: "farm-1", name: "Farm 1" }];
			mockFarmService.findAll.mockResolvedValue(farms);

			const response = await controller.findAll();
			expect(response).toEqual({ success: true, data: farms });
			expect(mockFarmService.findAll).toHaveBeenCalled();
		});

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Find all failed");
			mockFarmService.findAll.mockRejectedValue(error);

			await expect(controller.findAll()).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error fetching farms",
				expect.stringContaining("Error: Find all failed"),
			);
		});
	});

	describe("findOne", () => {
		it("should return a single farm by id", async () => {
			const farm = { id: "farm-1", name: "Farm 1" };
			mockFarmService.findOne.mockResolvedValue(farm);

			const response = await controller.findOne("farm-1");
			expect(response).toEqual({ success: true, data: farm });
			expect(mockFarmService.findOne).toHaveBeenCalledWith("farm-1");
		});

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Find one failed");
			mockFarmService.findOne.mockRejectedValue(error);

			await expect(controller.findOne("farm-1")).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error fetching farm with id farm-1",
				expect.stringContaining("Error: Find one failed"),
			);
		});
	});

	describe("update", () => {
		it("should update a farm", async () => {
			const dto: UpdateFarmDto = { name: "Farm Updated" };
			const updatedFarm = { id: "farm-1", name: "Farm Updated" };

			mockFarmService.update.mockResolvedValue(updatedFarm);

			const response = await controller.update("farm-1", dto);
			expect(response).toEqual({ success: true, data: updatedFarm });
			expect(mockFarmService.update).toHaveBeenCalledWith("farm-1", dto);
		});

		it("should handle errors and throw BadRequestException", async () => {
			const dto: UpdateFarmDto = { name: "Farm Updated" };
			const error = new Error("Update failed");

			mockFarmService.update.mockRejectedValue(error);

			await expect(controller.update("farm-1", dto)).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error updating farm with id farm-1",
				expect.stringContaining("Error: Update failed"),
			);
		});
	});

	describe("remove", () => {
		it("should delete a farm", async () => {
			const deletedFarm = { id: "farm-1", name: "Farm to delete" };
			mockFarmService.remove.mockResolvedValue(deletedFarm);

			const response = await controller.remove("farm-1");
			expect(response).toEqual({ success: true, data: deletedFarm });
			expect(mockFarmService.remove).toHaveBeenCalledWith("farm-1");
		});

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Remove failed");
			mockFarmService.remove.mockRejectedValue(error);

			await expect(controller.remove("farm-1")).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error removing farm with id farm-1",
				expect.stringContaining("Error: Remove failed"),
			);
		});
	});
});
