import { combineReducers } from "redux";
import { ridersReducer } from "./reducers";

const combineReducer = combineReducers({
  riders: ridersReducer,
});

export default combineReducer;
