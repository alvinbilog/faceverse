import { Types } from 'mongoose';
import NotificationModel, {
  NotificationInterface,
} from '../models/notification.model';

const notificationServices = {
  createNotification,
  getNotificationsForUser,
  markNotificationAsRead,
};

export default notificationServices;

async function createNotification(
  notificationData: Partial<NotificationInterface>
) {
  const notification = await NotificationModel.create({ ...notificationData });
  return notification;
}
export async function getNotificationsForUser(
  recipientId: Types.ObjectId | string
) {
  const notifications = await NotificationModel.find({
    recipient: recipientId,
  });
  return notifications;
}

export async function markNotificationAsRead(
  notificationId: Types.ObjectId | string
): Promise<void> {
  await NotificationModel.findByIdAndUpdate(notificationId, { read: true });
}
