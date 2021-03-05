export const authResponseSelector = (state:any) => state.user.user;
export const authenticationSelector = (state: any) => state.user.authentication;
export const authResponsePendingSelector = (state: any) => state.user.pending;
export const authResponseRejectedSelector = (state: any) => state.user.rejected;
export const createOnlineMeetingSelector = (state: any) => state.createOnlineMeeting;
export const createEventSelector = (state: any) => state.createEvent;
export const sendEmailSelector = (state: any) => state.sendEmail;
