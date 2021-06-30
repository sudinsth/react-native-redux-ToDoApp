import { combineReducers } from "redux";
import getTodo from "./list";

const rootReducer =  combineReducers({
    getTodo,
});

export default rootReducer;