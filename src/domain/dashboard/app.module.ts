import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { RepositoryModule } from "../../repository/repository.module";
import { CropController } from "../crop/crop.controller";
import { CropService } from "../crop/crop.service";
import { FarmController } from "../farm/farm.controller";
import { FarmService } from "../farm/farm.service";
import { HarvestController } from "../harvest/harvest.controller";
import { HarvestService } from "../harvest/harvest.service";
import { ProducerController } from "../producer/producer.controller";
import { ProducerService } from "../producer/producer.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRoot([
			{
				ttl: 1000,
				limit: 100,
			},
		]),
		RepositoryModule,
	],
	controllers: [AppController, ProducerController, FarmController, HarvestController, CropController],
	providers: [
		AppService,
		ProducerService,
		FarmService,
		HarvestService,
		CropService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
