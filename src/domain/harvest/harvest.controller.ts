import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { getErrorMessage, getErrorStack } from "../../utils/functions";
import { CreateHarvestDto } from "./dto/create-harvest.dto";
import { UpdateHarvestDto } from "./dto/update-harvest.dto";
import { HarvestService } from "./harvest.service";

@Controller("harvests")
export class HarvestController {
	private readonly logger = new Logger(HarvestController.name);

	constructor(private readonly harvestService: HarvestService) {}

	@Post()
	async create(@Body() dto: CreateHarvestDto) {
		try {
			const result = await this.harvestService.create(dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error creating harvest: ", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while creating harvest",
			});
		}
	}

	@Get()
	async findAll() {
		try {
			const result = await this.harvestService.findAll();
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error fetching harvests", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while fetching harvests",
			});
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		try {
			const result = await this.harvestService.findOne(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error fetching harvest with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while fetching harvest with id ${id}`,
			});
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() dto: UpdateHarvestDto) {
		try {
			const result = await this.harvestService.update(id, dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error updating harvest with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while updating harvest with id ${id}`,
			});
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		try {
			const result = await this.harvestService.remove(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error removing harvest with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while removing harvest with id ${id}`,
			});
		}
	}
}
