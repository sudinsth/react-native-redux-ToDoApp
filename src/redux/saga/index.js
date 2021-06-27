import {put,call,take,select} from 'redux-saga/effects';
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, ERROR, UPDATE_TODO} from '../actions/actionTypes';

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function* addItem(text) {
    try{
        return yield call(delay, 500)
    } catch (err) {
        yield put({type: ERROR})
    }
}

export function* addItemFlow() {
    while(true) {
        let request = yield take(ADD_TODO)
        let response = yield call(addItem, request.text)
        let tempList = yield select(state => state.todo.text)
        let list = []
        list = list.concat(tempList)
        const tempObj = {}
        tempObj.text = request.text
        tempObj.id = text.length
        tempObj.completed = false
        list.push(tempObj)
        yield put({
            type: UPDATE_TODO,
            text: list 
        })
    }
}

export function* removeItem() {
    try{
        return yield call(delay, 500)
    } catch (err) {
        yield put({type: ERROR})
    }
}

export function* removeItemFlow() {
    while(true) {
        let request = yield take(REMOVE_TODO)
        let response = yield call(removeItem, request.id)
        let tempList = yield select(state => state.todo.text)
        let list = []
        list = list.concat(tempList)
        list.splice(request.id, 1)
        yield put({
            type: UPDATE_TODO,
            text: list
        })
    }
}

export function* toggleItem(value) {
    try {
        return yield call(delay, 1000)
    } catch (err) {
        yield put({type: ERROR})
    }
}

export function* toggleItemFlow() {
    while(true) {
        let request = yield take(TOGGLE_TODO)
        let response = yield call(toggleItem, request.id)
        let tempList = yield select(state => state.todo.text)
        let list = []
        list = list.concat(tempList)
        let obj = list[request.id]
        obj.completed = !obj.completed
        yield put({
            type: UPDATE_TODO,
            text: list
        })
    }
}
// import {takeLatest, put, all, call} from 'redux-saga/effects';
// import {removeTodoSaga, toggleTodoSaga, addTodoSaga} from '../actions/index';

// export function* onAddTodoSaga({text}) {
//     yield put(addTodoSaga(text));
// }

// export function* onToggleTodo({id}) {
//     yield put(toggleTodoSaga(id));
// }

// export function* onRemoveTodoSaga({id}) {
//     yield put(removeTodoSaga(id));
// }

// export function* onAdd() {
//     yield takeLatest("ADD_TODO", onAddTodoSaga);
// }

// export function* onToggle() {
//     yield takeLatest("TOGGLE_TODO", onToggleTodo);
// }

// export function* onRemove() {
//     yield takeLatest("REMOVE_TODO", onRemoveTodoSaga);
// }

// export function* todos() {
//     yield all([call(onRemove), call(onAdd), call(onToggle)]);
// }