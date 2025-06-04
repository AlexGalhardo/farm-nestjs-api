import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CropController } from "./domain/crop/crop.controller";
import { CropService } from "./domain/crop/crop.service";
import { FarmController } from "./domain/farm/farm.controller";
import { FarmService } from "./domain/farm/farm.service";
import { HarvestController } from "./domain/harvest/harvest.controller";
import { HarvestService } from "./domain/harvest/harvest.service";
import { ProducerController } from "./domain/producer/producer.controller";
import { ProducerService } from "./domain/producer/producer.service";
import { RepositoryModule } from "./repository/repository.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRoot([
			{
				ttl: 1000,
				limit: 1,
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
