import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Tweet from './';

// Dummy data
const baseTweet = {
  text: 'This is a test tweet.',
  user: {
    screenName: 'Elias Johansson',
    username: 'Geggs',
  },
  stats: {
    replyCount: 0,
    retweetCount: 0,
    favoriteCount: 0,
  },
  createdAt: '2018-06-13 23:19:35.183',
  updatedAt: '2018-06-13 23:19:35.183',
};

const withHastag = {
  ...baseTweet,
  text: 'This is a test tweet. #hashtag',
};

const withStats = {
  ...baseTweet,
  stats: {
    replyCount: 51,
    retweetCount: 23,
    favoriteCount: 103,
  },
};

const Decorator = styled.div`
  @import 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
  width: 590px;
  margin: 0 auto;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #14171a;
`;

storiesOf('Tweet', module)
  .addDecorator(story => <Decorator>{story()}</Decorator>)
  .add('only text', () => <Tweet data={baseTweet} />)
  .add('with hashtag', () => <Tweet data={withHastag} />)
  .add('with stats', () => <Tweet data={withStats} />);
