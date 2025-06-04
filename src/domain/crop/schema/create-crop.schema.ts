import { z } from "zod";

export const createCropSchema = z.object({
	harvestId: z.string().uuid(),
	farmId: z.string().uuid(),
	name: z
		.string()
		.min(4, "O nome deve ter pelo menos 4 caracteres")
		.max(32, "O nome deve ter no máximo 32 caracteres"),
	useArableArea: z.number().int().min(1, "A area que essa plantação vai usar precisa ser maior que 1"),
});
