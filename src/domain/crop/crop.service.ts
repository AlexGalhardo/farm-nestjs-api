import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ZodError } from "zod";
import { RepositoryService } from "../../repository/repository.service";
import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";
import { createCropSchema } from "./schema/create-crop.schema";
import { updateCropSchema } from "./schema/update-crop.schema";

@Injectable()
export class CropService {
	constructor(private readonly repository: RepositoryService) {}

	async create(dto: CreateCropDto) {
		try {
			const data = createCropSchema.parse(dto);

			const harvest = await this.repository.harvest.findUnique({
				where: { id: data.harvestId },
				include: { farm: true },
			});

			if (!harvest || !harvest.farm) {
				throw new NotFoundException("Safra ou fazenda não encontrada.");
			}

			const farm = harvest.farm;

			const availableArea = farm.agriculturalArea - farm.arableArea;

			if (data.useArableArea > availableArea) {
				throw new BadRequestException(
					`Área arável excede o disponível. Disponível: ${availableArea} hectares, Solicitado: ${data.useArableArea} heactares`,
				);
			}

			const crop = await this.repository.crop.create({
				data: {
					name: data.name,
					useArableArea: data.useArableArea,
					harvest: {
						connect: { id: data.harvestId },
					},
				},
			});

			await this.repository.farm.update({
				where: { id: farm.id },
				data: {
					arableArea: farm.arableArea + data.useArableArea,
				},
			});

			return crop;
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
		return await this.repository.crop.findMany({
			where: {
				deletedAt: null,
			},
			include: {
				harvest: {
					include: {
						farm: {
							include: {
								producer: true,
							},
						},
					},
				},
			},
		});
	}

	async findOne(id: string) {
		const crop = await this.repository.crop.findFirst({
			where: {
				id,
				deletedAt: null,
			},
		});

		if (!crop) throw new NotFoundException("Crop not found");
		return crop;
	}

	async update(id: string, dto: UpdateCropDto) {
		try {
			const data = updateCropSchema.parse(dto);

			return await this.repository.crop.update({
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
		return await this.repository.crop.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
