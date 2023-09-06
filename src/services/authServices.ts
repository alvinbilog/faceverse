import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import { SigninFields, SignupFields } from '../types';
import CustomError from '../errors/customError';
import jwt from 'jsonwebtoken';
import configVars from '../configs/index.config';

const authService = { signup, signin };

export default authService;

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
async function signin({ email, password }: SigninFields) {
  const user = await UserModel.findOne({ email });
  if (!email || !password) {
    throw new CustomError('User not found or Password not found', 400);
  }
  if (!user) {
    throw new CustomError('Unauthorized', 401);
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new CustomError('Unauthorized', 401);

  // password match?; create token data
  const tokenData = {
    id: user._id,
    email: user.email,
  };

  //access token
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    configVars.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    }
  );
  // create refresh token
  const refreshToken = jwt.sign(
    { email: user.email },
    configVars.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' }
  );
  return { accessToken };
}
