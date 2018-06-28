import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GET_USER_FEED } from '../../../graphql/queries/feed';
import Side from '../../../components/Layout/Side';
import Main from '../../../components/Layout/Main';
import SidebarModule from '../../../components/Sidebar/Module';
import Feed from '../../../components/Feed';

const Tweets = props => (
  <React.Fragment>
    <Main>
      <Feed query={GET_USER_FEED} variables={{ user: props.user._id }} />
    </Main>
    <Side>
      <SidebarModule>Who to follow</SidebarModule>
      <SidebarModule>Trends</SidebarModule>
    </Side>
  </React.Fragment>
);


Tweets.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tweets;
