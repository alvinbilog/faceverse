import { Types } from 'mongoose';
import PostModel, { CreatePostType, PostInterface } from '../models/post.model';
import UserModel from '../models/user.model';

const postServices = {
  create,
  getPosts,
  getPost,
  updatePost,
  appendCommentToPost,
  appendPostToUser,
  likeToPost,
  deletePostById,
};

export default postServices;

async function create(postData: CreatePostType) {
  const createdPost = await PostModel.create({ ...postData });
  await postServices.appendPostToUser(postData?.author, createdPost._id);
  return createdPost;
}

async function getPosts(select?: string | undefined, populate?: string) {
  if (populate) {
    // return PostModel.find()
    //   .select(select || '')
    //   .populate(populate)
    //   .exec();

    //nested population
    return PostModel.find()
      .populate('author')
      .populate({
        path: 'comments',
        populate: { path: 'author' },
      })
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
  postId: (Types.ObjectId | string)[],
  commentId: Types.ObjectId | string
) {
  return PostModel.findByIdAndUpdate(
    postId,
    { $push: { comments: commentId } },
    { new: true }
  );
}

async function appendPostToUser(
  userId: Types.ObjectId | string,
  postId: Types.ObjectId | string
) {
  return UserModel.findByIdAndUpdate(
    userId,
    { $push: { posts: postId } },
    { new: true }
  );
}

async function likeToPost(id: string) {
  const post = await PostModel.findByIdAndUpdate(
    id,
    { $push: { likes: id } },
    { new: true }
  );

  if (!post) {
    throw new Error('Post not found');
  }
  if (post.likes?.includes(id)) {
    throw new Error('You already liked this post');
  }

  return post.likes?.push(id);
}

async function deletePostById(id: string) {
  const deletedPost = await PostModel.deleteOne({ _id: id });

  // Remove the post's reference from the posts array in UserModel
  await UserModel.updateMany({ posts: id }, { $pull: { posts: id } });
  return deletedPost;
}
