import { Router, Request, Response, NextFunction } from 'express';
import { CreateComment } from '../models/comment.model';
import { commentValidator } from '../utils/validators';
import commentServices from '../services/commentServices';

const commentRouter = Router();

commentRouter.route('/').post(createComment);
commentRouter.route('/').get(getComments);
commentRouter.route('/:id').get(getComment);
commentRouter.route('/update/:id').put(updateComment);
commentRouter.route('/delete/:id').delete(deleteComment);

export default commentRouter;
async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const requestBody = req.body as CreateComment;
    const commentData =
      commentValidator.createCommentValidator.parse(requestBody);
    const createdComment = await commentServices.create(commentData);
    res.status(200).json({ success: true, data: createdComment });
  } catch (e: any) {
    next(e);
  }
}

async function getComments(req: Request, res: Response, next: NextFunction) {
  const { select, populate } = req.query as {
    select?: string;
    populate?: string;
  };
  const comments = await commentServices.getComments(select, populate);
  try {
    res.status(200).json({ success: true, data: comments });
  } catch (e: any) {
    next(e);
  }
}
async function getComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { select, populate } = req.query as {
      select?: string;
      populate?: string;
    };
    const comments = await commentServices.getComment(id, select, populate);
    res.status(200).json({ success: true, data: comments });
  } catch (e: any) {
    next(e);
  }
}

async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const requestBody = req.body as CreateComment;
    const updatedData = await commentServices.updateComment(id, requestBody);
    res.status(200).json({ success: true, data: updatedData });
  } catch (e: any) {
    next(e);
  }
}
async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deletedData = await commentServices.deleteComment(id);
    res.status(200).json({ success: true, data: deletedData });
  } catch (e: any) {
    next(e);
  }
}
