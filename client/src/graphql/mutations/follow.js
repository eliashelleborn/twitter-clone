import gql from 'graphql-tag';

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($userId: String!) {
    toggleFollow(userId: $userId) {
      action
      follow {
        _id
        followee
        follower
        start
        end
      }
    }
  }
`;

export const placeholder = '';
