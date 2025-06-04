import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Brain Agriculture API")
		.setDescription("API para gestão de produtores rurais")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT ?? 3000);
	console.log("api is running on localhost:3000");
}
bootstrap().catch((err) => {
	console.error("Failed to start application:", err);
	process.exit(1);
});
