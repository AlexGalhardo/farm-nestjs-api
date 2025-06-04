import { randomUUID } from "node:crypto";
import { Test, TestingModule } from "@nestjs/testing";
import { CropController } from "./crop.controller";
import { CropService } from "./crop.service";
import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";

describe("CropController", () => {
	let controller: CropController;

	const mockCropService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CropController],
			providers: [{ provide: CropService, useValue: mockCropService }],
		}).compile();

		controller = module.get<CropController>(CropController);
	});

	afterEach(() => jest.clearAllMocks());

	it("should create a crop and return success response", async () => {
		const dto: CreateCropDto = {
			name: "Wheat",
			useArableArea: 20,
			harvestId: randomUUID(),
			farmId: randomUUID(),
		};
		const createdCrop = { id: "crop-1", ...dto };

		mockCropService.create.mockResolvedValue(createdCrop);

		const response = await controller.create(dto);
		expect(response).toEqual({ success: true, data: createdCrop });

		const createMock = mockCropService.create;
		expect(createMock).toHaveBeenCalledWith(dto);
	});

	it("should return all crops", async () => {
		const crops = [{ id: "crop-1", name: "Corn", season: "Summer", harvestId: "harvest-1" }];
		mockCropService.findAll.mockResolvedValue(crops);

		const response = await controller.findAll();
		expect(response).toEqual({ success: true, data: crops });

		const findAllMock = mockCropService.findAll;
		expect(findAllMock).toHaveBeenCalled();
	});

	it("should return a single crop by id", async () => {
		const crop = {
			id: "crop-1",
			name: "Soy",
			useArableArea: 20,
			harvestId: "harvest-1",
		};
		mockCropService.findOne.mockResolvedValue(crop);

		const response = await controller.findOne("crop-1");
		expect(response).toEqual({ success: true, data: crop });

		const findOneMock = mockCropService.findOne;
		expect(findOneMock).toHaveBeenCalledWith("crop-1");
	});

	it("should update a crop", async () => {
		const dto: UpdateCropDto = { name: "Updated Crop" };
		const updatedCrop = {
			id: "crop-1",
			name: "Updated Crop",
			useArableArea: 20,
			harvestId: "harvest-1",
		};

		mockCropService.update.mockResolvedValue(updatedCrop);

		const response = await controller.update("crop-1", dto);
		expect(response).toEqual({ success: true, data: updatedCrop });

		const updateMock = mockCropService.update;
		expect(updateMock).toHaveBeenCalledWith("crop-1", dto);
	});

	it("should delete a crop", async () => {
		const deletedCrop = {
			id: "crop-1",
			name: "To be deleted",
			useArableArea: 20,
			harvestId: "harvest-1",
		};
		mockCropService.remove.mockResolvedValue(deletedCrop);

		const response = await controller.remove("crop-1");
		expect(response).toEqual({ success: true, data: deletedCrop });

		const removeMock = mockCropService.remove;
		expect(removeMock).toHaveBeenCalledWith("crop-1");
	});
});
