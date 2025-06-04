import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryService } from "../../repository/repository.service";
import { CreateHarvestDto } from "./dto/create-harvest.dto";
import { UpdateHarvestDto } from "./dto/update-harvest.dto";
import { HarvestService } from "./harvest.service";

describe("HarvestService", () => {
	let service: HarvestService;
	let prisma: jest.Mocked<RepositoryService> & {
		harvest: {
			create: jest.Mock<any, any>;
			findMany: jest.Mock<any, any>;
			findFirst: jest.Mock<any, any>;
			update: jest.Mock<any, any>;
		};
	};

	const mockHarvest = {
		id: "0556115e-8655-4956-bf42-5fefb97f3ecc",
		farmId: "0556115e-8655-4956-bf42-5fefb97f3ec8",
		year: 2024,
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				HarvestService,
				{
					provide: RepositoryService,
					useValue: {
						harvest: {
							create: jest.fn(),
							findMany: jest.fn(),
							findFirst: jest.fn(),
							update: jest.fn(),
						},
					},
				},
			],
		}).compile();

		service = module.get<HarvestService>(HarvestService);
		prisma = module.get<RepositoryService>(RepositoryService) as typeof prisma;

		prisma.harvest.create.mockResolvedValue(mockHarvest);
		prisma.harvest.findMany.mockResolvedValue([mockHarvest]);
		prisma.harvest.findFirst.mockResolvedValue(mockHarvest);
		prisma.harvest.update.mockResolvedValue(mockHarvest);
	});

	describe("create", () => {
		it("should create a harvest", async () => {
			const dto: CreateHarvestDto = {
				farmId: "0556115e-8655-4956-bf42-5fefb97f3ec9",
				year: 2024,
			};

			const result = await service.create(dto);
			expect(result).toEqual(mockHarvest);

			expect(prisma.harvest.create).toHaveBeenCalledWith({
				data: dto,
			});
		});

		it("should throw BadRequestException on invalid input", async () => {
			const invalidDto = {
				farmId: "farm-uuid",
				year: "invalid" as any,
			};

			await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
		});
	});

	describe("findAll", () => {
		it("should return a list of harvests", async () => {
			const result = await service.findAll();

			expect(result).toEqual([mockHarvest]);
			expect(prisma.harvest.findMany).toHaveBeenCalledWith({
				where: { deletedAt: null },
				include: {
					farm: {
						include: { producer: true },
					},
					crops: {
						where: { deletedAt: null },
					},
				},
			});
		});
	});

	describe("findOne", () => {
		it("should return a harvest by ID", async () => {
			const result = await service.findOne("harvest-uuid");

			expect(result).toEqual(mockHarvest);
			expect(prisma.harvest.findFirst).toHaveBeenCalledWith({
				where: { id: "harvest-uuid", deletedAt: null },
			});
		});

		it("should throw NotFoundException if harvest not found", async () => {
			prisma.harvest.findFirst.mockResolvedValueOnce(null);

			await expect(service.findOne("invalid-id")).rejects.toThrow(NotFoundException);
		});
	});

	describe("update", () => {
		it("should update a harvest", async () => {
			const dto: UpdateHarvestDto = {
				year: 2025,
			};

			const updatedMock = { ...mockHarvest, ...dto };

			prisma.harvest.update.mockResolvedValueOnce(updatedMock);

			const result = await service.update("harvest-uuid", dto);

			expect(result).toEqual(updatedMock);
			expect(prisma.harvest.update).toHaveBeenCalledWith({
				where: { id: "harvest-uuid" },
				data: dto,
			});
		});

		it("should throw BadRequestException on invalid update input", async () => {
			const invalidDto = {
				year: "not-a-number" as any,
			};

			await expect(service.update("harvest-uuid", invalidDto)).rejects.toThrow(BadRequestException);
		});
	});

	describe("remove", () => {
		it("should soft delete a harvest", async () => {
			const result = await service.remove("harvest-uuid");

			expect(result).toEqual(mockHarvest);
			expect(prisma.harvest.update).toHaveBeenCalledWith({
				where: { id: "harvest-uuid" },
				data: {
					deletedAt: expect.any(Date),
				},
			});
		});
	});
});
