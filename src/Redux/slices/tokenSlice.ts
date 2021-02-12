import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    getTokenActions: (state, action) => {
      state.token = action.payload;
      return state;
    },
    setInitialToken: (state) => {
      return state;
    },
  },
});

export const { getTokenActions, setInitialToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
