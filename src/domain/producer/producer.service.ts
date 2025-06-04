import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ZodError } from "zod";
import { RepositoryService } from "../../repository/repository.service";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { createProducerSchema } from "./schema/create-producer.schema";
import { updateProducerSchema } from "./schema/update-producer.schema";

@Injectable()
export class ProducerService {
	constructor(private readonly repository: RepositoryService) {}

	async create(dto: CreateProducerDto) {
		try {
			const data = createProducerSchema.parse(dto);
			return await this.repository.producer.create({
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
		try {
			const data = updateProducerSchema.parse(dto);
			return await this.repository.producer.update({
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
		return await this.repository.producer.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
