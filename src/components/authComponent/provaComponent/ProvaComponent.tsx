import React, { useEffect, useState } from 'react';
import { Client, ImplicitMSALAuthenticationProvider, MSALAuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";
import { UserAgentApplication} from 'msal';
import { getParsedCommandLineOfConfigFile } from 'typescript';
export const ProvaComponent = ()=>{
let client :Client
const initGraph = ():Promise<any>=>{

const msalConfig ={
    auth:{
      clientId: "765221b8-fb88-4f07-a1ef-b40f3ad08d91",
  
    }
  }
  const graphScopes = ["user.read","mail.send","calendars.readwrite"];
  
  const msalApplication = new UserAgentApplication(msalConfig);
  const options = new MSALAuthenticationProviderOptions(graphScopes);
  const authProvider = new ImplicitMSALAuthenticationProvider(
    msalApplication,
    options
  );
  
  
   client  = Client.initWithMiddleware({authProvider});
   return getProfile();
  }
  const [authResponse,setAuthResponse]=useState<any>(null)
useEffect(()=>{
    initGraph().then(res =>{
        console.log(res);
        setAuthResponse(res);
    });
},[])



  const getProfile=()=>{ 
      return client.api("/me").get();
  }

    //send email
     const sendEmail = async ()=>{
      const mail = {
        subject :"talk Azure-la nostra prima email",
        toRecipients:[
          {
            emailAddress:{
              address: "gianluca.bellafronte@gmail.com"
            }
          }
  
        ],
        body:{
          content:`
          <div>Prima mail ciao</div>
          <h1>Ola amigo mio, oplà</h1>
          `,
          contentType:"html",
        },
      };
      try {
        await client?.api("/me/sendMail").post({message:mail});
        alert("inviato amigo!");
  
      }catch(error){
        throw error;
      }
    };

    return (
        <div>
            <h1>Ciao {authResponse?.displayName}</h1>
            <button onClick={sendEmail}>Send Mail</button>
        </div>
    )
}