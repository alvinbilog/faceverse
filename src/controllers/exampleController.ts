import { Router, Request, Response, NextFunction } from 'express';
import exampleServices from '../services/exampleServices';

import { exampleValidator } from '../utils/validators';
import authMiddleware from '../middlewares/authMiddleware';
import { CreateExampleType, ExampleInterface } from '../models/example.model';

const exampleRouter = Router();

exampleRouter.route('/create').post(create);
exampleRouter.route('/get-all').get(getAll);
exampleRouter.route('/get/:id').get(getById);
exampleRouter.route('/update/:id').put(update);
exampleRouter.route('/delete/:id').delete(del);

export default exampleRouter;
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const requestBody = req.body as CreateExampleType;
    const validationResult =
      exampleValidator.createExampleValidator.parse(requestBody);
    const createdExample = await exampleServices.create(validationResult);
    res.status(200).json({ success: true, data: createdExample });
  } catch (e: any) {
    next(e);
  }
}
async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { interests, select } = req.query as {
      interests?: string;
      select?: string;
    };
    const exampleData = await exampleServices.getAll(interests, select);
    res.status(200).json({ success: true, data: exampleData });
  } catch (e: any) {
    next(e);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { select } = req.query as { select: string };

    const example = await exampleServices.getById(id, select);
    res.status(200).json({ success: true, data: example });
  } catch (e: any) {
    next(e);
  }
}
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const requestBody = req.body as ExampleInterface;
    const updatedExample = await exampleServices.update(id, requestBody);
    res.status(200).json({ success: true, data: updatedExample });
  } catch (e: any) {
    next(e);
  }
}
async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedExample = await exampleServices.del(id);
    res.status(200).json({ success: true, data: deletedExample });
  } catch (e: any) {
    next(e);
  }
}
