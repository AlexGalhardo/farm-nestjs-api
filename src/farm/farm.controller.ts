import { Controller, Post, Get, Param, Put, Delete, Body } from "@nestjs/common";
import { FarmService } from "./farm.service";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";

@Controller("farms")
export class FarmController {
	constructor(private readonly farmService: FarmService) {}

	@Post()
	create(@Body() dto: CreateFarmDto) {
		return this.farmService.create(dto);
	}

	@Get()
	findAll() {
		return this.farmService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.farmService.findOne(id);
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: UpdateFarmDto) {
		return this.farmService.update(id, dto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.farmService.remove(id);
	}
}
