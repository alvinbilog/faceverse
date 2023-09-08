import { Router, Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.route('/').get(example);
userRouter.route('/example-user/:id').get(authMiddleware, getUserExample);

export default userRouter;
function example(_req: Request, res: Response) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e.message);
  }
}
function getUserExample(_req: Request, res: Response, next: NextFunction) {
  try {
  } catch (e: any) {
    next(e);
  }
}
