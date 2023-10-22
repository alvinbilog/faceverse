import { Request, Response, Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import UserModel from '../models/user.model';

const meRouter = Router();

meRouter.route('/').get(getUserDetails);

async function getUserDetails(req: Request, res: Response) {
  try {
    const userEmail = req.email;
    if (!userEmail) {
      return res.status(400).json({ message: 'Email not found in token' });
    }

    const user = await UserModel.findOne({ email: userEmail }).select(
      '-password'
    ); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export default meRouter;
