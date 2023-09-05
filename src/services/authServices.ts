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

  if (!user) {
    throw new CustomError('User not found', 400);
  } else {
    await bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw new CustomError('Wrong password', 400);
      } else if (isMatch) {
        // Passwords match, create token data
        const tokenData = {
          id: user._id,
          email: user.email,
        };
        // create token
        const token = jwt.sign(tokenData, configVars.JWT_SECRET_TOKEN, {
          expiresIn: '1h',
        });
        return token;
      } else {
        throw new CustomError(
          'Password does not math, authentication failed',
          400
        );
      }
    });
  }
}
