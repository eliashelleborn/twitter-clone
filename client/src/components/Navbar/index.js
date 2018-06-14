import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import { Container } from '../shared/Containers';
import { ButtonLink, Button } from '../shared/Button';
import Item from './Item';
import Dropdown from './Dropdown';
import Menu from './Menu';
import Search from './Search';
import UserButton from './UserButton';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown() {
    this.setState({
      dropdownActive: !this.state.dropdownActive,
    });
  }

  render() {
    return (
      <StyledNavbar>
        {this.state.dropdownActive &&
          <button id="click-mask" onClick={this.toggleDropdown} />
        }

        <Container>
          <Item flex="1">
            <Menu isAuthenticated={!!this.props.user} />
          </Item>

          {this.props.user && /* IF LOGGED IN */
            <React.Fragment>
              <Item marginright="14px">
                <Search type="text" placeholder="Search Twitter" />
              </Item>
              <Item marginright="14px">
                <UserButton onClick={this.toggleDropdown} />
                {this.state.dropdownActive &&
                  <Dropdown user={this.props.user} />
                }
              </Item>
              <Item>
                <Button>Tweet</Button>
              </Item>
            </React.Fragment>
          }

          {!this.props.user && /* IF NOT LOGGED IN */
            <React.Fragment>
              <Item marginright="5px">
                <ButtonLink to="/login">Login</ButtonLink>
              </Item>
              <Item>
                <ButtonLink to="/register">Register</ButtonLink>
              </Item>
            </React.Fragment>
          }
        </Container>
      </StyledNavbar>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  user: null,
};

const StyledNavbar = styled.nav`
  position: fixed;
  width: 100%;
  height: 46px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 50;
  color: #657786;

  > div {
    display: flex;
  }

  #click-mask {
    border: none;
    outline: 0;
    background: none;
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 95;
  }
`;

export default Navbar;
