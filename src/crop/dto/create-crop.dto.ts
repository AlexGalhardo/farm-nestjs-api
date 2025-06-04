import { IsString } from "class-validator";

export class CreateCropDto {
	@IsString()
	harvestId: string;

	@IsString()
	name: string;

	@IsString()
	season: string;

	@IsString()
	farmId: string;
}
