import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { GraphService } from "../../service/GraphService";
import { client } from "../../service/InitialGraph";

let serviceCallApiGraph: any = GraphService.getInstance();

export const getUserGraph:any = createAsyncThunk("user/getUserGraph", () => {
  return serviceCallApiGraph.getUser(client);
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    pending: "",
    rejected: "",
    user: {},
    authentication: false,
  },
  reducers: {
    isAuthenticated: (state, action) => {
      state.authentication = action.payload;
    },
  },
  extraReducers: {
    [getUserGraph.pending]: (state) => {
      state.pending = "Loading...";
      state.rejected = "";
    },
    [getUserGraph.rejected]: (state) => {
      state.rejected = "Your request was rejected.";
      state.pending = "";
    },
    [getUserGraph.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.authentication = true;
      state.pending = "";
      state.rejected = "";
    },
  },
});

export const { isAuthenticated } = userSlice.actions;
export const userReducer = userSlice.reducer;


