import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

const FilterLink = ({ filter, match, isActive, children }) => (

  <NavLink
    to={filter === 'all' ? '' : filter}
    isActive={() => (match.params.filter === filter)}
    activeStyle={{
      fontWeight: 'bold',
      color: 'red',
    }}
  > {children}</NavLink >
);

export default withRouter(FilterLink);
