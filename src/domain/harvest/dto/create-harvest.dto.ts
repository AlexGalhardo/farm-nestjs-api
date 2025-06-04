import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateHarvestDto {
	@IsString()
	@IsUUID()
	farmId: string;

	@IsNumber()
	year: number;
}
