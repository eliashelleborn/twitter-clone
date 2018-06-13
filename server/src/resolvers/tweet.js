import { isAuthenticated } from '../utils/permissions';
import { UnauthorizedError, NotFoundError } from '../utils/errors';

const authRequired = isAuthenticated.createResolver;

// Queries
const getTweets = authRequired((parent, args, { models }) => models.Tweet.find());
const getTweetById = authRequired((parent, args, { models }) => models.Tweet.findOne(args));

// Mutations
const createTweet = authRequired((parent, args, { models, user }) => {
  const Tweet = new models.Tweet({
    text: args.text,
    author: user,
  });
  return Tweet.save();
});

const updateTweet = authRequired(async (parent, args, { models, user }) => {
  const Tweet = await models.Tweet.findOne({ _id: args._id });
  if (!Tweet) {
    return new NotFoundError();
  }
  if (Tweet.author.toString() === user) {
    Tweet.set({ text: args.text });
    return Tweet.save();
  }
  return new UnauthorizedError();
});

const deleteTweet = authRequired(async (parent, args, { models, user }) => {
  const Tweet = await models.Tweet.findOne({ _id: args._id });
  if (!Tweet) {
    return new NotFoundError();
  }
  if (Tweet.author.toString() === user) {
    return Tweet.remove();
  }
  return new UnauthorizedError();
});

export default {
  Query: {
    getTweets,
    getTweetById,
  },
  Mutation: {
    createTweet,
    updateTweet,
    deleteTweet,
  },
};
