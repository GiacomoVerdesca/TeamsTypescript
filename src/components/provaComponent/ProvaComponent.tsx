import React, { useEffect, useState } from 'react';
import { GraphService } from '../../service/GraphService';
import { Client, ImplicitMSALAuthenticationProvider, MSALAuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";
import { UserAgentApplication } from 'msal';
let client: Client;
let service: any = GraphService.getInstance();
export const ProvaComponent = () => {

    const [authResponse, setAuthResponse] = useState<any>(null);
    const [authentication, setAuthentication] = useState<any>(false);

    useEffect(() => {

    }, []);

    const initGraph = (): Promise<any> => {

        const msalConfig = {
            auth: {
                clientId: "765221b8-fb88-4f07-a1ef-b40f3ad08d91",

            }
        }
        const graphScopes = ["user.read", "mail.send", "calendars.readwrite"];

        const msalApplication = new UserAgentApplication(msalConfig);
        const options = new MSALAuthenticationProviderOptions(graphScopes);
        const authProvider = new ImplicitMSALAuthenticationProvider(
            msalApplication,
            options
        );

        client = Client.initWithMiddleware({ authProvider });
        return service.getUser(client);
    }

    const sendEmail = () => {
        service.sendEmail(client);
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