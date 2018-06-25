import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Tweet from './Tweet/';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Wrapper>
        <Query query={this.props.query}>
          {({ data: { getHomeFeed: tweets } }) => {
            if (tweets) {
              return tweets.map(tweet => <Tweet key={tweet._id} data={tweet} />);
            }
            return null;
          }}
        </Query>
      </Wrapper>
    );
  }
}

Feed.propTypes = {
  query: PropTypes.shape({}).isRequired,
};

const Wrapper = styled.div`
  background-color: #fff;
`;

export default Feed;
