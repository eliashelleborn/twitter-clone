import { isAuthenticated } from '../utils/permissions';

const authRequired = isAuthenticated.createResolver;

// Queries
const getUsers = authRequired((parent, args, { models }) => models.User.find());
const getUser = authRequired(async (parent, args, { models, user: authedUser }) => {
  const user = await models.User.findOne(args);
  const following = await models.Follow.count({ follower: authedUser, followee: user._id });
  const followingMe = await models.Follow.count({ follower: user._id, followee: authedUser });

  user.relation = {
    following: following >= 1,
    followingMe: followingMe >= 1,
  };

  return user;
});

// Mutations
const updateUser = authRequired(async (parent, args, { models, user }) => {
  const userToUpdate = await models.User.findOne({ _id: user });
  userToUpdate.set(args);
  return userToUpdate.save();
});
const deleteUser = authRequired(async (parent, args, { models, user }) => {
  const userToDelete = await models.User.findOne({ _id: user });
  return userToDelete.remove();
});

export default {
  Query: {
    getUsers,
    getUser,
  },
  Mutation: {
    updateUser,
    deleteUser,
  },
};
