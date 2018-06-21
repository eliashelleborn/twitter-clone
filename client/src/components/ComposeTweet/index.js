import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from './Avatar';
import { Input, InputWrapper, InputCount, InputImageIcon } from './Input';
import { ActionBar, ActionsLeft, ActionsRight, Action } from './ActionBar';
import { Button } from '../shared/Button';

class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      noInputs: true,
      values: {
        text: '',
      },
    };
  }
  toggleExpand = () => {
    if (this.state.noInputs) {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  }
  handleChange = (e) => {
    const values = { ...this.state.values };
    values[e.target.name] = e.target.value;
    this.setState({
      values,
      noInputs: values.text.length === 0,
    });
  }
  render() {
    return (
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
          {this.state.expanded &&
            <InputCount textLength={this.state.values.text.length}>
              <span>{this.state.values.text.length}</span>/280
            </InputCount>
          }
        </InputWrapper>

        {this.state.expanded &&
          <ActionBar>
            <ActionsLeft>
              <Action><i className="far fa-images" /></Action>
              <Action><i className="fas fa-map-marker-alt" /></Action>
            </ActionsLeft>
            <ActionsRight>
              <Button disabled={this.state.noInputs}>Tweet</Button>
            </ActionsRight>
          </ActionBar>
        }

      </StyledComposeTweet>
    );
  }
}

ComposeTweet.propTypes = {

};

const StyledComposeTweet = styled.div`
  position: relative;
  background-color: #E8F4FB;
  padding: 10px 12px;
`;

export default ComposeTweet;
