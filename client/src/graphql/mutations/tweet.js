import gql from 'graphql-tag';

export const CREATE_TWEET = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
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

export const deleteTweet = '';
