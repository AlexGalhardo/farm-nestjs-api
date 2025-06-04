import { z } from "zod";

export const createFarmSchema = z
	.object({
		name: z.string(),
		city: z.string(),
		state: z.string(),
		totalArea: z.number(),
		agriculturalArea: z.number(),
		vegetationArea: z.number(),
		producerId: z.string().uuid(),
		arableArea: z.number().default(0),
	})
	.refine((data) => data.agriculturalArea + data.vegetationArea <= data.totalArea, {
		message: "A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.",
	});
