import { cnpj, cpf } from "cpf-cnpj-validator";
import { z } from "zod";

export const createProducerSchema = z.object({
	name: z
		.string()
		.min(4, "O nome deve ter pelo menos 4 caracteres")
		.max(32, "O nome deve ter no máximo 32 caracteres"),
	cpfCnpj: z.string().refine((val) => {
		const cleaned = val.replace(/[.\-\/]/g, "");

		if (cleaned.length === 11) {
			return cpf.isValid(cleaned);
		} else if (cleaned.length === 14) {
			return cnpj.isValid(cleaned);
		}
		return false;
	}, "CPF ou CNPJ inválido"),
});
