import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "validation.username-required" }),
  password: z.string().min(1, { message: "validation.password-required" }),
});
