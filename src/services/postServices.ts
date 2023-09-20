import { Types } from 'mongoose';
import PostModel, { CreatePostType, PostInterface } from '../models/post.model';
import { PostFields } from '../types';
const postServices = {
  create,
  getPosts,
  getPost,
  updatePost,
  appendCommentToPost,
  deletePostById,
};

export default postServices;

async function create(postData: CreatePostType) {
  const createdPost = await PostModel.create({ ...postData });
  return createdPost;
}

async function getPosts(select?: string | undefined, populate?: string) {
  if (populate) {
    return PostModel.find()
      .select(select || '')
      .populate(populate)
      .exec();
  }
  return PostModel.find()
    .select(select || '')
    .exec();
}

async function getPost(id: string, select?: string, populate?: string) {
  if (populate) {
    return PostModel.findById(id)
      .select(select || '')
      .populate(populate)
      .exec();
  }
  return PostModel.findById(id)
    .select(select || '')
    .exec();
}
async function updatePost(id: string, requestBody: PostInterface) {
  const updatedPost = await PostModel.findByIdAndUpdate(id, requestBody, {
    new: true,
  });
  return updatedPost;
}
async function appendCommentToPost(
  author: string[],
  post: string[],
  content: string[],
  replies: string[]
) {
  return PostModel.findByIdAndUpdate(
    author,
    { $push: { post: post } },
    { new: true }
  );
}

async function deletePostById(id: string) {
  const deletedPost = await PostModel.deleteOne({ _id: id });
  return deletedPost;
}
