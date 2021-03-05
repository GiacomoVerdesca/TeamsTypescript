import { Client } from "@microsoft/microsoft-graph-client";

export interface email {
    client: Client,
    address: string,
    subject: string,
    content: string,
    userPrincipalName: string
}
export interface onlineMeeting  {
    client: Client,
    subject: string,
    startDateTime: string,
    endDateTime: string
}

export interface event {
    client: Client,
    subject: string,
    address: string,
    content: string,
    displayName:string,
    startDateTime: string,
    endDateTime: string,   
}
