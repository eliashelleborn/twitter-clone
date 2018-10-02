import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../../../components/Layout/Containers';

const Header = ({ avatar, banner }) => (
  <StyledHeader banner={banner}>
    <Container>
      <img src={avatar} alt="Profile Avatar" />
    </Container>
  </StyledHeader>
);

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
};

const StyledHeader = styled.div`
  height: 360px;
  width: 100%;
  background-image: url(${props => props.banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  img {
    position: absolute;
    height: 200px;
    width: 200px;
    bottom: -87px;
    border-radius: 50%;
    border: 5px solid #fff;
    object-fit: cover;
  }
`;

export default Header;
