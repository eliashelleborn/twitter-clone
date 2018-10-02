import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      _id
      email
      username
      screenName
      profileImage
      profileBanner
      stats {
        tweetsCount
        followersCount
        followingCount
      }
      relation {
        following
        followingMe
      }
    }
  }
`;

export const GET_USERS = '';
