import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { prisma } from "prisma/seed";
import { AppModule } from "./domain/dashboard/app.module";
import { CustomLogger } from "./utils/customer-logger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new CustomLogger(),
	});

	app.enableCors({
		origin: "*",
	});

	app.use(helmet());

	const config = new DocumentBuilder()
		.setTitle("Farm Nestjs API")
		.setDescription("API for managing rural producers")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api-docs", app, document);

	await app.listen(process.env.PORT ?? 3000);

	console.log("\n\n\n🚀 Farm NESTJS API Server running on http://localhost:3000");

	setInterval(
		async () => {
			await prisma.producer.deleteMany({});
		},
		10 * 60 * 1000,
	);
}

bootstrap().catch((err) => {
	console.error("Failed to start Farm NESTJS API Server: ", err);
	process.exit(1);
});
