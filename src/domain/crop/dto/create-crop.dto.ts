import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateCropDto {
	@ApiProperty({
		example: "b3c11d46-4a9f-4b21-bc89-8d04f80b7a63",
		description: "The UUID of the harvest associated with this crop",
	})
	@IsUUID()
	harvestId: string;

	@ApiProperty({
		example: "e9e0f48f-35f1-4c49-9d53-d8d7959c9c56",
		description: "The UUID of the farm where the crop will be planted",
	})
	@IsUUID()
	farmId: string;

	@ApiProperty({
		example: "Soybean",
		description: "The name of the crop",
	})
	@IsString()
	name: string;

	@ApiProperty({
		example: 15.5,
		description: "The arable area used (in hectares)",
	})
	@IsNumber()
	useArableArea: number;
}
