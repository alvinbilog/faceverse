import { Router } from 'express';
import userRouter from '../controllers/userControllers';
import healthRouter from './health';
import exampleRouter from '../controllers/exampleController';

const router = Router();

router.use('./user', userRouter);
router.use('/health', healthRouter);
router.use('/example', exampleRouter);

export default router;
