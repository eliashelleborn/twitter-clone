import _ from 'lodash';
import { isAuthenticated } from '../utils/permissions';
import { NotFoundError } from '../utils/errors';

const authRequired = isAuthenticated.createResolver;

// Queries
const getFollowers = authRequired(async (parent, args, { models: { Follow }, user }) => {
  const followers = await Follow.find({ followee: user }).populate('follower');
  const users = _.map(followers, 'follower');
  return users;
});
const getFollowing = authRequired(async (parent, args, { models: { Follow }, user }) => {
  const following = await Follow.find({ follower: user }).populate('followee');
  const users = _.map(following, 'followee');
  return users;
});

// Mutations
const toggleFollow = authRequired(async (parent, args, { models: { Follow, User }, user }) => {
  // Check if the userId given exists
  const userExists = await User.count({ _id: args.userId });
  if (userExists > 0) {
    // Check if given user is already being followed by the authenticated user
    const followDoc = await Follow.findOne({ followee: args.userId, follower: user });
    if (!followDoc) {
      // If both conditions are passed, create new 'Follow'
      const newFollow = new Follow({
        followee: args.userId,
        follower: user,
      });
      // Update both users stats
      User.findOneAndUpdate({ _id: user }, { $inc: { 'stats.followingCount': 1 } }).exec();
      User.findOneAndUpdate({ _id: args.userId }, { $inc: { 'stats.followersCount': 1 } }).exec();
      return { follow: newFollow.save(), action: 'Followed' };
    }
    // If authenticated user already follows the given user remove 'Follow' and update user stats
    User.findOneAndUpdate({ _id: user }, { $inc: { 'stats.followingCount': -1 } }).exec();
    User.findOneAndUpdate({ _id: args.userId }, { $inc: { 'stats.followersCount': -1 } }).exec();
    return { follow: followDoc.remove(), action: 'Unfollowed' };
  }
  // Return not found if given user doesnt exist at all
  return new NotFoundError();
});

export default {
  Query: {
    getFollowers,
    getFollowing,
  },
  Mutation: {
    toggleFollow,
  },
};
