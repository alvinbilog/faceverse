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

export const signupValidator = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authValidator = {
  signupValidator,
  loginValidator,
};
