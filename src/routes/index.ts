import { Router } from 'express';
import userRouter from '../controllers/userControllers';
import healthRouter from './health';
import exampleRouter from '../controllers/exampleController';
import authRouter from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import postRouter from '../controllers/postController';
import commentRouter from '../controllers/commentController';
const router = Router();

router.use('/user', userRouter);
router.use('/health', healthRouter);
router.use('/example', exampleRouter);
router.use('/auth', authRouter);
router.use('/post', authMiddleware, postRouter);
router.use('/comment', authMiddleware, commentRouter);

// Apply the authMiddleware to protect the route
router.get('/protected-route', authMiddleware, (req, res) => {
  // This route is protected and requires authentication
  res.status(200).json({ message: 'Protected Route Accessed' });
});

export default router;
