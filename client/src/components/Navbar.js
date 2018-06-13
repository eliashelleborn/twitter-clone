import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';


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
      <Wrapper className="t-light">

        {this.state.dropdownActive &&
          <button id="dropdown-click-mask" onClick={this.toggleDropdown} />
        }

        <div className="container">

          <ul className="nav-menu">
            <li>
              <NavLink to="/" exact activeClassName="active">
                <i className="fas fa-home" />
                <span>Home</span>
              </NavLink>
            </li>

            {this.props.user && /* IF LOGGED IN */
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

          {this.props.user && /* IF LOGGED IN */
            <React.Fragment>
              <div className="nav-search">
                <input type="text" placeholder="Search Twitter" />
              </div>

              <div className="nav-user">
                <button className="nav-user__profile-image" onClick={this.toggleDropdown} />

                {this.state.dropdownActive &&
                  <div className="nav-user__dropdown">
                    <ul>
                      <li className="dropdown__user-info">
                        <a href="http://localhost:3000">
                          <span>{this.props.user.username}</span>
                          <span>@{this.props.user.username}</span>
                        </a>
                      </li>
                      <li className="dropdown__divider" />
                      <li className="dropdown__item">
                        <a href="http://localhost:3000">
                          <span>
                            <i className="fas fa-user" />
                          </span>
                          <span>Profile</span>
                        </a>
                      </li>
                      <li className="dropdown__item">
                        <a href="http://localhost:3000">
                          <span>
                            <i className="fas fa-list" />
                          </span>
                          <span>Lists</span>
                        </a>
                      </li>
                      <li className="dropdown__item">
                        <a href="http://localhost:3000">
                          <span>
                            <i className="fas fa-bolt" />
                          </span>
                          <span>Moments</span>
                        </a>
                      </li>
                      <li className="dropdown__divider" />
                      <li className="dropdown__item">
                        <a href="http://localhost:3000">
                          <span>
                            <i className="fas fa-flask" />
                          </span>
                          <span>Promote Mode</span>
                        </a>
                      </li>
                      <li className="dropdown__item">
                        <a href="http://localhost:3000">
                          <span>
                            <i className="fas fa-chart-line" />
                          </span>
                          <span>Twitter Ads</span>
                        </a>
                      </li>
                      <li className="dropdown__item">
                        <a href="http://localhost:3000">
                          <span>
                            <i className="fas fa-chart-bar" />
                          </span>
                          <span>Analytics</span>
                        </a>
                      </li>
                      <li className="dropdown__divider" />
                      <li className="dropdown__item"><a href="http://localhost:3000">Settings and privacy</a></li>
                      <li className="dropdown__item"><a href="http://localhost:3000">Help Center</a></li>
                      <li className="dropdown__item"><a href="http://localhost:3000">Keyboard shortcuts</a></li>
                      <li className="dropdown__item"><a href="http://localhost:3000">Log out</a></li>
                      <li className="dropdown__divider" />
                      <li className="dropdown__item"><a href="http://localhost:3000">Night mode</a></li>

                    </ul>
                  </div>
                }
              </div>

              <div className="nav-tweet">
                <button>Tweet</button>
              </div>
            </React.Fragment>
          }

        </div>
      </Wrapper>
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

  #dropdown-click-mask {
    border: none;
    outline: 0;
    background: none;
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 95;
  }

  .nav-menu {
    height: 100%;
    display: inline-block;
    font-size: 13px;
    justify-self: flex-start;
    flex: 1;
    z-index: 99;

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
    z-index: 99;

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

  .nav-user {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 99;
    
    &__profile-image {
      border: none;
      outline: 0;
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
  }

  .nav-user__dropdown {
    width: 190px;
    padding: 10px 0;
    position: absolute;
    background: white;
    top: 48px;
    right: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    z-index: 100;
    color: #14171a;
    ul {
      display: flex;
      flex-direction: column;
      .dropdown__user-info {
        padding: 0 16px;
        a {
          &:hover {
            text-decoration: none;
            color: inherit;
          }
          span:first-child {
            font-size: 18px;
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
          }
          span:last-child {
            display: block; 
            color: #657786;
            font-size: 14px;
            margin-bottom: 5px;
            font-weight: normal;
          }
        }
      }
      .dropdown__item {
        font-size: 14px;
        a {
          padding: 8px 18px;
          height: 100%;
          display: block;
          color: inherit;
          font-weight: normal;
          &:hover {
            text-decoration: none;
            background: #1B95E0;
            color: white;
            i {
              color: white !important;
            }
          }
          span:first-child {
            width: 16px;
            text-align: center;
            margin-right: 15px;
            i {
              color: #657786;
              min-width: 14px;
              font-size: 1.1em;
            }
          }
          span:last-child {
          }
        }
      }
      .dropdown__divider {
        margin: 5px 1px;
        border-bottom: 1px solid #e6ecf0;
      }
    }
  }

  .nav-tweet {
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 99;
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
