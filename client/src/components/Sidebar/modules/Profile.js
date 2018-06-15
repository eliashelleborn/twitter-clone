import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Module from '../Module';

const ProfileModule = ({ user }) => (
  <Wrapper>

    <Banner />

    <UserInfo>
      <div>
        <img src="https://source.unsplash.com/random/100x100" alt="" />
      </div>
      <div className="user__names">
        <span>{user.username}</span>
        <span>@{user.screenName}</span>
      </div>
    </UserInfo>

    <Stats>
      <div>
        <span>Tweets</span>
        <span>{user.stats.tweetsCount}</span>
      </div>
      <div>
        <span>Following</span>
        <span>{user.stats.followingCount}</span>
      </div>
      <div>
        <span>Followers</span>
        <span>{user.stats.followersCount}</span>
      </div>
    </Stats>

  </Wrapper>
);

ProfileModule.propTypes = {
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

const Wrapper = Module.extend`
  padding: 0;
`;

const Banner = styled.div`
  height: 100px;
  background-image: url('https://source.unsplash.com/random');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const UserInfo = styled.div`
  height: 50px;
  display: flex;
  div:first-child {
    position: relative;
    width: 80px;
    img {
      position: absolute;
      height: 72px;
      width: 72px;
      border-radius: 50%;
      border: 3px solid #fff;
      margin: -30px 0 0 8px;
    }
  }
  div:last-child {
    padding-left: 10px;
    padding-top: 10px;
    span:first-child {
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      display: block;
    }
    span:last-child {
      line-height: 20px;
      font-size: 14px;
      color: #66757f;
    }
  }
`;

const Stats = styled.div`
  height: 70px;
  padding: 15px;
  display: flex;
  div {
    flex: 1;
    span:first-child {
      display: block;
      color: #657786;
      font-size: 12px;
      font-weight: bold;
      line-height: 16px;
    }
    span:last-child {
      display: block;
      color: #1B95E0;
      font-size: 18px;
      font-weight: bold;
      padding-top: 3px;
    }
  }
`;

export default ProfileModule;

