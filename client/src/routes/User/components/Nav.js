import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Container } from '../../../components/Layout/Containers';
import { Button } from '../../../components/Button';

// GraphQL
import { TOGGLE_FOLLOW } from '../../../graphql/mutations/follow';
import { GET_USER } from '../../../graphql/queries/user';

const Nav = ({ isAuthenticatedUser, user }) => (
  <StyledNav>
    <Container>
      <ul>
        <li> .</li>
      </ul>
      <NavButtons>
        {!isAuthenticatedUser && (
          <Mutation mutation={TOGGLE_FOLLOW}>
            {toggleFollow => (
              <Button
                hover={user.relation.following ? { color: '#AC002C', text: 'Unfollow' } : {}}
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
              </Button>
            )}
          </Mutation>
        )}
      </NavButtons>
    </Container>
  </StyledNav>
);

Nav.propTypes = {
  isAuthenticatedUser: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};

const StyledNav = styled.nav`
  height: 60px;
  background-color: #fff;
  margin-bottom: 10px;

  & > div {
    padding-left: 300px;
    display: flex;
    align-items: center;
    ul {
      li {
        display: inline-block;
      }
    }
  }
`;

const NavButtons = styled.div`
  margin-left: auto;
`;

export default Nav;
