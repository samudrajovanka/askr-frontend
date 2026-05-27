import type z from "zod";
import type { upsertRegistrySchema } from "./validator";

export type UpsertRegistryPayload = z.infer<typeof upsertRegistrySchema>;
