import { IsString, IsUUID } from "class-validator";

export class CreateCropDto {
	@IsString()
	@IsUUID()
	harvestId: string;

	@IsString()
	@IsUUID()
	farmId: string;

	@IsString()
	name: string;

	@IsString()
	useArableArea: number;
}
