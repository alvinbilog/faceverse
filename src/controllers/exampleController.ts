import { Router, Request, Response, NextFunction } from 'express';
import exampleServices from '../services/exampleServices';
import { CreateExampleType, ExampleInterface } from '../models/Example.model';
import { RequiredField } from '../utils';
import { exampleValidator } from '../utils/validators';

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
function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}

function getById(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
function update(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
function del(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ success: true });
  } catch (e: any) {
    next(e);
  }
}
