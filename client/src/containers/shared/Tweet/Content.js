import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import reactStringReplace from 'react-string-replace';
import { NavLink } from 'react-router-dom';

const Content = ({ data }) => (
  <StyledContent>
    {reactStringReplace(data.text, /#(\w+)/g, (match, i) => (
      <Hashtag key={`hashtag-${i}`} to={`/hashtag/${match}`}>#<span>{match}</span></Hashtag>
    ))}
  </StyledContent>
);

Content.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const StyledContent = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Hashtag = styled(NavLink)`
  color: #1B95E0;
  font-weight: normal;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    span {
      text-decoration: underline;
    }
  }
`;

export default Content;
