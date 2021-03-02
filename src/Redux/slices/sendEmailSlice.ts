import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GraphService } from "../../service/GraphService";

let service: any = GraphService.getInstance();

interface email {
  client: any;
  address: string;
  subject: string;
  content: string;
  userPrincipalName: string;
}
export const postSendEmail: any = createAsyncThunk(
  "sendEmail/postSendEmail",
  (email: email, thunkApi) => {
    const response = service.sendEmail(
      email.client,
      email.address,
      email.subject,
      email.content,
      email.userPrincipalName
    );
    if (response.status === 400 || response.status === 404) {
      return thunkApi.rejectWithValue(response);
    }
    return response;
  }
);

const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState: {
    pending: false,
    rejected: "",
    email: {},
    success: false,
  },
  reducers: {
    setSuccessEmail: (state, action) => {
      state.success = action.payload;
    },
    setRejectedEmail: (state, action) => {
      state.rejected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSendEmail.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(postSendEmail.fulfilled, (state, action) => {
      state.email = action.payload;
      state.pending = false;
      state.success = true;
    });
    builder.addCase(postSendEmail.rejected, (state, action) => {
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

export const { setSuccessEmail, setRejectedEmail } = sendEmailSlice.actions;
export const sendEmailReducer = sendEmailSlice.reducer;
