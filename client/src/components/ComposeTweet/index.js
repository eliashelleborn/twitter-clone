import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';

import { CREATE_TWEET } from '../../graphql/mutations/tweet';
import { GET_HOME_FEED } from '../../graphql/queries/feed';

import Avatar from './Avatar';
import { Input, InputWrapper, InputCount, InputImageIcon } from './Input';
import { ActionBar, ActionsLeft, ActionsRight, Action } from './ActionBar';
import { Button } from '../Button';

class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxChars: 280,
      expanded: false,
      noInputs: true,
      values: {
        text: '',
      },
    };
  }
  resetAll = () => {
    this.setState({
      expanded: false,
      noInputs: true,
      values: {
        text: '',
      },
    });
  };
  toggleExpand = () => {
    if (this.state.noInputs) {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  };
  handleChange = (e) => {
    const values = { ...this.state.values };
    values[e.target.name] = e.target.value;
    this.setState({
      values,
      noInputs: values.text.length === 0,
    });
  };
  handleSubmit = (createTweet) => {
    const {
      maxChars,
      values: { text },
    } = this.state;

    if (text.length > maxChars) {
      console.log('Too many characters');
    } else {
      createTweet({
        variables: { text: this.state.values.text },
        update: (cache, { data: { createTweet: createdTweet } }) => {
          const data = cache.readQuery({ query: GET_HOME_FEED });
          data.getHomeFeed.unshift(createdTweet);
          cache.writeQuery({
            query: GET_HOME_FEED,
            data,
          });
        },
      });
      this.resetAll();
    }
  };
  render() {
    return (
      <Mutation mutation={CREATE_TWEET}>
        {createTweet => (
          <StyledComposeTweet>
            <Avatar src="https://source.unsplash.com/random/100x100" />

            <InputWrapper>
              <InputImageIcon expanded={this.state.expanded}>
                <i className="far fa-images" />
              </InputImageIcon>
              <Input
                name="text"
                placeholder="What's happening?"
                onFocus={this.toggleExpand}
                onBlur={this.toggleExpand}
                onChange={this.handleChange}
                value={this.state.values.text}
                expanded={this.state.expanded}
              />
              {this.state.expanded && (
                <InputCount
                  maxChars={this.state.maxChars}
                  textLength={this.state.values.text.length}
                >
                  <span>{this.state.values.text.length}</span>
                  /280
                </InputCount>
              )}
            </InputWrapper>

            {this.state.expanded && (
              <ActionBar>
                <ActionsLeft>
                  <Action>
                    <i className="far fa-images" />
                  </Action>
                  <Action>
                    <i className="fas fa-map-marker-alt" />
                  </Action>
                </ActionsLeft>
                <ActionsRight>
                  <Button
                    disabled={this.state.noInputs}
                    onClick={() => this.handleSubmit(createTweet)}
                  >
                    Tweet
                  </Button>
                </ActionsRight>
              </ActionBar>
            )}
          </StyledComposeTweet>
        )}
      </Mutation>
    );
  }
}

ComposeTweet.propTypes = {};

const StyledComposeTweet = styled.div`
  position: relative;
  background-color: #e8f4fb;
  padding: 10px 12px;
`;

export default ComposeTweet;
