import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateFarmDto {
	@IsString()
	@IsUUID()
	producerId: string;

	@IsString()
	name: string;

	@IsString()
	city: string;

	@IsString()
	state: string;

	@IsNumber()
	totalArea: number;

	@IsNumber()
	@IsOptional()
	arableArea?: number;

	@IsNumber()
	vegetationArea: number;

	@IsNumber()
	agriculturalArea: number;
}
