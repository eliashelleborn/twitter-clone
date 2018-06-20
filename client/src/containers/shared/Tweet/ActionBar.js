import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActionBar = ({ stats }) => (
  <StyledActionBar>
    <Action hoverColor="#1da1f2">
      <Button>
        <i className="far fa-comments" />
        {stats.replyCount > 0 &&
          <span>{ stats.replyCount }</span>
        }
      </Button>
    </Action>
    <Action hoverColor="#17bf63">
      <Button>
        <i className="fas fa-retweet" />
        {stats.retweetCount > 0 &&
          <span>{ stats.retweetCount }</span>
        }
      </Button>
    </Action>
    <Action hoverColor="#e0245e">
      <Button>
        <i className="far fa-heart" />
        {stats.favoriteCount > 0 &&
          <span>{ stats.favoriteCount }</span>
        }
      </Button>
    </Action>
    <Action hoverColor="#1da1f2" >
      <Button>
        <i className="far fa-envelope" />
      </Button>
    </Action>
  </StyledActionBar>
);

ActionBar.propTypes = {
  stats: PropTypes.shape({
    replyCount: PropTypes.number,
    retweetCount: PropTypes.number,
    favoriteCount: PropTypes.number,
  }).isRequired,
  /* actions: PropTypes.shape({
    reply: PropTypes.func.isRequired,
    retweet: PropTypes.func.isRequired,
    favorite: PropTypes.func.isRequired,
    message: PropTypes.func.isRequired,
  }).isRequired, */
};


const StyledActionBar = styled.div`
  margin: 10px 0 2px 0;
  display: flex;
  align-items: center;
`;

const Action = styled.div`
  width: 80px;
  color: #657786;
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor}
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: 0;
  i {
    font-size: 17px;
    line-height: 1;
    margin-right: 10px;
  }
  span {
    font-size: 12px;
    font-weight: bold;
  }
`;

export default ActionBar;

