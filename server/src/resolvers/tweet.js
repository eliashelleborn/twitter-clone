import { isAuthenticated } from '../utils/permissions';
// import { UnauthorizedError, NotFoundError } from '../utils/errors';

const authRequired = isAuthenticated.createResolver;

// Queries


// Mutations
const createTweet = authRequired((parent, args, { models: { Tweet }, user }) => {
  const hashtags = args.text.match(/#[a-z0-9_]+/g).map(x => x.substr(1));
  const userMentions = args.text.match(/\B@[a-z0-9_-]+/gi).map(x => x.substr(1));
  const urls = args.text.match(/\bhttps?:\/\/\S+/gi);

  const newTweet = new Tweet({
    text: args.text,
    entities: {
      hashtags,
      urls,
      userMentions,
    },
    user,
  });
  return newTweet.save();
});
/*
const deleteTweet = authRequired(async (parent, args, { models: { Tweet }, user }) => {
  const tweetToDelete = await Tweet.findOne({ _id: args._id });
  if (!tweetToDelete) {
    return new NotFoundError();
  }
  if (tweetToDelete.author.toString() === user) {
    return tweetToDelete.remove();
  }
  return new UnauthorizedError();
});
*/
export default {
  Query: {

  },
  Mutation: {
    createTweet,
  },
};
