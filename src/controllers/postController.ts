import { Router, Request, Response, NextFunction } from 'express';
import postServices from '../services/postServices';
import { postValidator } from '../utils/validators';
import { CreatePostType, PostInterface } from '../models/post.model';
import { PostFields } from '../types';

const postRouter = Router();

postRouter.route('/').post(createPost);
postRouter.route('/').get(getPosts);
postRouter.route('/:id').get(getPost);
postRouter.route('/update/:id').put(updatePost);
postRouter.route('/delete/:id').delete(deletePost);

export default postRouter;
async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const requestBody = req.body as CreatePostType;
    const postData = postValidator.createPostValidator.parse(requestBody);
    const createdPost = await postServices.create(postData);
    res.status(200).json({ success: true, data: createdPost });
  } catch (e: any) {
    next(e);
  }
}
async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { select, populate } = req.query as {
      select?: string;
      populate?: string;
    };
    const posts = await postServices.getPosts(select, populate);
    res.status(200).json({ success: true, data: posts });
  } catch (e: any) {
    next(e);
  }
}
async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { select, populate } = req.query as {
      select?: string;
      populate?: string;
    };
    const posts = await postServices.getPost(id, select, populate);
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const requestBody = req.body as PostInterface;
    const postData = await postServices.updatePost(id, requestBody);
    res.status(200).json({ success: true, data: postData });
  } catch (e: any) {
    next(e);
  }
}
async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deletedPost = await postServices.deletePostById(id); // Call the service function
    res.status(200).json({ success: true, data: deletedPost });
  } catch (e: any) {
    next(e);
  }
}
