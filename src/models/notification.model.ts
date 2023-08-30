import mongoose, { Schema, Types } from 'mongoose';

export interface NotificationInterface {
  _id: Types.ObjectId;
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  type: String;
  content: String;
  read: Boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<NotificationInterface>({
  recipient: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sender: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  type: String,
  content: String,
  read: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export default NotificationModel;
