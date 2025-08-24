import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  APP_BASE_URL: z.string().url(),
});

export function getEnv() {
  return envSchema.parse(process.env);
}
