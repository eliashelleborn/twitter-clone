import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

const CustomQuery = ({ loadingRender, ...props }) => (
  <Query {...props}>
    {({ loading, ...rest }) => {
      if (loading) {
        return loadingRender ? loadingRender() : null;
      }
      return props.children(rest);
    }}
  </Query>
);

CustomQuery.propTypes = {
  loadingRender: PropTypes.node,
  children: PropTypes.node,
};

CustomQuery.defaultProps = {
  loadingRender: null,
  children: null,
};

export default CustomQuery;
