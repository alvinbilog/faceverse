import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/userServices';
import { UserInterface } from '../models/user.model';

const userRouter = Router();

userRouter.route('/').get(getUsers);
userRouter.route('/:id').get(getUser);
userRouter.route('/posts/:id').get(handleGetUserPost);
userRouter.route('/update/:id').put(updateUser);
userRouter.route('/delete/:id').delete(deleteUser);

export default userRouter;
async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { select, populate } = req.query as {
      select?: string;
      populate?: string;
    };
    const allUsers = await userServices.getUsers(select, populate);
    res.status(200).json({ success: true, data: allUsers });
  } catch (e: any) {
    next(e);
  }
}
async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { select, populate } = req.query as {
      select?: string;
      populate?: string;
    };
    const userData = await userServices.getUser(id, select, populate);
    res.status(200).json({ success: true, data: userData });
  } catch (e: any) {
    next(e);
  }
}
async function handleGetUserPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { select, populate } = req.query as {
      select?: string;
      populate?: string;
    };
    const userData = await userServices.getUserPost(id, select, populate);
    res.status(200).json({ success: true, data: userData });
  } catch (e: any) {
    next(e);
  }
}
async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const requestBody = req.body as UserInterface;
    const updatedUser = await userServices.updateUser(id, requestBody);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (e: any) {
    next(e);
  }
}
async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const delUser = await userServices.delUser(id);
    res.status(200).json({ success: true, data: delUser });
  } catch (e: any) {
    next(e);
  }
}
