import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Container } from '../../../components/Layout/Containers';

// GraphQL
import { TOGGLE_FOLLOW } from '../../../graphql/mutations/follow';
import { GET_USER } from '../../../graphql/queries/user';

const Nav = ({ isAuthenticatedUser, user }) => (
  <StyledNav>
    <Container>
      <ul>
        <li> .</li>
      </ul>
      {!isAuthenticatedUser && (
        <Mutation mutation={TOGGLE_FOLLOW}>
          {toggleFollow => (
            <button
              onClick={() => {
                toggleFollow({
                  variables: {
                    userId: user._id,
                  },
                  update: (cache, { data: { toggleFollow: response } }) => {
                    const data = cache.readQuery({
                      query: GET_USER,
                      variables: {
                        username: user.username,
                      },
                    });
                    if (response.action === 'Unfollowed') {
                      data.getUser.relation.following = false;
                    } else if (response.action === 'Followed') {
                      data.getUser.relation.following = true;
                    }
                    cache.writeQuery({
                      query: GET_USER,
                      data,
                    });
                  },
                });
              }}
            >
              {user.relation.following ? 'Following' : 'Follow'}
            </button>
          )}
        </Mutation>
      )}
    </Container>
  </StyledNav>
);

Nav.propTypes = {
  isAuthenticatedUser: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

const StyledNav = styled.nav`
  height: 60px;
  background-color: #fff;
  margin-bottom: 10px;
  ul {
    padding-left: 300px;
    li {
      display: inline-block;
    }
  }
`;

export default Nav;
