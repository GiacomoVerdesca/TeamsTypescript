import { createSlice } from "@reduxjs/toolkit";

 const authenticationSlice = createSlice({
  name: "authentication",
  initialState:{ value:false},
  reducers: {
    isAuthenticated: (state) => {
      state.value = true;
      return state;
    },
    notAuthenticated: (state) => {
      state.value = false;
      return state;
    },
  },
});

export const {
  isAuthenticated,
  notAuthenticated,
} = authenticationSlice.actions;
export const authenticationReducer=authenticationSlice.reducer;
