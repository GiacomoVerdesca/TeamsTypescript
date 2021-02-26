import React from 'react';
import './HomeComponent.css';
import { initGraph } from '../../service/InitialGraph';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '../../Redux/slices/authenticationSlice';
import { getUserGraph } from '../../Redux/slices/userSlice';
import { SendMailComponent } from './sendMailComponent/SendMailComponent';
import { CreateEventComponent } from './createEventComponent/CreateEventComponent';
import { CreateOnlineMeetingComponent } from './createOnlineMeetingComponent/CreateOnlineMeetingComponent';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../config/config';


export const HomeComponent = () => {

    const dispatch = useDispatch();

    const authResponse = useSelector((state: any) => state.user.user);
    const authentication = useSelector((state: any) => state.authentication.value);

    const publicClientApplication = new PublicClientApplication({
        auth: {
            clientId: config.appId,
            redirectUri: config.redirectURI,
        }
    });



    return (
        <div className='container homeContainer'>
            {!authentication ?
                <div>
                    <button className='btn btn-primary' onClick={
                        () => {
                            initGraph();
                            dispatch(getUserGraph());
                            if (authResponse) { dispatch(isAuthenticated(true)) };
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
                            dispatch(isAuthenticated(false))
                            publicClientApplication.logout();
                        }}>logout</button>
                    </div>
                </div>}
        </div >
    )
}