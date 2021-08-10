import { all, fork } from "redux-saga/effects";
import {
  addItemFlow,
  modifyItemFlow,
  removeItemFlow,
  toggleItemFlow,
  importantItemFlow,
} from ".";

export default function* rootSaga() {
  yield all([
    fork(addItemFlow),
    fork(importantItemFlow),
    fork(removeItemFlow),
    fork(toggleItemFlow),
    fork(modifyItemFlow),
  ]);
}
