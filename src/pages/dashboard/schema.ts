import { z } from 'zod';

export const UpdateAndCreateUserFormSchema = z.object({
  username: z.string().min(1, { message: 'validation.username-required' }),
  email: z.string().min(1, { message: 'validation.email-required' }),
  age: z.string().min(1, { message: 'validation.age-required' }),
  role: z.string().min(1, { message: 'validation.role-required' }),
});
