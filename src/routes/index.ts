import { Router } from 'express';
import userRouter from '../controllers/userControllers';
import healthRouter from './health';
import exampleRouter from '../controllers/exampleController';
import authRouter from '../controllers/authController';

const router = Router();

router.use('./user', userRouter);
router.use('/health', healthRouter);
router.use('/example', exampleRouter);
router.use('/auth', authRouter);

export default router;
