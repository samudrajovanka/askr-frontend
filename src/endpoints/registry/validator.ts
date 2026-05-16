import { z } from "zod";

export const upsertRegistrySchema = z.object({
  registryUrl: z.url("Must be a valid URL").max(500, "URL is too long"),
  scope: z
    .string()
    .min(1, "Scope is required")
    .max(100, "Scope is too long")
    .transform((value) => value.trim().replace(/^@+/, "")),
  authToken: z.string().max(500, "Auth token is too long").optional(),
});

export type UpsertRegistryPayload = z.infer<typeof upsertRegistrySchema>;
