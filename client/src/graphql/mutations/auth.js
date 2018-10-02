import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
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
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register {
    register {
      accessToken
      refreshToken
    }
  }
`;

export const AUTHENTICATE_WITH_TOKEN = gql`
  query me {
    me {
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
    }
  }
`;
