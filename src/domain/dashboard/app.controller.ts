import { BadRequestException, Controller, Get } from "@nestjs/common";
import { CustomLogger } from "../../utils/customer-logger";
import { getErrorMessage, getErrorStack } from "../../utils/functions";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	private readonly logger = new CustomLogger();

	constructor(private readonly appService: AppService) {}

	@Get("/")
	async getDashboard() {
		try {
			const result = await this.appService.getDashboard();
			return { success: true, data: result };
		} catch (error: unknown) {
			this.logger.error("Error fetching dashboard", getErrorStack(error));
			throw new BadRequestException({
				success: false,
				error: getErrorMessage(error) || "Unknown error while fetching dashboard",
			});
		}
	}
}
