import { createSlice } from "@reduxjs/toolkit";

const usernameUserSlice = createSlice({
  name: "usernameUser",
  initialState: {
    username: "",
  },
  reducers: {
    getUsernameUser: (state, action) => {
      state.username = action.payload;
      return state;
    },
    setInitialUsernameUser: (state) => {
      return state;
    }
  },
});

export const {getUsernameUser, setInitialUsernameUser} = usernameUserSlice.actions;
export const usernameUserReducer = usernameUserSlice.reducer;