import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { getErrorMessage, getErrorStack } from "../../utils/functions";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";
import { FarmService } from "./farm.service";

@Controller("farms")
export class FarmController {
	private readonly logger = new Logger(FarmController.name);

	constructor(private readonly farmService: FarmService) {}

	@Post()
	async create(@Body() dto: CreateFarmDto) {
		try {
			const result = await this.farmService.create(dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error creating farm", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: JSON.parse(getErrorMessage(error)) ?? "Unknown error while creating farm",
			});
		}
	}

	@Get()
	async findAll() {
		try {
			const result = await this.farmService.findAll();
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error fetching farms", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while fetching farms",
			});
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		try {
			const result = await this.farmService.findOne(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error fetching farm with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while fetching farm with id ${id}`,
			});
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() dto: UpdateFarmDto) {
		try {
			const result = await this.farmService.update(id, dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error updating farm with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while updating farm with id ${id}`,
			});
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		try {
			const result = await this.farmService.remove(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error removing farm with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while removing farm with id ${id}`,
			});
		}
	}
}
