import React from 'react';
import './HomeComponent.css';
import { initGraph } from '../../service/InitialGraph';
import { useSelector, useDispatch } from 'react-redux';
import { getUserGraph, isAuthenticated } from '../../Redux/slices/userSlice';
import { SendMailComponent } from './sendMailComponent/SendMailComponent';
import { CreateEventComponent } from './createEventComponent/CreateEventComponent';
import { CreateOnlineMeetingComponent } from './createOnlineMeetingComponent/CreateOnlineMeetingComponent';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../config/config';
import { authResponseSelector, authResponsePendingSelector, authResponseRejectedSelector, authenticationSelector} from '../../Redux/selectors/selectors';
import { setSuccessEmail, setRejectedEmail } from '../../Redux/slices/sendEmailSlice';
import { setSuccessMeeting, setRejectedMeeting } from '../../Redux/slices/createOnlineMeetingSlice';
import { setSuccessEvent, setRejectedEvent } from '../../Redux/slices/createEventSlice';



export const HomeComponent : React.FC = () => {

    const dispatch = useDispatch();

    const authResponse = useSelector(authResponseSelector);
    const authentication = useSelector(authenticationSelector);
    const authResponsePending = useSelector(authResponsePendingSelector);
    const authResponseRejected = useSelector(authResponseRejectedSelector);

    
    const setActionObj ={
        setSuccessEmail:setSuccessEmail(false),
        setRejectedEmail:setRejectedEmail({}),
        setSuccessMeeting:setSuccessMeeting(false),
        setRejectedMeeting:setRejectedMeeting({}),
        setSuccessEvent:setSuccessEvent(false),
        setRejectedEvent:setRejectedEvent({})
    }
    const publicClientApplication= new PublicClientApplication({
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


                            <div className="row">
                                <div className="col-md-4">
                                    <SendMailComponent setActionObj={setActionObj} />
                                </div>
                                <div className="col-md-4">
                                    <CreateEventComponent setActionObj={setActionObj} /> 
                                </div>
                                <div className="col-md-4">
                                    <CreateOnlineMeetingComponent setActionObj={setActionObj} />
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

