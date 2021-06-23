import {takeLatest, put, all, call} from 'redux-saga/effects';
import {removeTodoSaga, toggleTodoSaga, addTodoSaga} from '../actions/index';

export function* onAddTodoSaga({text}) {
    yield put(addTodoSaga(text));
}

export function* onToggleTodo({id}) {
    yield put(toggleTodoSaga(id));
}

export function* onRemoveTodoSaga({id}) {
    yield put(removeTodoSaga(id));
}

export function* onAdd() {
    yield takeLatest("ADD_TODO", onAddTodoSaga);
}

export function* onToggle() {
    yield takeLatest("TOGGLE_TODO", onToggleTodo);
}

export function* onRemove() {
    yield takeLatest("REMOVE_TODO", onRemoveTodoSaga);
}

export function* todos() {
    yield all([call(onRemove), call(onAdd), call(onToggle)]);
}