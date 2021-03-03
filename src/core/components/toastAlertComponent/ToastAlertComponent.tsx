import React from "react";
import "./ToastAlertComponent.css";
import { useDispatch } from 'react-redux';
import { setSuccessEmail, setRejectedEmail } from '../../../Redux/slices/sendEmailSlice';
import { setSuccessEvent, setRejectedEvent } from '../../../Redux/slices/createEventSlice';
import { setSuccessMeeting, setRejectedMeeting } from '../../../Redux/slices/createOnlineMeetingSlice';
import { ToastContainer, toast } from 'react-toastify';

export const ToastAlertComponent = (props: any) => {

  const dispatch = useDispatch();

  const randomString = (length: number, chars: string) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const toastSuccess = (success: string, actionDispatch: any) => toast.success(success, {
    className: 'toastSuccess',
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: actionDispatch,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: rString
  })

  const toastError = (error: string, actionDispatch: any) => toast.error(error, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: actionDispatch,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: rString
  })

  return (
    <div>
      {props.sendEmailResponse.success ? toastSuccess('Email inviata correttamente!', dispatch(setSuccessEmail(false)))
        : props.onlineMeetingResponse.success ? toastSuccess('Meeting creato correttamente!', dispatch(setSuccessMeeting(false)))
          : props.createEventResponse.success ? toastSuccess('Evento creato correttamente!', dispatch(setSuccessEvent(false))) : null}

      {props.sendEmailResponse.rejected.message ? toastError((props.sendEmailResponse.rejected.message + '\n' + props.authResponse.userPrincipalName), dispatch(setRejectedEmail('')))
        : props.onlineMeetingResponse.rejected.message ? toastError((props.onlineMeetingResponse.rejected.message + '\n' + props.authResponse.userPrincipalName), dispatch(setRejectedMeeting('')))
          : props.createEventResponse.rejected.message ? toastError((props.createEventResponse.rejected.message + '\n' + props.authResponse.userPrincipalName), dispatch(setRejectedEvent(''))) : null}

      <ToastContainer position="top-center"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover

      />

    </div>
  );
}
