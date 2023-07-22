import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import combineReducer from "./combine";

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    thunkMiddleware,
  ],
});

export default store;
