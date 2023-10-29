import CommentModel from '../models/comment.model';
import UserModel, { UserInterface } from '../models/user.model';

const userServices = { getUsers, getUser, getUserPost, updateUser, delUser };

export default userServices;

async function getUsers(select?: string, populate?: string) {
  if (populate) {
    return UserModel.find().populate(populate).exec();
  } else if (select) {
    return UserModel.find()
      .select(select || '')
      .exec();
  }
  const allUsersData = await UserModel.find();
  return allUsersData;
}

async function getUser(id: string, select?: string, populate?: string) {
  if (populate) {
    return UserModel.findById(id)
      .select(select || '')
      .populate(populate)
      .exec();
  } else if (select) {
    return UserModel.findById(id)
      .select(select || '')
      .exec();
  }
  return UserModel.findById(id)
    .select(select || '')
    .exec();
}
async function getUserPost(id: string, select?: string, populate?: string) {
  let additionalPopulation: any[] = [];
  if (populate && populate.includes('posts')) {
    additionalPopulation.push({
      path: 'posts',
      populate: {
        path: 'comments',
        model: CommentModel,
        populate: {
          path: 'author',
          model: UserModel,
        },
      },
    });
  }

  return UserModel.findById(id)
    .select(select || '')
    .populate(additionalPopulation)
    .exec();
}
async function updateUser(id: string, requestBody: UserInterface) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, requestBody, {
    new: true,
  });
  return updatedUser;
}

async function delUser(id: string) {
  const deletedData = await UserModel.deleteOne({ _id: id });
  return deletedData;
}
