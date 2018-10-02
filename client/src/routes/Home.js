import React, { Component } from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_AUTHED_USER } from '../graphql/state/authUser';
import { GET_HOME_FEED } from '../graphql/queries/feed';
import { PageContainer } from '../components/Layout/Containers';
import Main from '../components/Layout/Main';
import Side from '../components/Layout/Side';
import ProfileModule from '../components/Sidebar/modules/Profile';
import TrendingModule from '../components/Sidebar/modules/Trending';
import ComposeTweet from '../components/ComposeTweet/';
import Feed from '../components/Feed';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PageContainer flex>
        {/* LEFT SIDEBAR - Profile & Trending Modules */}
        <Side>
          <Query query={GET_AUTHED_USER}>
            {({ data: { authedUser } }) => {
              if (authedUser) {
                return <ProfileModule user={authedUser} />;
              }
              return null;
            }}
          </Query>

          <TrendingModule />
        </Side>

        {/* MAIN CONTENT - Compose & Home Feed */}
        <Main>
          <ComposeTweet />
          <div className="see-new-tweets" />
          <Feed query={GET_HOME_FEED} />
        </Main>

        {/* RIGHT SIDEBAR */}
        <Side>Sidebar Right</Side>
      </PageContainer>
    );
  }
}

export default Home;
