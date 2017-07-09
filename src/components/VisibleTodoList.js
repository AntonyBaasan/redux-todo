import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (<TodoList
      {...this.props}
      onTodoClick={toggleTodo}
    />);
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    filter,
    todos: getVisibleTodos(state, filter),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id));
//     },
//     receiveTodos: (todos) => {
//       dispatch(receiveTodos(todos));
//     },
//   };
// };

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
