import React from "react";
import "./ToastAlertComponent.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessEmail, setRejectedEmail } from '../../../Redux/slices/sendEmailSlice';
import { setSuccessEvent, setRejectedEvent } from '../../../Redux/slices/createEventSlice';
import { setSuccessMeeting, setRejectedMeeting } from '../../../Redux/slices/createOnlineMeetingSlice';
import { ToastContainer, toast } from 'react-toastify';
import { authResponseSelector, createOnlineMeetingSelector, createEventSelector, sendEmailSelector } from '../../../Redux/selectors/selectors';

export const ToastAlertComponent = (props: any) => {

  const dispatch = useDispatch();

  const authResponse = useSelector(authResponseSelector);
  const onlineMeetingResponse = useSelector(createOnlineMeetingSelector);
  const sendEmailResponse = useSelector(sendEmailSelector);
  const createEventResponse = useSelector(createEventSelector);

  const toastSuccess = (success: string) => toast.success(success, {
    className: 'toastSuccess',
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const toastError = (error: string) => toast.error(error, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  return (
    <div>

      {sendEmailResponse.success ? toastSuccess('Email inviata correttamente!') && dispatch(setSuccessEmail(false))
        : onlineMeetingResponse.success ? toastSuccess('Meeting creato correttamente!') && dispatch(setSuccessMeeting(false))
          : createEventResponse.success ? toastSuccess('Evento creato correttamente!') && dispatch(setSuccessEvent(false)) : null}

      {sendEmailResponse.rejected.message ? toastError((sendEmailResponse.rejected.message + '\n' + authResponse.userPrincipalName)) && dispatch(setRejectedEmail(''))
        : onlineMeetingResponse.rejected.message ? toastError((onlineMeetingResponse.rejected.message + '\n' + authResponse.userPrincipalName)) && dispatch(setRejectedMeeting(''))
          : createEventResponse.rejected.message ? toastError((createEventResponse.rejected.message + '\n' + authResponse.userPrincipalName)) && dispatch(setRejectedEvent('')) : null}

      {/* {props.sendEmailResponse.success ? toastSuccess('Email inviata correttamente!', dispatch(setSuccessEmail(false)))
        : props.onlineMeetingResponse.success ? toastSuccess('Meeting creato correttamente!', dispatch(setSuccessMeeting(false)))
          : props.createEventResponse.success ? toastSuccess('Evento creato correttamente!', dispatch(setSuccessEvent(false))) : null}

      {props.sendEmailResponse.rejected.message ? toastError((props.sendEmailResponse.rejected.message + '\n' + props.authResponse.userPrincipalName), dispatch(setRejectedEmail('')))
        : props.onlineMeetingResponse.rejected.message ? toastError((props.onlineMeetingResponse.rejected.message + '\n' + props.authResponse.userPrincipalName), dispatch(setRejectedMeeting('')))
          : props.createEventResponse.rejected.message ? toastError((props.createEventResponse.rejected.message + '\n' + props.authResponse.userPrincipalName), dispatch(setRejectedEvent(''))) : null} */}

      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
}
