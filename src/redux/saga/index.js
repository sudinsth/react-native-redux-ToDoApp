import {
  put,
  call,
  take,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  ERROR,
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  IMPORTANT_TODO,
} from "../actions/actionTypes";

import { auth, firestore } from "firebase";
import moment from "moment";

const currentDate = moment().format("YYYY-MM-DD");

export function* addItem(action) {
  try {
    // let request = yield take(ADD_TODO);
    let request = action.value;
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    const tempObj = {};
    tempObj.createdDate = currentDate;
    tempObj.title = request;
    tempObj.id = list.length;
    tempObj.important = false;
    tempObj.finished = false;
    tempObj.identify = request;
    list.push(tempObj);

    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc("${tempObj.identify}").set(tempObj);

    // console.log(list);
    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  } catch (e) {
    console.log("error", e);
  }
}

export function* addItemFlow() {
  yield takeLatest(ADD_TODO, addItem);
}

export function* importantItem(action) {
  try {
    // let request = yield take(IMPORTANT_TODO);
    const index = action.index;
    const identify = action.identify;
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    let obj = list[index];
    obj.important = !obj.important;
    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc("${identify}").update({ important: obj.important });
    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  } catch (err) {
    yield put({ type: ERROR });
  }
}
export function* importantItemFlow() {
  yield takeLatest(IMPORTANT_TODO, importantItem);
}

export function* removeItem(action) {
  try {
    // let request = yield take(REMOVE_TODO);
    const identify = action.identify;
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    // list.splice(request.value, 1);

    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc("${identify}").delete();

    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  } catch (err) {
    yield put({ type: ERROR });
  }
}

export function* removeItemFlow() {
  yield takeLatest(REMOVE_TODO, removeItem);
}

export function* toggleItem(action) {
  try {
    // let request = yield take(TOGGLE_TODO);
    const identify = action.identify;
    const index = action.index;
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);

    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");

    let obj = list[index];
    obj.finished = !obj.finished;

    firestoreRef.doc("${identify}").update({ finished: obj.finished });

    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  } catch (err) {
    yield put({ type: ERROR });
  }
}

export function* toggleItemFlow() {
  yield takeLatest(TOGGLE_TODO, toggleItem);
}

export function* modifyItem(action) {
  try {
    // let request = yield take(EDIT_TODO);
    const identify = action.identify;
    const value = action.value;
    let tempList = yield select((state) => state.getTodo.list);
    let list = [];
    list = list.concat(tempList);
    // let obj = list[request.index];
    // obj.title = request.value;
    let firestoreRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("lists");
    firestoreRef.doc("${identify}").update({ title: "${value}" });

    yield put({
      type: UPDATE_TODO,
      data: list,
    });
  } catch (err) {
    yield put({
      type: ERROR,
    });
  }
}

export function* modifyItemFlow() {
  yield takeLatest(EDIT_TODO, modifyItem);
}
