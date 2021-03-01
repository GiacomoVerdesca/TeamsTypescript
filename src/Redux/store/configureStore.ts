import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/userSlice";
import { usernameUserReducer } from "../slices/usernameUserSlice";
import { tokenReducer } from "../slices/tokenSlice";

const reducer = combineReducers({
  user: userReducer,
  usernameUser: usernameUserReducer,
  token: tokenReducer,
});

export const store = configureStore({
  reducer,
});
