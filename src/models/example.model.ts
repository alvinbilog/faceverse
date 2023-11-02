import mongoose, { Schema, Types, Model } from 'mongoose';
import { RequiredField } from '../utils';

// Document interface
export interface ExampleInterface {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
  interests?: Types.Array<string> | string[];
}
export type CreateExampleType = RequiredField<
  ExampleInterface,
  'name' | 'email'
>;
// Schema
const ExampleSchema = new Schema<ExampleInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  interests: [{ type: String }],
});

const ExampleModel = mongoose.model('Example', ExampleSchema);

export default ExampleModel;
