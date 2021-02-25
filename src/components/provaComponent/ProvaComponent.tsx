import React, { useEffect, useState } from 'react';
import { GraphService } from '../../service/GraphService';
import { initGraph,client } from '../../service/InitialGraph';

let serviceCallApiGraph: any = GraphService.getInstance();

export const ProvaComponent = () => {

    const [authResponse, setAuthResponse] = useState<any>(null);
    const [authentication, setAuthentication] = useState<any>(false);


    const sendEmail = () => {
        serviceCallApiGraph.sendEmail(client);
    }

    return (
        <div>
            {!authentication ? <div><button onClick={
                () => {
                    initGraph().then(res => {
                        console.log(res);
                        setAuthResponse(res);
                    });
                    setAuthentication(true);
                }
            }>login</button></div>
                :
                <div>
                    <h1>Ciao {authResponse?.displayName}</h1>
                    <button onClick={sendEmail}>Send Mail</button>
                </div>}
        </div >
    )
}