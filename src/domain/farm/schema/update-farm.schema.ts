import { createFarmSchema } from "./create-farm.schema";

export const updateFarmSchema = (createFarmSchema as any)._def.schema.partial();
