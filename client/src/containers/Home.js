import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_AUTHED_USER } from '../graphql/queries/user';
import Sidebar from '../components/Sidebar';
import ProfileModule from '../components/Sidebar/modules/Profile';
import TrendingModule from '../components/Sidebar/modules/Trending';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <HomeLayout>
        <Sidebar>
          {/* User module */}
          <Query query={GET_AUTHED_USER}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return 'Error!';
              const { me: user } = data;
              return (
                <ProfileModule user={user} />
              );
            }}
          </Query>

          {/* Trending module */}
          <TrendingModule />

        </Sidebar>

        <main>
          <div className="compose-tweet" />
          <div className="see-new-tweets" />
          <section />
        </main>

        {/* RIGHT SIDEBAR */}
        <Sidebar>
          Sidebar Right
        </Sidebar>

      </HomeLayout>
    );
  }
}

Home.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      tweetsCount: PropTypes.number.isRequired,
      followersCount: PropTypes.number.isRequired,
      followingCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

const HomeLayout = styled.div`
  display: flex;
  main {
    flex: 1;
    margin: 0 10px;
    @media screen and (max-width: 1190px) {
      margin: 0 0 0 10px;
    }
    section {
      height: 150vh;
      background-color: white;
    }
    .compose-tweet {
      height: 58px;
      background-color: #E8F4FB;
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
