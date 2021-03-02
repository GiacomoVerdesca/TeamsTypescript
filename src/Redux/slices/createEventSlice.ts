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
  (event: event, thunkApi) => {
    const response = service.createEvent(
      event.client,
      event.subject,
      event.address,
      event.content,
      event.displayName,
      event.startDateTime,
      event.endDateTime
    );
    if (response.status === 400 || response.status === 404) {
      return thunkApi.rejectWithValue(response);
    }
    return response;
  }
);

const createEventSlice = createSlice({
  name: "createEvent",
  initialState: {
    pending: false,
    rejected: "",
    event: {},
    success: false,
  },
  reducers: {
    setSuccessEvent: (state, action) => {
      state.success = action.payload;
    },
    setRejectedEvent: (state, action) => {
      state.rejected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCreateEvent.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(postCreateEvent.fulfilled, (state, action) => {
      state.event = action.payload;
      state.pending = false;
      state.success = true;
    });
    builder.addCase(postCreateEvent.rejected, (state, action) => {
      if (action.payload) {
        state.rejected = action.payload.errorMessage;
        state.pending = false;
      } else {
        state.rejected = action.error;
        state.pending = false;
      }
    });
  },
});

export const { setSuccessEvent, setRejectedEvent } = createEventSlice.actions;
export const createEventReducer = createEventSlice.reducer;
