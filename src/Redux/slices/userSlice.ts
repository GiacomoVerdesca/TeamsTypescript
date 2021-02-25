import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphService } from "../../service/GraphService";
import { client } from "../../service/InitialGraph";

let serviceCallApiGraph: any = GraphService.getInstance();

export const getUserGraph: any = createAsyncThunk(
  "user/getUserGraph",
  () => {
    return serviceCallApiGraph.getUser(client);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [getUserGraph.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
