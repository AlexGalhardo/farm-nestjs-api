import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { UpdateProducerDto } from "./dto/update-producer.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProducerService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateProducerDto) {
		return this.prisma.producer.create({ data: dto });
	}

	async findAll() {
		return this.prisma.producer.findMany();
	}

	async findOne(id: string) {
		const producer = await this.prisma.producer.findUnique({
			where: { id },
		});
		if (!producer) throw new NotFoundException("Producer not found");
		return producer;
	}

	async update(id: string, dto: UpdateProducerDto) {
		return this.prisma.producer.update({ where: { id }, data: dto });
	}

	async remove(id: string) {
		return this.prisma.producer.delete({ where: { id } });
	}
}
