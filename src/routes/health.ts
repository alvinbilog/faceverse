import { Router, Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError';

const healthRouter: Router = Router();

healthRouter.route('/').get(health);
healthRouter.route('/test-error').get(testError);

export default healthRouter;

function health(_req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ success: true });
}
function testError(_req: Request, res: Response, next: NextFunction) {
  try {
    throw new CustomError('Error', 400);
  } catch (e) {
    next(e);
  }
}
