import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CustomLogger } from "../../utils/customer-logger";
import { getErrorMessage, getErrorStack } from "../../utils/functions";
import { CropService } from "./crop.service";
import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";

@Controller("crops")
export class CropController {
	private readonly logger = new CustomLogger();

	constructor(private readonly cropService: CropService) {}

	@Post()
	async create(@Body() dto: CreateCropDto) {
		try {
			const result = await this.cropService.create(dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error creating crop", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while creating crop",
			});
		}
	}

	@Get()
	async findAll() {
		try {
			const result = await this.cropService.findAll();
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error fetching crops", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while fetching crops",
			});
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		try {
			const result = await this.cropService.findOne(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error fetching crop with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while fetching crop with id ${id}`,
			});
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() dto: UpdateCropDto) {
		try {
			const result = await this.cropService.update(id, dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error updating crop with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while updating crop with id ${id}`,
			});
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		try {
			const result = await this.cropService.remove(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error removing crop with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while removing crop with id ${id}`,
			});
		}
	}
}
