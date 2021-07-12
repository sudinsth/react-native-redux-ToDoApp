import { fork } from "redux-saga/effects";
import {
  // addDocument,
  addItemFlow,
  modifyItemFlow,
  removeItemFlow,
  toggleItemFlow,
} from ".";

export default function* rootSaga() {
  yield fork(addItemFlow);
  yield fork(removeItemFlow);
  yield fork(toggleItemFlow);
  yield fork(modifyItemFlow);
  // yield fork(addDocument);
}
