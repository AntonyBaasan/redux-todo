import { connect } from 'react-redux';
import React, { Component } from 'react';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(todos)
    );
  }

  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(todos)
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    filter: filter,
    todos: getVisibleTodos(state, filter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList));

export default VisibleTodoList;
