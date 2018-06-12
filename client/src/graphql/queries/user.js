import gql from 'graphql-tag';

export const GET_AUTHED_USER = gql`
  query me {
    me {
      _id
      email
      username
    }
  }
`;

export const GET_USER = gql`

`;

export const GET_USERS = gql`
  
`;
