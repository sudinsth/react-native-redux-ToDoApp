import { put, call, take, select } from 'redux-saga/effects';
import {
  ERROR, 
  ADD_TODO, 
  TOGGLE_TODO, 
  REMOVE_TODO, 
  UPDATE_TODO,
  EDIT_TODO,
} from '../actions/actionTypes';

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* addItem(value) {
  try {
    return yield call(delay, 50)
  } catch (err) {
    yield put({type: ERROR})
  }
}

export function* addItemFlow() {
  while (true) {
    let request = yield take(ADD_TODO)
    let response = yield call(addItem, request.value)
    let tempList = yield select(state => state.getTodo.list)
    let list = []
    list = list.concat(tempList)
    const tempObj = {}
    tempObj.title = request.value
    tempObj.id = list.length
    tempObj.finished = false
    list.push(tempObj)
    yield put({
      type: UPDATE_TODO,
      data: list
    })
  }
}

export function* removeItem() {
    try {
      return yield call(delay, 50)
    } catch (err) {
      yield put({type: ERROR})
    }
  }
  
  export function* removeItemFlow() {
    while (true) {
      let request = yield take(REMOVE_TODO)
      let response = yield call(removeItem, request.index)
      let tempList = yield select(state => state.getTodo.list)
      let list = []
      list = list.concat(tempList)
      list.splice(request.index, 1)
      yield put({
        type: UPDATE_TODO,
        data: list
      })
    }
  }
  
  export function* toggleItem(value) {
    try {
      return yield call(delay, 10)
    } catch (err) {
      yield put({type: actionTypes.ERROR})
    }
  }
  
  export function* toggleItemFlow() {
  
    while (true) {
      let request = yield take(TOGGLE_TODO)
      let response = yield call(toggleItem, request.index)
      let tempList = yield select(state => state.getTodo.list)
      let list = []
      list = list.concat(tempList)
      let obj = list[request.index]
      obj.finished = !obj.finished
      yield put({
        type: UPDATE_TODO,
        data: list
      })
    }
  }

  export function* modifyItem(value) {
    try {
      return yield call(delay, 10)
    } catch (err) {
      yield put({
        type: ERROR
      })
    }
  }

  export function* modifyItemFlow() {
    while (true) {
      let request = yield take(EDIT_TODO)
      let response = yield call(modifyItem, request.index)
      let tempList = yield select(state => state.getTodo.list)
      let list = []
      list = list.concat(tempList)
      let obj = list[request.index]
      obj.title = request.value
      yield put({
        type: UPDATE_TODO,
        data: list
      })
    }
  }