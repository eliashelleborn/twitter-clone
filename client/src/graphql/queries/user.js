import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
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

export const GET_USERS = '';
