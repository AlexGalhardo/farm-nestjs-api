import { Injectable, NotFoundException } from "@nestjs/common";
import { RepositoryService } from "../../repository/repository.service";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";
import { createFarmSchema } from "./schema/create-farm.schema";

@Injectable()
export class FarmService {
	constructor(private readonly repository: RepositoryService) {}

	async create(dto: CreateFarmDto) {
		const data = createFarmSchema.parse(dto);
		return await this.repository.farm.create({ data });
	}

	async findAll() {
		return await this.repository.farm.findMany({
			include: {
				producer: true,
				harvests: {
					include: {
						crops: true,
					},
				},
			},
		});
	}

	async findOne(id: string) {
		const farm = await this.repository.farm.findUnique({ where: { id } });
		if (!farm) throw new NotFoundException("Farm not found");
		return farm;
	}

	async update(id: string, dto: UpdateFarmDto) {
		const data = createFarmSchema.parse(dto);
		return await this.repository.farm.update({
			where: { id },
			data,
		});
	}

	async remove(id: string) {
		return await this.repository.farm.delete({ where: { id } });
	}
}
