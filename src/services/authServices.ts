import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { SigninFields, SignupFields } from '../types';
import CustomError from '../errors/customError';
import jwt from 'jsonwebtoken';
import configVars from '../configs/index.config';

const authServices = { signup, signin };

export default authServices;

const saltRounds = 10;

async function signup({ firstName, lastName, email, password }: SignupFields) {
  // hashing password
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return null;
}
async function signin(signinData: SigninFields) {
  // identify if user exist
  const user = await UserModel.findOne({ email: signinData.email });
  if (!signinData.email || !signinData.password) {
    throw new CustomError('User and Password are required', 400);
  }
  if (!user) {
    throw new CustomError('The email is not valid', 401);
  }
  const match = await bcrypt.compare(signinData.password, user.password);

  if (!match) throw new CustomError('Incorrect email or password', 401);

  //access token
  const accessToken: string = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    configVars.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30h',
    }
  );
  //refresh token
  const refreshToken: string = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    configVars.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '30d',
    }
  );

  return { accessToken, refreshToken };
}
