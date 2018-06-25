import gql from 'graphql-tag';

export const CREATE_TWEET = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      _id
      text
      user
      stats {
        favoriteCount
        retweetCount
        replyCount
      }
      createdAt
    }
  }
`;

export const deleteTweet = gql``;
