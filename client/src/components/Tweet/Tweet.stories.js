import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Tweet from './';

// Dummy data
const baseTweet = {
  text: 'This is a test tweet.',
  user: { screenName: 'Elias Johansson', username: 'Geggs' },
  stats: { replyCount: 0, retweetCount: 0, favoriteCount: 0 },
};

const tweets = [
  { ...baseTweet },
  { ...baseTweet, text: 'This is a test tweet. #hashtag' },
  { ...baseTweet, text: 'This is a test tweet. @mention' },
  { ...baseTweet, text: 'This is a test tweet. http://mycoolwebsite.com/some-nice-route' },
  { ...baseTweet, stats: { replyCount: 51, retweetCount: 23, favoriteCount: 103 } },
];

const Decorator = styled.div`
  @import 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
  width: 590px;
  margin: 0 auto;
  background-color: #fff;
`;

storiesOf('Tweet', module)
  .addDecorator(story => <Decorator>{story()}</Decorator>)
  .add('base (only text)', () => <Tweet data={tweets[0]} />)
  .add('with hashtag', () => <Tweet data={tweets[1]} />)
  .add('with mention', () => <Tweet data={tweets[2]} />)
  .add('with url', () => <Tweet data={tweets[3]} />)
  .add('with stats', () => <Tweet data={tweets[4]} />);
