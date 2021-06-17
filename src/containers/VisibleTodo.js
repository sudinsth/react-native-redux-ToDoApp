import {connect} from 'react-redux';
import TodoList from './todoList';
import { toggleTodo, removeTodo } from '../redux/actions';

const mapStateToProps = state => ({
    todo: state.todo
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id=> dispatch(toggleTodo(id)),
    removeTodo: id => dispatch(removeTodo(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);