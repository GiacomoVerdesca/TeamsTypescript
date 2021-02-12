import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "../slices/authenticationSlice";
import { userReducer } from "../slices/userSlice";
import { usernameUserReducer } from "../slices/usernameUserSlice";
import { tokenReducer } from "../slices/tokenSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    usernameUser: usernameUserReducer,
    token: tokenReducer,
  },
});
