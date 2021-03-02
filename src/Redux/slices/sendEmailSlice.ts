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
  (email: email) => {
   return service.sendEmail(
      email.client,
      email.address,
      email.subject,
      email.content,
      email.userPrincipalName
    );
  }
);

const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState: {
    rejected: "",
    email: {},
  },
  reducers: {},
  extraReducers: {
    [postSendEmail.rejected]: (state) => {
      state.rejected = "richiesta rigettata";
    },
    [postSendEmail.fulfilled]: (state, action) => {
      state.email = action.payload;
      state.rejected = "";
    },
  },
});

export const sendEmailReducer = sendEmailSlice.reducer;
