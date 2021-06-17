import { combineReducers } from "redux";
import todo from './todo';
import visibilityFilter from './visibilityFilter';

const rootReducer =  combineReducers({
    todo,
    visibilityFilter
});

export default rootReducer;