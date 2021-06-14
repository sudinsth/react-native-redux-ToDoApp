import {connect} from 'react-redux';
import TodoList from '../component/todoList';
import { toggleTodo } from '../redux/actions';

const mapStateToProps = state => ({
    todo: state.todo
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id=> dispatch(toggleTodo(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);