import mongoose, { Schema, Types } from 'mongoose';

export interface PostInterface {
  _id: Types.ObjectId;
  author: Types.ObjectId; // User Reference (assuming ObjectId)
  content: String;
  image?: String;
  likes?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  hashtags?: Array<string> | string[];
  createdAt: Date;
  updatedAt: Date;
}
const PostSchema = new Schema<PostInterface>({
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
