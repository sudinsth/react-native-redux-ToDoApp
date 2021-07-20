import { fork } from "redux-saga/effects";
import {
  addItemFlow,
  modifyItemFlow,
  removeItemFlow,
  toggleItemFlow,
  importantItemFlow,
} from ".";

export default function* rootSaga() {
  yield fork(importantItemFlow);
  yield fork(addItemFlow);
  yield fork(removeItemFlow);
  yield fork(toggleItemFlow);
  yield fork(modifyItemFlow);
}
