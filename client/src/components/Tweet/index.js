import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Avatar from './Avatar';
import Content from './Content';
import ActionBar from './ActionBar';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data } = this.props;
    return (
      <Wrapper>
        <Side>
          <Avatar />
        </Side>
        <Main>
          <Header user={data.user} />
          <Content data={data} />
          <ActionBar stats={data.stats} />
        </Main>
      </Wrapper>
    );
  }
}

Tweet.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      screenName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Wrapper = styled.div`
  padding: 9px 12px;
  display: flex;
  border-bottom: 1px solid #e6ecf0;
  -webkit-font-smoothing: antialiased;
  &:hover {
    background-color: #f5f8fa;
    cursor: pointer;
  }
`;

const Side = styled.div`
  width: 58px;
`;

const Main = styled.div`
  flex: 1;
`;


export default Tweet;
