import { ACCESS_SECRET, REFRESH_SECRET } from '../utils/dotenv';
import { isNotAuthenticated, isAuthenticated } from '../utils/permissions';
import { createTokens } from '../utils/auth';

// RESOLVERS
const register = isNotAuthenticated.createResolver(async (parent, args, { models: { User } }) => {
  let user;
  try {
    user = new User(args);
    user = await user.save();
  } catch (error) {
    return new Error(error);
  }

  const refreshTokenSecret = user.password + REFRESH_SECRET;
  const [accessToken, refreshToken] = await createTokens(
    user.id,
    ACCESS_SECRET,
    refreshTokenSecret,
  );
  delete user.password;
  return {
    accessToken,
    refreshToken,
  };
});


const login = isNotAuthenticated.createResolver(async (parent, args, { models: { User } }) => {
  const { password, email } = args;
  let user;
  try {
    user = await User.findOne({ email }).select('+password').exec();
    const validPassword = await user.comparePasswords(password);
    if (!validPassword) {
      return new Error('Passwords did not match');
    }
  } catch (error) {
    return new Error('No user with that email was found');
  }

  const refreshTokenSecret = user.password + REFRESH_SECRET;
  const [accessToken, refreshToken] = await createTokens(
    user.id,
    ACCESS_SECRET,
    refreshTokenSecret,
  );
  delete user.password;
  return {
    accessToken,
    refreshToken,
  };
});

const me = isAuthenticated.createResolver((parent, args, { user, models: { User } }) => {
  User.findOne({ _id: user });
});


export default {
  Query: {
    me,
  },
  Mutation: {
    register,
    login,
  },
};
