import React, { useState, useEffect } from "react";
import { config, configInterface } from "../../config/config";
import { useSelector, useDispatch } from 'react-redux';
import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { isAuthenticated, notAuthenticated } from "../../Redux/authenticationSlice";
 

// import { GraphService } from '../../service/GraphService';

export const AuthComponent = () => {

  const dispatch = useDispatch();
  let authenticationSelector=(state:any)=>state.authentication
  let authentication=useSelector(authenticationSelector);
  console.log(authentication)

  //eliminare gli stati e usare redux toolkit----------------------------------
  const [error, setError] = useState(null);
  //const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser]:any = useState();
  const [token, setToken] = useState();

  //istanza per la gestione degli errori tramite MSAL 
  const interactionRequiredAuthError = new InteractionRequiredAuthError();
  //istanza per l' Autenticazione tramite MSAL
  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectURI,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    },
  });
  //Recupero MicrosoftGraph per le chiamate API
  var graph = require('@microsoft/microsoft-graph-client');
  // let graphService = new GraphService.getInstance();

  useEffect(() => {
  
  }, []);

  //MSAL

  const logIn = async () => {
    try {
      const authResult = await publicClientApplication.loginPopup(
        config.scopes
      );
   
     dispatch(isAuthenticated());
      //sessionStorage.setItem("msalAccount", authResult.account.username);
      const User = await getUser();
      sessionStorage.setItem('graphUser', JSON.stringify(User));
    } catch (err) {
     dispatch(notAuthenticated());
      setError(err);
      console.log(error)
    }
    
  };

  const logOut = () => {
    publicClientApplication.logout();
    sessionStorage.removeItem('token');
    dispatch(notAuthenticated());
    sessionStorage.removeItem('graphUser');
  };

  //token
  const getToken = async () => {
    let account = sessionStorage.getItem("msalAccount");
    if (!account) {
      throw new Error(
        "L'account dell' utente manca nel sessioneStorage. Perfavore sloggati e loggati ntorna."
      );
    }

    try {
      const silentRequest :any= {
        scopes: config.scopes,
        account: publicClientApplication.getAccountByUsername(account),
      };
      const silentResult = await publicClientApplication.acquireTokenSilent(
        silentRequest
      );
      sessionStorage.setItem('token', silentResult.accessToken);
      return silentResult.accessToken;
    } catch (silentError) {
      if (interactionRequiredAuthError) {
        const interactiveResult = await publicClientApplication.acquireTokenPopup(
          config.scopes
        );
        return interactiveResult.accessToken;
      } else {
        throw silentError;
      }
    }
  };

  //GRAPH
  // graphService.getUser();

  const authProvider = {
    getAccessToken: async () => {
      // Call getToken in auth.js
      return await getToken();
    }
  };
  const graphClient = graph.Client.initWithMiddleware({ authProvider });

  const getUser = async () => {
    return await graphClient
      .api('/me')
      // Only get the fields used by the app
      .select('id,displayName,mail,userPrincipalName,mailboxSettings')
      .get();
  }


  return (
    <span>
      
      {user && authentication ? (
        <span>
          <span style={{ marginRight: '35px', color: 'white', fontSize: '20px' }}>Benvenuto {user.displayName}.</span>
          <button className='btn btn-danger' onClick={logOut}>LogOut</button>
        </span>
      ) : (
          <button className='btn btn-warning' onClick={logIn}>Login</button>
        )}
    </span>
  );
};

