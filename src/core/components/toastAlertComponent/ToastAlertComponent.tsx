import React, { useEffect } from "react";
import "./ToastAlertComponent.css";
import { useDispatch } from 'react-redux';


import { ToastContainer, toast } from 'react-toastify';

export const ToastAlertComponent = (props: any) => {



  const dispatch = useDispatch();

  useEffect(() => {

    if (props.esito.success) {
      toastSuccess(props.messageSuccess, props.success)
    }
    else if (props.esito.rejected.message) {
      toastError(props.esito.rejected.message, props.error)
    }

    //  props.esito.success ? toastSuccess('Inviata correttamente!') : props.esito.rejected.message ? toastError(props.esito.rejected.message) : null

  }, [props.esito.success, props.esito.rejected])



  const toastSuccess = (success: string, setSuccess: boolean) => toast.success(success, {
    className: 'toastSuccess',
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => dispatch(setSuccess)
  })

  const toastError = (error: string, setError: boolean) => toast.error(props.messageError+error , {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => dispatch(setError)
  })


  return (
    <div>

      <ToastContainer
        position="top-center"
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
