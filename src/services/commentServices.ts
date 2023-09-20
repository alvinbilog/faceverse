import { Types } from 'mongoose';
import { CreateComment } from '../models/comment.model';
import CommentModel from '../models/comment.model';
const commentServices = {
  create,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};

export default commentServices;

async function create(commentData: CreateComment) {
  const createComment = await CommentModel.create({ ...commentData });

  return createComment;

  // await PostModel.appendCommentToPost(commentData.post, createComment._id);
}
async function getComments(select?: string | undefined, populate?: string) {
  if (populate) {
    return CommentModel.find().populate(populate).exec();
  } else if (select) {
    return CommentModel.find()
      .select(select || '')
      .exec();
  }
  return CommentModel.find()
    .select(select || '')
    .exec();
}
async function getComment(
  id: Types.ObjectId | string,
  select?: string | undefined,
  populate?: string
) {
  if (populate) {
    return CommentModel.findById({ _id: id }).populate(populate).exec();
  } else if (select) {
    return CommentModel.findById({ _id: id })
      .select(select || '')
      .exec();
  }
  return CommentModel.find({ _id: id })
    .select(select || '')
    .exec();
}
async function updateComment(id: string, requestBody: CreateComment) {
  const updatedComment = await CommentModel.findByIdAndUpdate(id, requestBody, {
    new: true,
  });
  return updatedComment;
}
async function deleteComment(id: string) {
  const deletedData = await CommentModel.deleteOne({ _id: id });
  return deletedData;
}
