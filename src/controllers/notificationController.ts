import { Request, Response, NextFunction, Router } from 'express';
import notificationServices from '../services/notificationServices';
import authMiddleware from '../middlewares/authMiddleware';

const notificationRouter = Router();

notificationRouter.route('/').post(authMiddleware, createNotif);

notificationRouter.route('/:recipientId').get(authMiddleware, getNotifications);

notificationRouter.route('/:notificationId').put(authMiddleware, markAsRead);

export default notificationRouter;
export async function createNotif(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { recipient, sender, type, content } = req.body;
    const notification = await notificationServices.createNotification({
      recipient,
      sender,
      type,
      content,
      read: false,
    });
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
}

export async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { recipientId } = req.params;

    const notifications = await notificationServices.getNotificationsForUser(
      recipientId
    );
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { notificationId } = req.params;

    await notificationServices.markNotificationAsRead(notificationId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
