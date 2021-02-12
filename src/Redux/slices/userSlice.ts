import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
      user:{}
  },
  reducers: {
    getUserGraph: (state,action) => {
      state.user = action.payload;
      return state;
    },
    setInitialUser: (state) => {
      return state;
    },
  },
});

export const { getUserGraph, setInitialUser } = userSlice.actions;
export const userReducer =  userSlice.reducer;
