import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';

const Dropdown = ({ user }) => (
  <Wrapper>
    <ul>
      <li className="user-info">
        <a href="http://localhost:3000">
          <span>{user.screenName}</span>
          <span>@{user.username}</span>
        </a>
      </li>
      <li className="divider" />
      <li className="item">
        <a href="http://localhost:3000">
          <span>
            <i className="fas fa-user" />
          </span>
          <span>Profile</span>
        </a>
      </li>
      <li className="item">
        <a href="http://localhost:3000">
          <span>
            <i className="fas fa-list" />
          </span>
          <span>Lists</span>
        </a>
      </li>
      <li className="item">
        <a href="http://localhost:3000">
          <span>
            <i className="fas fa-bolt" />
          </span>
          <span>Moments</span>
        </a>
      </li>
      <li className="divider" />
      <li className="item">
        <a href="http://localhost:3000">
          <span>
            <i className="fas fa-flask" />
          </span>
          <span>Promote Mode</span>
        </a>
      </li>
      <li className="item">
        <a href="http://localhost:3000">
          <span>
            <i className="fas fa-chart-line" />
          </span>
          <span>Twitter Ads</span>
        </a>
      </li>
      <li className="item">
        <a href="http://localhost:3000">
          <span>
            <i className="fas fa-chart-bar" />
          </span>
          <span>Analytics</span>
        </a>
      </li>
      <li className="divider" />
      <li className="item"><a href="http://localhost:3000">Settings and privacy</a></li>
      <li className="item"><a href="http://localhost:3000">Help Center</a></li>
      <li className="item"><a href="http://localhost:3000">Keyboard shortcuts</a></li>
      <ApolloConsumer>
        {client => (
          <li className="item">
            <button onClick={() => {
              client.resetStore();
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('accessToken');
            }}
            >Log out
            </button>
          </li>
        )}
      </ApolloConsumer>
      <li className="divider" />
      <li className="item"><a href="http://localhost:3000">Night mode</a></li>
    </ul>
  </Wrapper>
);

Dropdown.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    screenName: PropTypes.string,
  }),
};

Dropdown.defaultProps = {
  user: null,
};

const Wrapper = styled.div`
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
    .user-info {
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
    .item {
      font-size: 14px;
      a, button {
        padding: 8px 18px;
        width: 100%;
        height: 100%;
        display: block;
        color: inherit;
        font-weight: normal;
        border: none;
        background-color: none;
        text-align: left;
        &:hover {
          text-decoration: none;
          background: #1B95E0;
          color: white;
          cursor: pointer;
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
    .divider {
      margin: 5px 1px;
      border-bottom: 1px solid #e6ecf0;
    }
  }
`;

export default Dropdown;
