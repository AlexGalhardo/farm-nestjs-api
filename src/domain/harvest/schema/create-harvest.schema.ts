import { z } from "zod";

const currentYear = new Date().getFullYear();

export const createHarvestSchema = z.object({
	farmId: z.string().uuid(),
	year: z
		.number()
		.min(2000, { message: "Year must be 2000 or later" })
		.max(currentYear, { message: `Year cannot be after ${currentYear}` }),
});
