import { Injectable, NotFoundException } from "@nestjs/common";
import { RepositoryService } from "../../repository/repository.service";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { createProducerSchema } from "./schema/create-producer.schema";
import { updateProducerSchema } from "./schema/update-producer.schema";

@Injectable()
export class ProducerService {
	constructor(private readonly repository: RepositoryService) {}

	async create(dto: CreateProducerDto) {
		const data = createProducerSchema.parse(dto);
		return await this.repository.producer.create({
			data,
		});
	}

	async findAll() {
		return await this.repository.producer.findMany({
			where: { deletedAt: null },
			include: {
				farms: {
					include: {
						harvests: {
							include: {
								crops: true,
							},
						},
					},
				},
			},
		});
	}

	async findOne(id: string) {
		const producer = await this.repository.producer.findFirst({
			where: {
				id,
				deletedAt: null,
			},
		});
		if (!producer) throw new NotFoundException("Producer not found");
		return producer;
	}

	async update(id: string, dto: UpdateProducerDto) {
		const data = updateProducerSchema.parse(dto);
		return await this.repository.producer.update({
			where: { id },
			data,
		});
	}

	async remove(id: string) {
		return await this.repository.producer.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});

		// return await this.repository.producer.delete({ where: { id } });
	}
}
