import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Navbar = ({ user }) => (
  <Wrapper className="t-light">
    <div className="container">

      <ul className="nav-menu">
        <li>
          <NavLink to="/" exact activeClassName="active">
            <i className="fas fa-home" />
            <span>Home</span>
          </NavLink>
        </li>

        {user && /* IF LOGGED IN */
          <React.Fragment>
            <li>
              <NavLink to="/notifications" activeClassName="active">
                <i className="far fa-bell" />
                <span>Notifications</span>
              </NavLink>
            </li>
            <li>
              <button onClick={() => console.log('Open Messages Modal')}>
                <i className="far fa-envelope" />
                <span>Messages</span>
              </button>
            </li>
          </React.Fragment>
        }

      </ul>

      {user && /* IF LOGGED IN */
        <React.Fragment>
          <div className="nav-search">
            <input type="text" placeholder="Search Twitter" />
          </div>

          <div className="nav-user">
            <div className="nav-user__profile-image" />
            <button>Tweet</button>
          </div>
        </React.Fragment>
      }

    </div>
  </Wrapper>
);

Navbar.propTypes = {
  user: PropTypes.shape({}),
};

Navbar.defaultProps = {
  user: null,
};

export default Navbar;


// ===== STYLE =====
const Wrapper = styled.nav`
  display: fixed;
  width: 100%;
  height: 46px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .container {
    display: flex;
  }

  .nav-menu {
    height: 100%;
    display: inline-block;
    font-size: 13px;
    justify-self: flex-start;
    flex: 1;

    li {
      display: inline-block;
      height: 100%;
      & > a, & > button {
        height: 100%;
        display: flex;
        padding: 0 14px;
        align-items: center;
        font-weight: bold;
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        outline: 0;
        i {
          margin-right: 5px;
          font-size: 1.4em;
        }
        &:hover {
          text-decoration: none;
          color: #1B95E0;
          border-bottom: 2px solid #1B95E0;
        }
        &.active {
          color: #1B95E0;
          border-bottom: 2px solid #1B95E0;
        }
        
      }
    }
  }

  .nav-search {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    input {
      height: 30px;
      width: 220px;
      border-radius: 30px;
      background-color: #f5f8fa;
      border: 1px solid #e6ecf0;
      padding: 8px 32px 8px 12px;
      font-size: 12px;
      outline: 0;
      margin-right: 14px;
    }
  }

  .nav-user{
    height: 100%;
    display: flex;
    align-items: center;
    
    &__profile-image {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      margin-right: 14px;
      background-image: url('https://source.unsplash.com/random/100x100');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    button {
      height: 32px;
      border-radius: 32px;
      background-color: #48AAE6;
      color: white;
      padding: 0 15px;
      font-weight: bold;
      font-size: 14px;
      border: none;
      outline: 0;
      cursor: pointer;
      &:hover {
        background-color: #1B95E0;
      }
      &:active {
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #48AAE6;
      }
    }
  }
`;
