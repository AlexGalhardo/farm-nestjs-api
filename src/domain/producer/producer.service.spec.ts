import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryService } from "../../repository/repository.service";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { ProducerService } from "./producer.service";

describe("ProducerService", () => {
	let service: ProducerService;
	let prisma: jest.Mocked<RepositoryService>;

	const mockProducer = {
		id: "uuid-123",
		name: "Alex Vieira",
		cpfCnpj: "12345678901",
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProducerService,
				{
					provide: RepositoryService,
					useValue: {
						producer: {
							create: jest.fn(),
							findMany: jest.fn(),
							findUnique: jest.fn(),
							findFirst: jest.fn(),
							update: jest.fn(),
							delete: jest.fn(),
						},
					},
				},
			],
		}).compile();

		service = module.get<ProducerService>(ProducerService);
		prisma = module.get(RepositoryService);

		jest.spyOn(prisma.producer, "create").mockResolvedValue(mockProducer);
		jest.spyOn(prisma.producer, "findMany").mockResolvedValue([mockProducer]);
		jest.spyOn(prisma.producer, "findFirst").mockResolvedValue(mockProducer);
		jest.spyOn(prisma.producer, "update").mockResolvedValue(mockProducer);
		jest.spyOn(prisma.producer, "delete").mockResolvedValue(mockProducer);
	});

	describe("create", () => {
		it("should create a producer with valid CPF/CNPJ", async () => {
			const dto: CreateProducerDto = {
				name: "Alex Vieira",
				cpfCnpj: "12345678901",
			};

			const result = await service.create(dto);

			expect(result).toEqual(mockProducer);

			expect(prisma.producer.create).toHaveBeenCalledWith({
				data: dto,
			});
		});
	});

	describe("findAll", () => {
		it("should return an array of producers", async () => {
			const result = await service.findAll();

			expect(result).toEqual([mockProducer]);

			expect(prisma.producer.findMany).toHaveBeenCalled();
		});
	});

	describe("findOne", () => {
		it("should return a single producer by ID", async () => {
			const result = await service.findOne("uuid-123");

			expect(result).toEqual(mockProducer);

			expect(prisma.producer.findFirst).toHaveBeenCalledWith({
				where: {
					id: "uuid-123",
					deletedAt: null,
				},
			});
		});

		it("should throw NotFoundException if producer not found", async () => {
			jest.spyOn(prisma.producer, "findFirst").mockResolvedValueOnce(null);

			await expect(service.findOne("invalid-id")).rejects.toThrow(NotFoundException);
		});
	});

	describe("update", () => {
		it("should update an existing producer", async () => {
			const dto: UpdateProducerDto = {
				name: "Updated Name",
			};

			const updatedProducer = { ...mockProducer, ...dto };
			jest.spyOn(prisma.producer, "update").mockResolvedValueOnce(updatedProducer);

			const result = await service.update("uuid-123", dto);

			expect(result).toEqual(updatedProducer);

			expect(prisma.producer.update).toHaveBeenCalledWith({
				where: { id: "uuid-123" },
				data: dto,
			});
		});
	});

	describe("remove", () => {
		it("should soft-delete a producer by ID", async () => {
			const updatedProducer = { ...mockProducer, deletedAt: new Date() };
			jest.spyOn(prisma.producer, "update").mockResolvedValueOnce(updatedProducer);

			const result = await service.remove("uuid-123");

			expect(result).toEqual(updatedProducer);

			expect(prisma.producer.update).toHaveBeenCalledWith({
				where: { id: "uuid-123" },
				data: { deletedAt: expect.any(Date) },
			});
		});
	});
});
