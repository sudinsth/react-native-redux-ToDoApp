import {fork} from 'redux-saga/effects';
import { addItemFlow, removeItemFlow, toggleItemFlow } from '.';

export default function* rootSaga() {
    yield fork(addItemFlow)
    yield fork(removeItemFlow)
    yield fork(toggleItemFlow)
}