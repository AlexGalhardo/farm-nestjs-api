import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ZodError } from "zod";
import { RepositoryService } from "../../repository/repository.service";
import { CreateHarvestDto } from "./dto/create-harvest.dto";
import { UpdateHarvestDto } from "./dto/update-harvest.dto";
import { createHarvestSchema } from "./schema/create-harvest.schema";
import { updateHarvestSchema } from "./schema/update-harvest.schema";

@Injectable()
export class HarvestService {
	constructor(private readonly repository: RepositoryService) {}

	async create(dto: CreateHarvestDto) {
		try {
			const data = createHarvestSchema.parse(dto);

			return await this.repository.harvest.create({
				data: {
					farmId: data.farmId,
					year: data.year,
				},
			});
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				throw new BadRequestException(
					err.errors.map((e) => ({
						path: e.path.join("."),
						message: e.message,
					})),
				);
			}
			throw err;
		}
	}

	async findAll() {
		return await this.repository.harvest.findMany({
			where: {
				deletedAt: null,
			},
			include: {
				farm: {
					include: {
						producer: true,
					},
				},
				crops: {
					where: {
						deletedAt: null,
					},
				},
			},
		});
	}

	async findOne(id: string) {
		const crop = await this.repository.harvest.findFirst({
			where: {
				id,
				deletedAt: null,
			},
		});

		if (!crop) throw new NotFoundException("Crop not found");
		return crop;
	}

	async update(id: string, dto: UpdateHarvestDto) {
		try {
			const data = updateHarvestSchema.parse(dto);

			return await this.repository.harvest.update({
				where: { id },
				data,
			});
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				throw new BadRequestException(
					err.errors.map((e) => ({
						path: e.path.join("."),
						message: e.message,
					})),
				);
			}
			throw err;
		}
	}

	async remove(id: string) {
		return await this.repository.harvest.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
