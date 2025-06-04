import { IsString, Matches } from "class-validator";

export class CreateProducerDto {
	@IsString()
	name: string;

	@Matches(/^(\d{11}|\d{14})$/, { message: "CPF ou CNPJ inválido" })
	cpfCnpj: string;
}
