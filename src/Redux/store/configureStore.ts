import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/userSlice";
import { usernameUserReducer } from "../slices/usernameUserSlice";
import { tokenReducer } from "../slices/tokenSlice";
import { sendEmailReducer } from "../slices/sendEmailSlice";
import { createOnlineMeetingReducer } from "../slices/createOnlineMeetingSlice";

const reducer = combineReducers({
  user: userReducer,
  usernameUser: usernameUserReducer,
  token: tokenReducer,
  sendEmail: sendEmailReducer,
  createOnlineMeeting: createOnlineMeetingReducer
});

export const store = configureStore({
  reducer,
});
