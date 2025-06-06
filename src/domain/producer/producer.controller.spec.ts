import { Test, TestingModule } from "@nestjs/testing";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { ProducerController } from "./producer.controller";
import { ProducerService } from "./producer.service";

describe("ProducerController", () => {
	let controller: ProducerController;

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
	});

	describe("findAll", () => {
		it("should return all producers", async () => {
			const producers = [{ id: "producer-1", name: "John Doe" }];
			mockProducerService.findAll.mockResolvedValue(producers);

			const response = await controller.findAll();
			expect(response).toEqual({ success: true, data: producers });
			expect(mockProducerService.findAll).toHaveBeenCalled();
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
	});

	describe("remove", () => {
		it("should delete a producer", async () => {
			const deletedProducer = { id: "producer-1", name: "To be deleted" };
			mockProducerService.remove.mockResolvedValue(deletedProducer);

			const response = await controller.remove("producer-1");
			expect(response).toEqual({ success: true, data: deletedProducer });
			expect(mockProducerService.remove).toHaveBeenCalledWith("producer-1");
		});
	});
});
