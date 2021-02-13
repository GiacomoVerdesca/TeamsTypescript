import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../slices/authenticationSlice";
import { userReducer } from "../slices/userSlice";
import { usernameUserReducer } from "../slices/usernameUserSlice";
import { tokenReducer } from "../slices/tokenSlice";

const reducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  usernameUser: usernameUserReducer,
  token: tokenReducer,
});

export const store = configureStore({
  reducer,
});
