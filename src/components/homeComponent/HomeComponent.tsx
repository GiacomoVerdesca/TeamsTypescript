import React, { useEffect } from 'react';
import './HomeComponent.css';
import { initGraph } from '../../service/InitialGraph';
import { useSelector, useDispatch } from 'react-redux';
import { getUserGraph, isAuthenticated } from '../../Redux/slices/userSlice';
import { SendMailComponent } from './sendMailComponent/SendMailComponent';
import { CreateEventComponent } from './createEventComponent/CreateEventComponent';
import { CreateOnlineMeetingComponent } from './createOnlineMeetingComponent/CreateOnlineMeetingComponent';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../config/config';
import { authResponseSelector, authResponsePendingSelector, authResponseRejectedSelector, authenticationSelector, createOnlineMeetingSelector, createEventSelector, sendEmailSelector } from '../../Redux/selectors/selectors';
import { setSuccessEmail, setRejectedEmail } from '../../Redux/slices/sendEmailSlice';
import { setSuccessEvent, setRejectedEvent } from '../../Redux/slices/createEventSlice';
import { setSuccessMeeting, setRejectedMeeting } from '../../Redux/slices/createOnlineMeetingSlice';


export const HomeComponent = () => {

    const dispatch = useDispatch();

    const authResponse = useSelector(authResponseSelector);
    const authentication = useSelector(authenticationSelector);
    const authResponsePending = useSelector(authResponsePendingSelector);
    const authResponseRejected = useSelector(authResponseRejectedSelector);
    const onlineMeetingResponse = useSelector(createOnlineMeetingSelector);
    const sendEmailResponse = useSelector(sendEmailSelector);
    const createEventResponse = useSelector(createEventSelector);


    const publicClientApplication = new PublicClientApplication({
        auth: {
            clientId: config.appId,
            redirectUri: config.redirectURI,
        }
    });

    return (
        <div className='container homeContainer'>
            { authResponsePending ?

                // <h3>{authResponsePending}</h3>
                <img src="https://i.gifer.com/YCZH.gif" alt="" style={{ height: '100vh', marginLeft: '-85px' }} />
                : authResponseRejected ?
                    <div >
                        <button className='btn btn-primary' onClick={
                            () => {
                                initGraph();
                                dispatch(getUserGraph());
                            }
                        }>login</button>
                        {/* <h3>{authResponseRejected}</h3> */}
                        <br></br>
                        <img src="  https://thumbs.gfycat.com/AmbitiousNewBubblefish-small.gif" alt="" style={{ height: '60vh', marginLeft: '-130px' }} />
                    </div>
                    : !authentication ?
                        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button className='btn btn-primary' style={{ fontSize: '3em', padding: '50px 150px' }} onClick={
                                () => {
                                    initGraph();
                                    dispatch(getUserGraph());
                                }
                            }>login</button>
                        </div>
                        :
                        <div >
                            <div className="row rowDisplayname">
                                <h1>Ciao {authResponse?.displayName}</h1>
                            </div>

                            {/* alert promise errori */}
                            {sendEmailResponse.rejected ? <div className="alert alert-danger" role="alert">
                                {sendEmailResponse.rejected.message} {authResponse.userPrincipalName}
                                <button type="button" className="close" onClick={() => { dispatch(setRejectedEmail('')) }}>x</button>
                            </div> : onlineMeetingResponse.rejected ? <div className="alert alert-danger" role="alert">
                                {onlineMeetingResponse.rejected.message} {authResponse.userPrincipalName}
                                <button type="button" className="close" onClick={() => { dispatch(setRejectedMeeting('')) }}>x</button>
                            </div> : createEventResponse.rejected ? <div className="alert alert-danger" role="alert">
                                {createEventResponse.rejected.message} {authResponse.userPrincipalName}
                                <button type="button" className="close" onClick={() => { dispatch(setRejectedEvent('')) }}>x</button>
                            </div> : null
                            }

                            {/* alert promise successo */}
                            {sendEmailResponse.success ? <div className="alert alert-success" role="alert">
                                Email inviata correttamente!
                                 <button type="button" className="close" onClick={() => { dispatch(setSuccessEmail(false)) }}>x</button>
                            </div> : onlineMeetingResponse.success ? <div className="alert alert-success" role="alert">
                                Meeting creato correttamente!
                                     <button type="button" className="close" onClick={() => { dispatch(setSuccessMeeting(false)) }}>x</button>
                            </div> : createEventResponse.success ? <div className="alert alert-success" role="alert">
                                Evento creato correttamente!
                                         <button type="button" className="close" onClick={() => { dispatch(setSuccessEvent(false)) }}>x</button>
                            </div> : null}


                            <div className="row">
                                <div className="col-md-4">
                                    <SendMailComponent />
                                </div>
                                <div className="col-md-4">
                                    <CreateEventComponent />
                                </div>
                                <div className="col-md-4">
                                    <CreateOnlineMeetingComponent />
                                </div>
                            </div>

                            <div className="row rowLogout">
                                <button className='btn btn-primary' onClick={() => {
                                    sessionStorage.clear();
                                    publicClientApplication.logout();
                                    dispatch(isAuthenticated(false));
                                }}>logout</button>
                            </div>
                        </div>}
        </div>
    )
}