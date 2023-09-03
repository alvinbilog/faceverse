import { Router, Request, Response, NextFunction } from 'express';
import { SignupFields } from '../types';
import { authValidator } from '../utils/validators';
import authService from '../services/authServices';

const authRouter = Router();

authRouter.route('/signup').post(signup);
authRouter.route('/signin').post(signin);
authRouter.route('/signout').post(signout);

export default authRouter;
async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const requestBody = req.body as SignupFields;
    const signupData = authValidator.signupValidator.parse(requestBody);
    await authService.signup(signupData);
    res.status(200).json({ success: true, data: signupData });
  } catch (e: any) {
    next(e);
  }
}
function signin(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
function signout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
