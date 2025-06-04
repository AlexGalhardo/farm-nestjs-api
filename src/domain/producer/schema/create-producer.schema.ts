import { z } from "zod";

export const createProducerSchema = z.object({
	name: z
		.string()
		.min(4, "O nome deve ter pelo menos 2 caracteres")
		.max(32, "O nome deve ter no máximo 32 caracteres"),
	cpfCnpj: z.string().regex(/^(\d{11}|\d{14})$/, "CPF ou CNPJ inválido"),
});
