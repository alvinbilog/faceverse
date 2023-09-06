import { Router, Request, Response, NextFunction } from 'express';
import { SigninFields, SignupFields } from '../types';
import { authValidator } from '../utils/validators';
import authService from '../services/authServices';
import configVars from '../configs/index.config';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import UserModel from '../models/user.model';

const authRouter = Router();

authRouter.route('/signup').post(signup);
authRouter.route('/signin').post(signin);
authRouter.route('/signout').post(signout);
authRouter.route('/refresh').post(refresh);

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
    const tokens = await authService.signin({ email, password });

    // set accessToken as cookie
    res.cookie('accessToken', tokens.accessToken, {
      maxAge: 3600000, // Adjust expiration time as needed
      httpOnly: true,
    });
    //refresh

    res.status(200).json({ success: true, message: 'Successfully Login' });
  } catch (e: any) {
    next(e);
  }
}
function refresh(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
  const refreshToken = cookies.jwt;

  // verification
  jwt.verify(
    refreshToken,
    configVars.REFRESH_TOKEN_SECRET,
    async (err: VerifyErrors | null, decoded: any) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      const foundUser = await UserModel.findOne({ email: decoded.email });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
      {
        const accessToken = jwt.sign(
          {
            email: foundUser.email,
          },
          configVars.ACCESS_TOKEN_SECRET,
          { expiresIn: '1D' }
        );
        res.json({ accessToken });
      }
    }
  );
}
function signout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
