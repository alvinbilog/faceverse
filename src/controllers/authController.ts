import { Router, Request, Response, NextFunction } from 'express';
import { SigninFields, SignupFields } from '../types';
import { authValidator } from '../utils/validators';
import authServices from '../services/authServices';
import configVars from '../configs/index.config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user.model';

const authRouter = Router();

authRouter.route('/signup').post(signup);
authRouter.route('/signin').post(signin);
authRouter.route('/signout').post(signout);
authRouter.route('/refresh').get(refresh);

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
    await authServices.signup({ firstName, lastName, email, password });
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
    const signinData = authValidator.signinValidator.parse({ email, password });
    const { accessToken, refreshToken } = await authServices.signin(signinData);

    // Set accessToken and refreshToken as separate cookies
    res.cookie('accessToken', accessToken, {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: { accessToken, refreshToken },
    });
  } catch (e: any) {
    next(e);
  }
}
async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log('refresh token');
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      configVars.REFRESH_TOKEN_SECRET
    ) as JwtPayload;
    console.log('decoded');
    console.log(decoded);
    // Find the user based on the decoded email
    const foundUser = await UserModel.findOne({ email: decoded.email });
    console.log('found user');
    console.log(foundUser);
    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
      },
      configVars.ACCESS_TOKEN_SECRET,
      { expiresIn: '1D' }
    );
    res.cookie('accessToken', accessToken, {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
    });

    res.json({ accessToken });
  } catch (err) {
    // Handle any errors that occur during token verification or user lookup
    res.status(403).json({ message: 'Forbidden' });
  }
}

function signout(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies || !cookies.accessToken || !cookies.refreshToken) {
    return res.status(204).json({ success: true }); // no content
  }

  // Clear both accessToken and refreshToken cookies
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.status(200).json({ success: true });
}
