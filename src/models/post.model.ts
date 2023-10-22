import mongoose, { Schema, Types } from 'mongoose';
import { RequiredField } from '../utils';

export interface PostInterface {
  _id: Types.ObjectId;
  author: Types.ObjectId | string; // User Reference
  content: String;
  image?: String;
  likes?: (Types.ObjectId | string)[];
  comments?: (Types.ObjectId | string)[];
  hashtags?: Array<string> | string[];
  createdAt: Date;
  updatedAt: Date;
}
export type CreatePostType = RequiredField<PostInterface, 'author' | 'content'>;

const PostSchema = new Schema<PostInterface>({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  image: String,
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  hashtags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
