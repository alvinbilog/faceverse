import mongoose, { Schema, Types } from 'mongoose';

// Document interface
export interface UserInterface {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  friends?: Types.ObjectId[];
  posts?: Types.ObjectId[];
  notifications?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  accountType: string;
}

// Schema
const UserSchema = new Schema<UserInterface>({
  firstName: { type: String, required: [true, 'Please provide a first name'] },
  lastName: { type: String, required: [true, 'Please provide a last name'] },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  profilePicture: { type: String, default: 'default-profile.jpg' },
  bio: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accountType: { type: String, required: true, default: 'user' },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
