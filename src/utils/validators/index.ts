import { z } from 'zod';

const createExampleValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

const updateExampleValidator = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  interests: z.array(z.string().optional()).optional(),
});

export const exampleValidator = {
  createExampleValidator,
  updateExampleValidator,
};
