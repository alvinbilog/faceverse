import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError';

type CustomErrorExtended = CustomError & {
  status: number;
};

function errorHandler(
  err: CustomErrorExtended,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  res
    .status(err.statusCode || err.status || 500)
    .json({ success: false, error: err.message || 'Server Error' });
}
export default errorHandler;
