import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryService } from "../../repository/repository.service";
import { CropService } from "./crop.service";
import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";

describe("CropService", () => {
	let service: CropService;
	let prisma: jest.Mocked<RepositoryService>;

	const mockCrop = {
		id: "123e4567-e89b-12d3-a456-426614174000",
		name: "Milho",
		useArableArea: 20,
		harvestId: "123e4567-e89b-12d3-a456-426614174001",
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CropService,
				{
					provide: RepositoryService,
					useValue: {
						crop: {
							create: jest.fn(),
							findMany: jest.fn(),
							findUnique: jest.fn(),
							findFirst: jest.fn(),
							update: jest.fn(),
							delete: jest.fn(),
						},
						harvest: {
							findUnique: jest.fn(),
						},
						farm: {
							update: jest.fn(),
						},
					} as unknown as jest.Mocked<RepositoryService>,
				},
			],
		}).compile();

		service = module.get<CropService>(CropService);
		prisma = module.get(RepositoryService);

		jest.spyOn(prisma.crop, "create").mockResolvedValue(mockCrop as any);
		jest.spyOn(prisma.crop, "findMany").mockResolvedValue([mockCrop] as any);
		jest.spyOn(prisma.crop, "findFirst").mockResolvedValue(mockCrop as any);
		jest.spyOn(prisma.crop, "update").mockResolvedValue(mockCrop as any);
	});

	describe("create", () => {
		it("should create a crop with valid data", async () => {
			const dto: CreateCropDto = {
				name: "Milho",
				useArableArea: 20,
				harvestId: "123e4567-e89b-12d3-a456-426614174001",
				farmId: "123e4567-e89b-12d3-a456-426614174002",
			};

			jest.spyOn(prisma.harvest, "findUnique").mockResolvedValue({
				id: dto.harvestId,
				farm: {
					id: dto.farmId,
				},
			} as any);

			const result = await service.create(dto);

			expect(result).toEqual(mockCrop);

			expect(prisma.crop.create).toHaveBeenCalledWith({
				data: {
					name: "Milho",
					useArableArea: 20,
					harvest: {
						connect: { id: dto.harvestId },
					},
				},
			});
		});
	});

	describe("findAll", () => {
		it("should return a list of crops", async () => {
			const result = await service.findAll();

			expect(result).toEqual([mockCrop]);
			expect(prisma.crop.findMany).toHaveBeenCalled();
		});
	});

	describe("findOne", () => {
		it("should return a crop by ID", async () => {
			jest.spyOn(prisma.crop, "findFirst").mockResolvedValue(mockCrop as any);

			const result = await service.findOne("123e4567-e89b-12d3-a456-426614174000");

			expect(result).toEqual(mockCrop);

			expect(prisma.crop.findFirst).toHaveBeenCalledWith({
				where: {
					id: "123e4567-e89b-12d3-a456-426614174000",
					deletedAt: null,
				},
			});
		});

		it("should throw NotFoundException if crop is not found", async () => {
			jest.spyOn(prisma.crop, "findFirst").mockResolvedValue(null);

			await expect(service.findOne("123e4567-e89b-12d3-a456-426614174003")).rejects.toThrow(NotFoundException);
		});
	});

	describe("update", () => {
		it("should update a crop by ID", async () => {
			const dto: UpdateCropDto = { name: "Soja" };

			jest.spyOn(prisma.crop, "update").mockResolvedValue({
				...mockCrop,
				...dto,
			} as any);

			const result = await service.update("123e4567-e89b-12d3-a456-426614174000", dto);

			expect(result).toEqual({ ...mockCrop, ...dto });
			expect(prisma.crop.update).toHaveBeenCalledWith({
				where: { id: "123e4567-e89b-12d3-a456-426614174000" },
				data: dto,
			});
		});
	});

	describe("remove", () => {
		it("should soft delete a crop by ID", async () => {
			jest.spyOn(prisma.crop, "update").mockResolvedValue({
				...mockCrop,
				deletedAt: expect.any(Date),
			} as any);

			const result = await service.remove("123e4567-e89b-12d3-a456-426614174000");

			expect(result).toEqual({
				...mockCrop,
				deletedAt: expect.any(Date),
			});

			expect(prisma.crop.update).toHaveBeenCalledWith({
				where: { id: "123e4567-e89b-12d3-a456-426614174000" },
				data: { deletedAt: expect.any(Date) },
			});
		});
	});
});
