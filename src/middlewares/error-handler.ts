import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError';
import { ZodError, z } from 'zod';

type CustomErrorExtended = CustomError & {
  status: number;
};

type CustomZodIssue = {
  code: z.ZodIssueCode;
  path: (string | number)[];
  message: string;
};

function errorHandler(
  err: CustomErrorExtended,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let errorMessage = err.message;
  if (err.name === 'ZodError') {
    const zodErrorArray = JSON.parse(err.message) as CustomZodIssue[];
    const zodErrorMessage = zodErrorArray.map((zodError) => {
      return `${zodError.path}: ${zodError.message}`;
    });
    errorMessage = zodErrorMessage.join(';');
  }
  console.log(err);
  res
    .status(err.statusCode || err.status || 500)
    .json({ success: false, error: errorMessage || 'Server Error' });
}
export default errorHandler;
