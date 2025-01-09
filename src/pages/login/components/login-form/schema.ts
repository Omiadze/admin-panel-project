import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "validation.username-required" }), // Validate as non-empty string
  password: z.string().min(1, { message: "validation.password-required" }),
});
