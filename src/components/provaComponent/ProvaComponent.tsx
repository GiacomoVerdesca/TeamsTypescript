import React, { useEffect, useState } from 'react';
import { GraphService } from '../../service/GraphService';
import { initGraph, client } from '../../service/InitialGraph';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '../../Redux/slices/authenticationSlice';
import { getUserGraph } from '../../Redux/slices/userSlice';

let serviceCallApiGraph: any = GraphService.getInstance();

export const ProvaComponent = () => {


    const dispatch = useDispatch();

    const authResponse = useSelector((state: any) => state.user.user);
    const authentication = useSelector((state: any) => state.authentication.value);

    // useEffect(() => {

    // }, []);

    const sendEmail = () => {
        serviceCallApiGraph.sendEmail(client);
    }
    const createEvent = () => {
        serviceCallApiGraph.createEvent(client);
    }
    const createOnlineMeeting = () => {
        serviceCallApiGraph.createOnlineMeeting(client);
    }


    return (
        <div>
            {!authentication ? <div><button onClick={
                () => {
                    initGraph();
                    dispatch(getUserGraph());
                    { authResponse && dispatch(isAuthenticated(true)) };
                }
            }>login</button></div>
                :
                <div>
                    <h1>Ciao {authResponse?.displayName}</h1>
                    <button onClick={sendEmail}>Send Mail</button>
                    <button onClick={createEvent}>Create event into calendar</button>
                    <button onClick={createOnlineMeeting}>Create onlineMeeting</button>
                    <button onClick={()=>{
                        sessionStorage.clear();
                        dispatch(isAuthenticated(false))
                    }}>logout</button>
                    
                </div>}
        </div >
    )
}