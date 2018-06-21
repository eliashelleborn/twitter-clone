import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from './Avatar';
import Input from './Input';

class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <StyledComposeTweet>
        <Avatar src="https://source.unsplash.com/random/100x100" />
        <Input />
      </StyledComposeTweet>
    );
  }
}

ComposeTweet.propTypes = {

};

const StyledComposeTweet = styled.div`
  position: relative;
  height: 58px;
  background-color: #E8F4FB;
  padding: 10px 12px;
`;

export default ComposeTweet;
