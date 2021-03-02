import { Client } from "@microsoft/microsoft-graph-client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphService } from "../../service/GraphService";

let service: any = GraphService.getInstance();

interface onlineMeeting {
  client: Client;
  subject: string;
  startDateTime: string;
  endDateTime: string;
}
export const postCreateOnlineMeeting: any = createAsyncThunk(
  "createOnlineMeeting/postCreateOnlineMeeting",
  (onlineMeeting: onlineMeeting) => {
    return service.createOnlineMeeting(
      onlineMeeting.client,
      onlineMeeting.subject,
      onlineMeeting.startDateTime,
      onlineMeeting.endDateTime
    );
  }
);

const createOnlineMeetingSlice = createSlice({
  name: "createOnlineMeeting",
  initialState: {
    rejected: "",
    onlineMeeting: {},
  },
  reducers: {},
  extraReducers: {
    [postCreateOnlineMeeting.rejected]: (state) => {
      state.rejected = "richiesta rigettata";
    },
    [postCreateOnlineMeeting.fulfilled]: (state, action) => {
      state.onlineMeeting = action.payload;
      state.rejected = "";
    },
  },
});

export const createOnlineMeetingReducer = createOnlineMeetingSlice.reducer;
