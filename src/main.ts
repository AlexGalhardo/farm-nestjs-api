import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: "*",
	});

	app.use(helmet());

	const config = new DocumentBuilder()
		.setTitle("Brain Agriculture API")
		.setDescription("API para gestão de produtores rurais")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT ?? 3000);
	console.log("Brain Agriculture API Server running on localhost:3000");
}

bootstrap().catch((err) => {
	console.error("Failed to start application:", err);
	process.exit(1);
});
