import mongoose, { Schema, Types } from 'mongoose';

export interface CommentInterface {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: String;
  replies?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<CommentInterface>({
  author: [{ types: Schema.Types.ObjectId, ref: 'User' }],
  post: [{ types: Schema.Types.ObjectId, ref: 'Post' }],
  content: String,
  replies: [{ types: Schema.Types.ObjectId, ref: 'Reply' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
