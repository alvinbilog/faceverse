import { Router } from 'express';
import userRouter from '../controllers/userControllers';
import healthRouter from './health';

const router = Router();

router.use('./user', userRouter);
router.use('/health', healthRouter);

export default router;
