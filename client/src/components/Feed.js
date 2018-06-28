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
        <Query query={this.props.query} variables={this.props.variables}>
          {({ data }) => {
            const key = Object.keys(data)[0];
            if (data[key]) {
              return data[key].map(tweet => <Tweet key={tweet._id} data={tweet} />);
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
  variables: PropTypes.shape({}),
};

Feed.defaultProps = {
  variables: null,
};

const Wrapper = styled.div`
  background-color: #fff;
`;

export default Feed;
