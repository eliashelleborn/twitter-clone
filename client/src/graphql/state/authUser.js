import gql from 'graphql-tag';

// DEFAULTS
const authUserDefaults = {
  authedUser: null,
};

// QUERIES
export const GET_AUTHED_USER = gql`
  query getAuthedUser {
    authedUser @client {
      _id
      email
      username
      screenName
      stats {
        tweetsCount
        followersCount
        followingCount
      }
    }
  }
`;

// MUTATIONS
export const UPDATE_AUTHED_USER = gql`
  mutation updateAuthedUser($user: User) {
    updateAuthedUser(user: $user) @client
  }
`;


// RESOLVERS
const updateAuthedUser = (_, { user }, { cache }) => {
  const query = GET_AUTHED_USER;
  const data = { authedUser: { ...user } };
  cache.writeQuery({ query, data });
  return null;
};


const store = {
  defaults: authUserDefaults,
  resolvers: {
    Mutation: {
      updateAuthedUser,
    },
  },
};

export default store;
