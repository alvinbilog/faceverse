import mongoose, { Schema, Types } from 'mongoose';
import { RequiredField } from '../utils';
export interface CommentInterface {
  _id: Types.ObjectId;
  author: (Types.ObjectId | string)[];
  post: (Types.ObjectId | string)[];
  content?: string;
  replies?: (Types.ObjectId | string)[];
  createdAt: Date;
  updatedAt: Date;
}
export type CreateComment = RequiredField<
  CommentInterface,
  'author' | 'post' | 'content'
>;

const CommentSchema = new Schema<CommentInterface>({
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  content: String,
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
