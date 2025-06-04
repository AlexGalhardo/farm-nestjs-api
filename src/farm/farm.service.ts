import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FarmService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateFarmDto) {
		const { name, city, state, totalArea, agriculturalArea, vegetationArea, producerId } = dto;

		return this.prisma.farm.create({
			data: {
				name,
				city,
				state,
				totalArea,
				agriculturalArea,
				vegetationArea,
				producerId,
			},
		});
	}

	async findAll() {
		return this.prisma.farm.findMany();
	}

	async findOne(id: string) {
		const farm = await this.prisma.farm.findUnique({ where: { id } });
		if (!farm) throw new NotFoundException("Farm not found");
		return farm;
	}

	async update(id: string, dto: UpdateFarmDto) {
		return this.prisma.farm.update({ where: { id }, data: dto });
	}

	async remove(id: string) {
		return this.prisma.farm.delete({ where: { id } });
	}
}
