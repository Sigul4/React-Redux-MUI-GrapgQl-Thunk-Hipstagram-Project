import { combineReducers } from "redux";
import   authReducer       from "./authReducer";
import   promiseReducer    from "./promiseReducer";

const combinedReducers = combineReducers({promise: promiseReducer, auth: authReducer})

export default combinedReducers
