import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class CreateHarvestDto {
	@ApiProperty({
		example: "f7c2a1b9-3d4e-41c2-8a6e-5f7e7d1f98ab",
		description: "The UUID of the farm associated with this harvest",
	})
	@IsUUID()
	farmId: string;

	@ApiProperty({
		example: 2025,
		description: "The year the harvest takes place",
	})
	@IsNumber()
	year: number;
}
