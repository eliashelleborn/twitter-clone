import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Form, Input, Label, Description, Group } from './index';

const Decorator = styled.div`
  @import 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
  width: 590px;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px;
`;

storiesOf('Form', module)
  .addDecorator(story => <Decorator>{story()}</Decorator>)
  .add('input only', () => (
    <form>
      <Group>
        <Input type="text" />
      </Group>
    </form>
  ))
  .add('input with label', () => (
    <form>
      <Group>
        <Label>Label</Label>
        <Input type="text" />
      </Group>
    </form>
  ))
  .add('input with label and description', () => (
    <form>
      <Group>
        <Label>Label</Label>
        <Input type="text" />
        <Description>Description</Description>
      </Group>
    </form>
  ));
