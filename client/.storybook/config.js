import { configure, addDecorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '../src/index.css';

const req = require.context('../src', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(story => <BrowserRouter>{story()}</BrowserRouter>);

configure(loadStories, module);
