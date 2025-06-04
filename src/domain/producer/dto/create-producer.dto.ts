import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class CreateProducerDto {
	@ApiProperty({
		example: "John Doe",
		description: "The name of the producer",
	})
	@IsString()
	name: string;

	@ApiProperty({
		example: "12345678901",
		description: "The CPF (11 digits) or CNPJ (14 digits) of the producer",
	})
	@Matches(/^(\d{11}|\d{14})$/, {
		message: "Invalid CPF or CNPJ format. It must contain exactly 11 or 14 digits.",
	})
	cpfCnpj: string;
}
