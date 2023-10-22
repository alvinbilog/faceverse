import { z } from 'zod';

// Example
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

// Signup and Signin
export const signupValidator = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const signinValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authValidator = {
  signupValidator,
  signinValidator,
};

// Post
export const createPostValidator = z.object({
  author: z.string(),
  content: z.string(),
  image: z.string().optional(),
  likes: z.array(z.string()).optional(),
  comments: z.array(z.string()).optional(),
  hashtag: z.array(z.string()).optional(),
});

export const postValidator = {
  createPostValidator,
};

export const createCommentValidator = z.object({
  author: z.array(z.string()),
  post: z.array(z.string()),
  content: z.string().default(''),
  replies: z.array(z.string()).optional(),
});

export const commentValidator = {
  createCommentValidator,
};
