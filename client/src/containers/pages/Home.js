import React, { Component } from 'react';
import styled from 'styled-components';
/* import PropTypes from 'prop-types'; */
import { Query } from 'react-apollo';
import { GET_AUTHED_USER } from '../../graphql/state/authUser';
import { GET_HOME_FEED } from '../../graphql/queries/feed';
import Sidebar from '../../components/Sidebar';
import ProfileModule from '../../components/Sidebar/modules/Profile';
import TrendingModule from '../../components/Sidebar/modules/Trending';
import ComposeTweet from '../../components/ComposeTweet/';
import Feed from '../shared/Feed';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <HomeLayout>
        {/* LEFT SIDEBAR - Profile & Trending Modules */}
        <Sidebar>

          <Query query={GET_AUTHED_USER}>
            {({ data: { authedUser } }) => {
              if (authedUser) {
                return (
                  <ProfileModule user={authedUser} />
                );
              }
              return null;
            }}
          </Query>

          <TrendingModule />

        </Sidebar>

        {/* MAIN CONTENT - Compose & Home Feed */}
        <main>
          <ComposeTweet />
          <div className="see-new-tweets" />
          <Feed query={GET_HOME_FEED} />
        </main>

        {/* RIGHT SIDEBAR */}
        <Sidebar>
          Sidebar Right
        </Sidebar>

      </HomeLayout>
    );
  }
}

const HomeLayout = styled.div`
  display: flex;
  main {
    flex: 1;
    margin: 0 10px;
    @media screen and (max-width: 1190px) {
      margin: 0 0 0 10px;
    }
    .see-new-tweets {
      height: 42px;
      background-color: #f5f8fa;
      border-top: 1px solid #e6ecf0;
      border-bottom: 1px solid #e6ecf0;
    }
  }
`;

export default Home;
