import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { GET_HOME_FEED } from '../../../graphql/queries/feed';
import Side from '../../../components/Layout/Side';
import Main from '../../../components/Layout/Main';
import SidebarModule from '../../../components/Sidebar/Module';
// import Feed from '../../../components/Feed';

const Tweets = props => (
  <React.Fragment>
    <Main>
      <p>Feed</p>
    </Main>
    <Side>
      <SidebarModule>Who to follow</SidebarModule>
      <SidebarModule>Trends</SidebarModule>
    </Side>
  </React.Fragment>
);


Tweets.propTypes = {
  // isAuthenticatedUser: PropTypes.bool.isRequired,
};

export default Tweets;
