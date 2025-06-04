import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateFarmDto {
	@ApiProperty({
		example: "a1c2d3e4-5678-90ab-cdef-1234567890ab",
		description: "The UUID of the producer who owns the farm",
	})
	@IsUUID()
	producerId: string;

	@ApiProperty({
		example: "Green Valley Farm",
		description: "The name of the farm",
	})
	@IsString()
	name: string;

	@ApiProperty({
		example: "Springfield",
		description: "The city where the farm is located",
	})
	@IsString()
	city: string;

	@ApiProperty({
		example: "Illinois",
		description: "The state where the farm is located",
	})
	@IsString()
	state: string;

	@ApiProperty({
		example: 100.0,
		description: "Total area of the farm in hectares",
	})
	@IsNumber()
	totalArea: number;

	@ApiPropertyOptional({
		example: 60.0,
		description: "Optional arable area of the farm in hectares",
	})
	@IsNumber()
	@IsOptional()
	arableArea?: number;

	@ApiProperty({
		example: 30.0,
		description: "Vegetation area of the farm in hectares",
	})
	@IsNumber()
	vegetationArea: number;

	@ApiProperty({
		example: 70.0,
		description: "Agricultural area of the farm in hectares",
	})
	@IsNumber()
	agriculturalArea: number;
}
