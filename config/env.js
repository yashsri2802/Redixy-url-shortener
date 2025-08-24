import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URL: z.string(), // local DB
    MONGODB_DATABASE_NAME: z.string(),
    MONGODB_URL_PROD: z.string(), // Atlas / production DB
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  })
  .parse(process.env);
