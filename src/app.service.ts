import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async getDashboard() {
		const [totalProducers, totalFarms, totalCrops] = await Promise.all([
			this.prisma.producer.count(),
			this.prisma.farm.count(),
			this.prisma.crop.count(),
		]);

		const totalArableArea = await this.prisma.farm.aggregate({
			_sum: { arableArea: true },
		});

		const totalVegetationArea = await this.prisma.farm.aggregate({
			_sum: { vegetationArea: true },
		});

		const arable = totalArableArea._sum.arableArea ?? 0;
		const vegetation = totalVegetationArea._sum.vegetationArea ?? 0;
		const totalArea = arable + vegetation;

		const arablePercentage = totalArea > 0 ? (arable / totalArea) * 100 : 0;
		const vegetationPercentage = totalArea > 0 ? (vegetation / totalArea) * 100 : 0;

		const producersByState = await this.prisma.farm.groupBy({
			by: ["state"],
			_count: { producerId: true },
		});

		const producersByCity = await this.prisma.farm.groupBy({
			by: ["city"],
			_count: { producerId: true },
		});

		const mostCommonCrops = await this.prisma.crop.groupBy({
			by: ["name", "season"],
			_count: { id: true },
			orderBy: {
				_count: {
					id: "desc",
				},
			},
			take: 5,
		});

		return {
			totalProducers,
			totalFarms,
			totalCrops,
			totalArableArea: arable,
			totalVegetationArea: vegetation,
			totalArea,
			arablePercentage: Number(arablePercentage.toFixed(2)),
			vegetationPercentage: Number(vegetationPercentage.toFixed(2)),
			producersByState: producersByState.map((item) => ({
				state: item.state,
				count: item._count.producerId,
			})),
			producersByCity: producersByCity.map((item) => ({
				city: item.city,
				count: item._count.producerId,
			})),
			mostCommonCrops: mostCommonCrops.map((crop) => ({
				name: crop.name,
				season: crop.season,
				count: crop._count.id,
			})),
		};
	}
}
