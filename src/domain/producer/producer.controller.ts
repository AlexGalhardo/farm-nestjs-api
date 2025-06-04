import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { getErrorMessage, getErrorStack } from "../../utils/functions";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { ProducerService } from "./producer.service";

@Controller("producers")
export class ProducerController {
	private readonly logger = new Logger(ProducerController.name);

	constructor(private readonly producerService: ProducerService) {}

	@Post()
	async create(@Body() dto: CreateProducerDto) {
		try {
			const result = await this.producerService.create(dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error creating producer", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while creating producer",
			});
		}
	}

	@Get()
	async findAll() {
		try {
			const result = await this.producerService.findAll();
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error fetching producers", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while fetching producers",
			});
		}
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		try {
			const result = await this.producerService.findOne(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error fetching producer with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while fetching producer with id ${id}`,
			});
		}
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() dto: UpdateProducerDto) {
		try {
			const result = await this.producerService.update(id, dto);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error updating producer with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while updating producer with id ${id}`,
			});
		}
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		try {
			const result = await this.producerService.remove(id);
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error(`Error removing producer with id ${id}`, getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || `Unknown error while removing producer with id ${id}`,
			});
		}
	}
}
