import { z } from "zod";

export const createHarvestSchema = z.object({
	farmId: z.string().uuid(),
	year: z.number(),
});
