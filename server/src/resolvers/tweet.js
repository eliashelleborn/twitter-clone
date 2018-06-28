import { isAuthenticated, baseResolver } from '../utils/permissions';
// import { UnauthorizedError, NotFoundError } from '../utils/errors';

const resolver = baseResolver.createResolver;
const authRequired = isAuthenticated.createResolver;

// Queries
const getHomeFeed = authRequired(async (parent, args, { models: { Tweet, Follow }, user }) => {
  let usersFollowed = await Follow.find({ follower: user });
  usersFollowed = usersFollowed.map(x => x.followee);
  return Tweet.find({ user: { $in: [...usersFollowed, user] } }).populate('user').sort({ createdAt: -1 }).limit(25);
});

const getUserFeed = resolver(async (parent, args, { models: { Tweet } }) => {
  const { user } = args;
  return Tweet.find({ user }).populate('user').sort({ createdAt: -1 }).limit(25);
});

// Mutations
const createTweet = authRequired(async (parent, args, { models: { Tweet }, user }) => {
  let hashtags = args.text.match(/#[a-z0-9_]+/g);
  if (hashtags) hashtags = hashtags.map(x => x.substr(1));
  let userMentions = args.text.match(/\B@[a-z0-9_-]+/gi);
  if (userMentions) userMentions = userMentions.map(x => x.substr(1));
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
  try {
    const savedTweet = await newTweet.save();
    return Tweet.populate(savedTweet, 'user');
  } catch (err) {
    return err;
  }
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
    getHomeFeed,
    getUserFeed,
  },
  Mutation: {
    createTweet,
  },
};
