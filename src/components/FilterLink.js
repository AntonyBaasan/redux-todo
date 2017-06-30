import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

const FilterLink = ({ filter, match, isActive, children }) => {
  const paramsFilter = match.params.filter || 'all';
  return (<NavLink
    to={filter === 'all' ? '' : filter}
    isActive={() => (paramsFilter === filter)}
    activeStyle={{
      fontWeight: 'bold',
      color: 'red',
    }}
  > {children}</NavLink >);
};

export default withRouter(FilterLink);
