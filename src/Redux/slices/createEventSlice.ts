import { Client } from "@microsoft/microsoft-graph-client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphService } from "../../service/GraphService";

let service: any = GraphService.getInstance();

interface event {
  client: Client;
  subject: string;
  address: string;
  content: string;
  displayName: string;
  startDateTime: string;
  endDateTime: string;
}
export const postCreateEvent: any = createAsyncThunk(
  "createEvent/postCreateEvent",
  (event: event) => {
    return service.createEvent(
      event.client,
      event.subject,
      event.address,
      event.content,
      event.displayName,
      event.startDateTime,
      event.endDateTime
    );
  }
);

const createEventSlice = createSlice({
  name: "createEvent",
  initialState: {
    rejected: "",
    event: {},
  },
  reducers: {},
  extraReducers: {
    [postCreateEvent.rejected]: (state) => {
      state.rejected = "richiesta rigettata";
    },
    [postCreateEvent.fulfilled]: (state, action) => {
      state.event = action.payload;
      state.rejected = "";
    },
  },
});

export const createEventReducer = createEventSlice.reducer;
