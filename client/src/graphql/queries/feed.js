import gql from 'graphql-tag';

export const GET_HOME_FEED = gql`
  query getHomeFeed {
    getHomeFeed {
      _id
      text
      createdAt
      user {
        username
        screenName
        profileImage
      }
      entities {
        hashtags
        urls
        userMentions
      }
      stats {
        favoriteCount
        replyCount
        retweetCount
      }
    }
  }
`;

export const GET_USER_FEED = gql`
  query getUserFeed($user: String!) {
    getUserFeed(user: $user) {
      _id
      text
      createdAt
      user {
        username
        screenName
      }
      entities {
        hashtags
        urls
        userMentions
      }
      stats {
        favoriteCount
        replyCount
        retweetCount
      }
    }
  }
`;
