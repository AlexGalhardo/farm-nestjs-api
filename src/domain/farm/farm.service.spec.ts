import { randomUUID } from "node:crypto";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryService } from "../../repository/repository.service";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";
import { FarmService } from "./farm.service";

describe("FarmService", () => {
	let service: FarmService;
	let prisma: jest.Mocked<RepositoryService> & {
		farm: {
			create: jest.Mock<any, any>;
			findMany: jest.Mock<any, any>;
			findUnique: jest.Mock<any, any>;
			update: jest.Mock<any, any>;
			delete: jest.Mock<any, any>;
		};
	};

	const mockFarm = {
		id: randomUUID(),
		name: "Fazenda Bela Vista",
		city: "Ribeirão Preto",
		state: "SP",
		totalArea: 100,
		arableArea: 0,
		vegetationArea: 40,
		agriculturalArea: 60,
		producerId: "producer-uuid",
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FarmService,
				{
					provide: RepositoryService,
					useValue: {
						farm: {
							create: jest.fn(),
							findMany: jest.fn(),
							findUnique: jest.fn(),
							update: jest.fn(),
							delete: jest.fn(),
						},
					},
				},
			],
		}).compile();

		service = module.get<FarmService>(FarmService);
		prisma = module.get<RepositoryService>(RepositoryService) as typeof prisma;

		prisma.farm.create.mockResolvedValue(mockFarm);
		prisma.farm.findMany.mockResolvedValue([mockFarm]);
		prisma.farm.findUnique.mockResolvedValue(mockFarm);
		prisma.farm.update.mockResolvedValue(mockFarm);
		prisma.farm.delete.mockResolvedValue(mockFarm);
	});

	describe("create", () => {
		it("should create a farm with all required fields", async () => {
			const createFarmId = randomUUID();
			const dto: CreateFarmDto = {
				name: "Fazenda Bela Vista",
				city: "Ribeirão Preto",
				state: "SP",
				totalArea: 100,
				arableArea: 0,
				vegetationArea: 40,
				agriculturalArea: 60,
				producerId: createFarmId,
			};

			const result = await service.create(dto);

			expect(result).toEqual(mockFarm);

			expect(prisma.farm.create).toHaveBeenCalledWith({
				data: {
					name: "Fazenda Bela Vista",
					city: "Ribeirão Preto",
					state: "SP",
					producerId: createFarmId,
					totalArea: 100,
					arableArea: 0,
					vegetationArea: 40,
					agriculturalArea: 60,
				},
			});
		});
	});

	describe("findAll", () => {
		it("should return a list of farms", async () => {
			const result = await service.findAll();

			expect(result).toEqual([mockFarm]);
			expect(prisma.farm.findMany).toHaveBeenCalled();
		});
	});

	describe("findOne", () => {
		it("should return a farm by ID", async () => {
			const result = await service.findOne("farm-uuid");

			expect(result).toEqual(mockFarm);

			expect(prisma.farm.findUnique).toHaveBeenCalledWith({
				where: { id: "farm-uuid" },
			});
		});

		it("should throw NotFoundException if farm not found", async () => {
			prisma.farm.findUnique.mockResolvedValueOnce(null);

			await expect(service.findOne("invalid-id")).rejects.toThrow(NotFoundException);
		});
	});

	describe("update", () => {
		it("should update an existing farm", async () => {
			const dto: UpdateFarmDto = {
				name: "Fazenda Atualizada",
				city: "Ribeirão Preto",
				state: "SP",
				totalArea: 100,
				arableArea: 60,
				vegetationArea: 40,
				agriculturalArea: 60,
				producerId: randomUUID(),
			};

			const updatedMock = { ...mockFarm, ...dto };

			prisma.farm.update.mockResolvedValueOnce(updatedMock);

			const result = await service.update("farm-uuid", dto);

			expect(result).toEqual(updatedMock);

			expect(prisma.farm.update).toHaveBeenCalledWith({
				where: { id: "farm-uuid" },
				data: dto,
			});
		});
	});

	describe("remove", () => {
		it("should delete a farm by ID", async () => {
			const result = await service.remove("farm-uuid");

			expect(result).toEqual(mockFarm);

			expect(prisma.farm.delete).toHaveBeenCalledWith({
				where: { id: "farm-uuid" },
			});
		});
	});
});
