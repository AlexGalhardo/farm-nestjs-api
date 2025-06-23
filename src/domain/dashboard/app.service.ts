import { Injectable } from "@nestjs/common";
import { RepositoryService } from "../../repository/repository.service";

@Injectable()
export class AppService {
	constructor(private readonly repository: RepositoryService) {}

	async getDashboard() {
		const [totalProducers, totalFarms, totalCrops] = await Promise.all([
			this.repository.producer.count(),
			this.repository.farm.count(),
			this.repository.crop.count(),
		]);

		const [totalArableArea, totalVegetationArea] = await Promise.all([
			this.repository.farm.aggregate({ _sum: { arableArea: true } }),
			this.repository.farm.aggregate({ _sum: { vegetationArea: true } }),
		]);

		const arable = totalArableArea._sum.arableArea ?? 0;
		const vegetation = totalVegetationArea._sum.vegetationArea ?? 0;
		const totalArea = arable + vegetation;

		const all = {
			totalProducers,
			totalFarms,
			totalCrops,
			totalArableArea: arable,
			totalVegetationArea: vegetation,
			totalArea,
			totalArablePercentage: Number(((arable / totalArea) * 100 || 0).toFixed(2)),
			totalVegetationPercentage: Number(((vegetation / totalArea) * 100 || 0).toFixed(2)),
			producersByState: await this.repository.farm
				.groupBy({
					by: ["state"],
					_count: { id: true },
				})
				.then((results) =>
					results.map((item) => ({
						state: item.state,
						farmCount: item._count.id,
					})),
				),
			producersByCity: await this.repository.farm
				.groupBy({
					by: ["city"],
					_count: { id: true },
				})
				.then((results) =>
					results.map((item) => ({
						city: item.city,
						farmCount: item._count.id,
					})),
				),
			allCrops: await this.repository.crop
				.groupBy({
					by: ["name"],
					_count: { id: true },
					orderBy: { _count: { id: "desc" } },
				})
				.then((results) =>
					results.map((crop) => ({
						name: crop.name,
						count: crop._count.id,
					})),
				),
		};

		const producers = await this.repository.producer.findMany({
			select: {
				id: true,
				name: true,
				cpfCnpj: true,
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

		const producerStats = {};

		for (const producer of producers) {
			const farmsCount = producer.farms.length;
			let cropsCount = 0;
			let arableSum = 0;
			let vegetationSum = 0;
			const cropCountByName: Record<string, { count: number; area: number }> = {};

			const farms: {
				id: string;
				name: string;
				arableArea: number;
				vegetationArea: number;
				totalArea: number;
				harvests: {
					year: string;
					crops: {
						name: string;
						count: number;
						arableAreaUsed: number;
					}[];
				}[];
			}[] = [];

			for (const farm of producer.farms) {
				arableSum += farm.arableArea;
				vegetationSum += farm.vegetationArea;

				const harvestsByYear: Record<
					string,
					{ crops: Record<string, { count: number; arableAreaUsed: number }> }
				> = {};

				for (const harvest of farm.harvests) {
					const year = String(harvest.year);

					if (!harvestsByYear[year]) {
						harvestsByYear[year] = { crops: {} };
					}

					for (const crop of harvest.crops) {
						cropsCount++;
						if (!cropCountByName[crop.name]) {
							cropCountByName[crop.name] = { count: 0, area: 0 };
						}
						cropCountByName[crop.name].count += 1;
						cropCountByName[crop.name].area += crop.useArableArea ?? 0;

						if (!harvestsByYear[year].crops[crop.name]) {
							harvestsByYear[year].crops[crop.name] = { count: 0, arableAreaUsed: 0 };
						}
						harvestsByYear[year].crops[crop.name].count += 1;
						harvestsByYear[year].crops[crop.name].arableAreaUsed += crop.useArableArea ?? 0;
					}
				}

				const harvestsArray = Object.entries(harvestsByYear).map(([year, data]) => ({
					year,
					crops: Object.entries(data.crops).map(([name, cropStats]) => ({
						name,
						count: cropStats.count,
						arableAreaUsed: cropStats.arableAreaUsed,
					})),
				}));

				farms.push({
					id: farm.id,
					name: farm.name,
					arableArea: farm.arableArea,
					vegetationArea: farm.vegetationArea,
					totalArea: farm.arableArea + farm.vegetationArea,
					harvests: harvestsArray,
				});
			}

			const total = arableSum + vegetationSum;
			const arablePercentage = total > 0 ? (arableSum / total) * 100 : 0;
			const vegetationPercentage = total > 0 ? (vegetationSum / total) * 100 : 0;

			producerStats[`${producer.cpfCnpj}`] = {
				producerId: producer.id,
				producerName: producer.name,
				producerCpfCnpj: producer.cpfCnpj,
				totalFarms: farmsCount,
				totalCrops: cropsCount,
				totalArableArea: arableSum,
				totalVegetationArea: vegetationSum,
				totalArea: total,
				totalArablePercentage: Number(arablePercentage.toFixed(2)),
				totalVegetationPercentage: Number(vegetationPercentage.toFixed(2)),
				allCrops: Object.entries(cropCountByName)
					.sort(([, a], [, b]) => b.count - a.count)
					.map(([name, obj]) => ({
						name,
						count: obj.count,
						totalArableAreaUsed: obj.area,
					})),
				farms,
			};
		}

		return {
			all,
			...producerStats,
		};
	}
}
