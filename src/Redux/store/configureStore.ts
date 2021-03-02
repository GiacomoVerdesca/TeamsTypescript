import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/userSlice";
import { usernameUserReducer } from "../slices/usernameUserSlice";
import { tokenReducer } from "../slices/tokenSlice";
import { sendEmailReducer } from "../slices/sendEmailSlice";
import { createOnlineMeetingReducer } from "../slices/createOnlineMeetingSlice";
import { createEventReducer } from "../slices/createEventSlice";

const reducer = combineReducers({
  user: userReducer,
  usernameUser: usernameUserReducer,
  token: tokenReducer,
  sendEmail: sendEmailReducer,
  createOnlineMeeting: createOnlineMeetingReducer,
  createEvent: createEventReducer,
});

export const store = configureStore({
  reducer,
});
