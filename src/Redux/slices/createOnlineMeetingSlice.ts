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
  (onlineMeeting: onlineMeeting, thunkApi) => {
    const response = service.createOnlineMeeting(
      onlineMeeting.client,
      onlineMeeting.subject,
      onlineMeeting.startDateTime,
      onlineMeeting.endDateTime
    );
    if (response.status === 400 || response.status === 404) {
      return thunkApi.rejectWithValue(response);
    }
    return response;
  }
);



const createOnlineMeetingSlice = createSlice({
  name: "createOnlineMeeting",
  initialState: {
    pending: false,
    rejected: {},
    onlineMeeting: {},
    success: false,
  },
  reducers: {
    setSuccessMeeting: (state, action) => {
      state.success = action.payload;
    },
    setRejectedMeeting: (state, action) => {
      state.rejected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCreateOnlineMeeting.pending, (state) => {
      state.pending = true;
      state.success = false;
    });
    builder.addCase(postCreateOnlineMeeting.fulfilled, (state, action) => {
      state.onlineMeeting = action.payload;
      state.pending = false;
      state.success = true;
    });
    builder.addCase(postCreateOnlineMeeting.rejected, (state, action) => {
      if (action.payload) {
        state.rejected = action.payload.errorMessage;
        state.pending = false;
        state.success = false;
      } else {
        state.rejected = {
          name: action.error.name,
          message: action.error.message,
          code: action.error.code,
        };
        state.pending = false;
        state.success = false;
      }
    });
  },
});

export const {
  setSuccessMeeting,
  setRejectedMeeting,
} = createOnlineMeetingSlice.actions;
export const createOnlineMeetingReducer = createOnlineMeetingSlice.reducer;
