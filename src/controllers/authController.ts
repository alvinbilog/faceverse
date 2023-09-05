import { Router, Request, Response, NextFunction } from 'express';
import { SigninFields, SignupFields } from '../types';
import { authValidator } from '../utils/validators';
import authService from '../services/authServices';

const authRouter = Router();

authRouter.route('/signup').post(signup);
authRouter.route('/signin').post(signin);
authRouter.route('/signout').post(signout);

export default authRouter;
async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, password } = req.body as SignupFields;
    const signupData = authValidator.signupValidator.parse({
      firstName,
      lastName,
      email,
      password,
    });
    await authService.signup({ firstName, lastName, email, password });
    res.status(201).json({
      success: true,
      data: signupData,
      message: 'User created successfully',
    });
  } catch (e: any) {
    next(e);
  }
}
async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as SigninFields;
    const token = await authService.signin({ email, password });
    res.cookie('token', token, {
      maxAge: 3600000,
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: 'Successfully Login' });
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
