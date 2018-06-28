import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../../../components/Layout/Containers';

const Nav = props => (
  <StyledNav>
    <Container>
      <ul>
        <li>.</li>
      </ul>
    </Container>
  </StyledNav>
);

Nav.propTypes = {

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
