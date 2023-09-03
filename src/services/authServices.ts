import ExampleModel, {
  CreateExampleType,
  ExampleInterface,
} from '../models/example.model';
import UserModel from '../models/user.model';
import { SignupFields } from '../types';

const authService = { signup };

export default authService;

async function signup(signupData: SignupFields) {
  await UserModel.create({ ...signupData });
  return null;
}
