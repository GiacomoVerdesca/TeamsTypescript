import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { value: false },
  reducers: {
    isAuthenticated: (state,action) => {
      state.value = action.payload;
      return state;
    }
  },
});

export const { isAuthenticated } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
