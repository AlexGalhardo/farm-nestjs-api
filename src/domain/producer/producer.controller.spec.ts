import { BadRequestException, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { ProducerController } from "./producer.controller";
import { ProducerService } from "./producer.service";

describe("ProducerController", () => {
	let controller: ProducerController;
	let loggerErrorSpy: jest.SpyInstance;

	const mockProducerService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProducerController],
			providers: [{ provide: ProducerService, useValue: mockProducerService }],
		}).compile();

		controller = module.get<ProducerController>(ProducerController);

		loggerErrorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("should create a producer and return success response", async () => {
			const dto: CreateProducerDto = {
				name: "John Doe",
				cpfCnpj: "12345678901",
			};
			const createdProducer = { id: "producer-1", ...dto };

			mockProducerService.create.mockResolvedValue(createdProducer);

			const response = await controller.create(dto);
			expect(response).toEqual({ success: true, data: createdProducer });
			expect(mockProducerService.create).toHaveBeenCalledWith(dto);
		});

		it("should handle errors and throw BadRequestException", async () => {
			const dto: CreateProducerDto = {
				name: "John Doe",
				cpfCnpj: "12345678901",
			};
			const error = new Error("Create failed");

			mockProducerService.create.mockRejectedValue(error);

			await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error creating producer",
				expect.stringContaining("Error: Create failed"),
			);
		});
	});

	describe("findAll", () => {
		it("should return all producers", async () => {
			const producers = [{ id: "producer-1", name: "John Doe" }];
			mockProducerService.findAll.mockResolvedValue(producers);

			const response = await controller.findAll();
			expect(response).toEqual({ success: true, data: producers });
			expect(mockProducerService.findAll).toHaveBeenCalled();
		});

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Find all failed");
			mockProducerService.findAll.mockRejectedValue(error);

			await expect(controller.findAll()).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error fetching producers",
				expect.stringContaining("Error: Find all failed"),
			);
		});
	});

	describe("findOne", () => {
		it("should return a single producer by id", async () => {
			const producer = { id: "producer-1", name: "John Doe" };
			mockProducerService.findOne.mockResolvedValue(producer);

			const response = await controller.findOne("producer-1");
			expect(response).toEqual({ success: true, data: producer });
			expect(mockProducerService.findOne).toHaveBeenCalledWith("producer-1");
		});

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Find one failed");
			mockProducerService.findOne.mockRejectedValue(error);

			await expect(controller.findOne("producer-1")).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error fetching producer with id producer-1",
				expect.stringContaining("Error: Find one failed"),
			);
		});
	});

	describe("update", () => {
		it("should update a producer", async () => {
			const dto: UpdateProducerDto = { name: "Jane Doe" };
			const updatedProducer = { id: "producer-1", name: "Jane Doe" };

			mockProducerService.update.mockResolvedValue(updatedProducer);

			const response = await controller.update("producer-1", dto);
			expect(response).toEqual({ success: true, data: updatedProducer });
			expect(mockProducerService.update).toHaveBeenCalledWith("producer-1", dto);
		});

		it("should handle errors and throw BadRequestException", async () => {
			const dto: UpdateProducerDto = { name: "Jane Doe" };
			const error = new Error("Update failed");

			mockProducerService.update.mockRejectedValue(error);

			await expect(controller.update("producer-1", dto)).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error updating producer with id producer-1",
				expect.stringContaining("Error: Update failed"),
			);
		});
	});

	describe("remove", () => {
		it("should delete a producer", async () => {
			const deletedProducer = { id: "producer-1", name: "To be deleted" };
			mockProducerService.remove.mockResolvedValue(deletedProducer);

			const response = await controller.remove("producer-1");
			expect(response).toEqual({ success: true, data: deletedProducer });
			expect(mockProducerService.remove).toHaveBeenCalledWith("producer-1");
		});

		it("should handle errors and throw BadRequestException", async () => {
			const error = new Error("Remove failed");
			mockProducerService.remove.mockRejectedValue(error);

			await expect(controller.remove("producer-1")).rejects.toThrow(BadRequestException);
			expect(loggerErrorSpy).toHaveBeenCalledWith(
				"Error removing producer with id producer-1",
				expect.stringContaining("Error: Remove failed"),
			);
		});
	});
});
