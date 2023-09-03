import mongoose, { Schema, Types } from 'mongoose';

export interface ReplyInterface {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  comment: Types.ObjectId;
  content: String;
  createdAt: Date;
  updatedAt: Date;
}

const ReplySchema = new Schema<ReplyInterface>({
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ReplyModel = mongoose.model('Reply', ReplySchema);

export default ReplyModel;
