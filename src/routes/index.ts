import { Router } from 'express';
import userRouter from '../controllers/userControllers';
import healthRouter from './health';
import exampleRouter from '../controllers/exampleController';
import authRouter from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import postRouter from '../controllers/postController';
import commentRouter from '../controllers/commentController';
import notificationRouter from '../controllers/notificationController';
import meRouter from '../controllers/meController';
const router = Router();

router.use('/user', authMiddleware, userRouter);
router.use('/health', healthRouter);
router.use('/example', exampleRouter);
router.use('/auth', authRouter);
router.use('/post', authMiddleware, postRouter);
router.use('/comment', authMiddleware, commentRouter);
router.use('/notification', authMiddleware, notificationRouter);
router.use('/me', authMiddleware, meRouter);
// Apply the authMiddleware to protect the route
router.get('/protected-route', authMiddleware, (req, res) => {
  // This route is protected and requires authentication
  res.status(200).json({ message: 'Protected Route Accessed' });
});

export default router;
