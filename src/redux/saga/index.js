import { put, call, take, select } from "redux-saga/effects";
import {
  ERROR,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  IMPORTANT_TODO,
} from "../actions/actionTypes";

import moment from "moment";
import { auth, firestore } from "firebase";
import { onSnapshot } from "../../services/collection";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function* addItem(value) {
  try {
    return yield call(delay, 10);
  } catch (err) {
    yield put({ type: ERROR });
  }
}

export function* addItemFlow() {
  while (true) {
    let request = yield take(ADD_TODO);
    // let response = yield call(addItem, request.value);
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    const tempObj = {};
    tempObj.title = request.value;
    tempObj.id = list.length;
    tempObj.important = false;
    tempObj.finished = false;
    tempObj.createdAt = moment().format("YYYY-MM-DD");
    list.push(tempObj);

    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc(`${tempObj.id}`).set(tempObj);

    // let respon = yield call(onSnapshot, firestoreRef, (newLists) => {
    //   list = newLists;
    //   console.log("from firebase", list);
    // });
    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  }
}

export function* importantItem(value) {
  try {
    return yield call(delay, 10);
  } catch (err) {
    yield put({ type: ERROR });
  }
}
export function* importantItemFlow() {
  while (true) {
    let request = yield take(IMPORTANT_TODO);
    // let response = yield call(importantItem, request.index);
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    let obj = list[request.index];
    obj.important = !obj.important;
    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc(`${request.index}`).update({ finished: obj.important });
    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  }
}

export function* modifyItem(value) {
  try {
    return yield call(delay, 10);
  } catch (err) {
    yield put({
      type: ERROR,
    });
  }
}

export function* removeItem() {
  try {
    return yield call(delay, 10);
  } catch (err) {
    yield put({ type: ERROR });
  }
}

export function* removeItemFlow() {
  while (true) {
    let request = yield take(REMOVE_TODO);
    // let response = yield call(removeItem, request.index);
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    list.splice(request.index, 1);

    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc(`${request.index}`).delete();

    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  }
}

export function* toggleItem(value) {
  try {
    return yield call(delay, 10);
  } catch (err) {
    yield put({ type: ERROR });
  }
}

export function* toggleItemFlow() {
  while (true) {
    let request = yield take(TOGGLE_TODO);
    // let response = yield call(toggleItem, request.index);
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    let obj = list[request.index];
    obj.finished = !obj.finished;

    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc(`${request.index}`).update({ finished: obj.finished });
    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  }
}

export function* modifyItemFlow() {
  while (true) {
    let request = yield take(EDIT_TODO);
    // let response = yield call(modifyItem, request.index);
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    let obj = list[request.index];
    obj.title = request.value;
    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc(`${request.index}`).update({ title: obj.title });
    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  }
}
