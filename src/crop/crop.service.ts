import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CropService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateCropDto) {
		const { name, season, harvestId } = dto;
		return this.prisma.crop.create({
			data: {
				name,
				season,
				harvest: {
					connect: { id: harvestId },
				},
			},
		});
	}

	async findAll() {
		return this.prisma.crop.findMany();
	}

	async findOne(id: string) {
		const crop = await this.prisma.crop.findUnique({ where: { id } });
		if (!crop) throw new NotFoundException("Crop not found");
		return crop;
	}

	async update(id: string, dto: UpdateCropDto) {
		return this.prisma.crop.update({ where: { id }, data: dto });
	}

	async remove(id: string) {
		return this.prisma.crop.delete({ where: { id } });
	}
}
