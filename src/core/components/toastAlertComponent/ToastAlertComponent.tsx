import React, { useEffect } from "react";
import "./ToastAlertComponent.css";
import { useDispatch } from 'react-redux';


import { ToastContainer, toast } from 'react-toastify';

export const ToastAlertComponent = (props: any) => {

  console.log('errore',props.esito.rejected.message)
  console.log('success',props.esito.success)

  const dispatch = useDispatch();

  useEffect(() => {

    if (props.esito.success) {
      toastSuccess('Inviata correttamente!', props.id, props.success)
    }
    else if (props.esito.rejected.message) {
      toastError(props.esito.rejected.message, props.id, props.error)
    }

    //  props.esito.success ? toastSuccess('Inviata correttamente!') : props.esito.rejected.message ? toastError(props.esito.rejected.message) : null

  }, [props.esito])



  const toastSuccess = (success: string, id: string, setSuccess: any) => toast.success(success, {
    className: 'toastSuccess',
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: id,
    onClose: ()=>dispatch(setSuccess)
  })

  const toastError = (error: string, id: string, setError: any) => toast.error(error, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: id,
    onClose: ()=>dispatch(setError)
  })


  return (
    <div>

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
