import React, { useState, useEffect } from "react";
import { config } from "../../config/config";
import { useSelector, useDispatch } from 'react-redux';
import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { isAuthenticated } from "../../Redux/slices/authenticationSlice";
import { getUserGraph, setInitialUser } from "../../Redux/slices/userSlice";
import { getUsernameUser } from "../../Redux/slices/usernameUserSlice";
import { setInitialToken, getTokenActions } from "../../Redux/slices/tokenSlice";


// import { GraphService } from '../../service/GraphService';

export const AuthComponent = () => {

  const dispatch = useDispatch();

  let authenticationSelector = (state: any) => state.authentication;
  let authentication = useSelector(authenticationSelector);
  let userSelector = (state: any) => state.user;
  let user = useSelector(userSelector);
  let usernameUserSelector = (state: any) => state.usernameUser;
  let usernameUser = useSelector(usernameUserSelector);
  let tokenSelector = (state: any) => state.token;
  let token = useSelector(tokenSelector);

  //eliminare gli stati e usare redux toolkit----------------------------------
  const [error, setError] = useState(null);

  //istanza per la gestione degli errori tramite MSAL 
  const interactionRequiredAuthError = new InteractionRequiredAuthError();
  //istanza per l' Autenticazione tramite MSAL
  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectURI,
    }
  });
  //Recupero MicrosoftGraph per le chiamate API
  var graph = require('@microsoft/microsoft-graph-client');
  // let graphService = new GraphService.getInstance();


  //MSAL

  const logIn = async () => {
    try {
      const authResult = await publicClientApplication.loginPopup(
        config.scopes
      );
      dispatch(getUsernameUser(authResult.account?.username));
      // const USERNAME: any = authResult.account?.username;
      // sessionStorage.setItem("msalAccount", USERNAME);
      dispatch(isAuthenticated(true));
      const User = await getUser();
      dispatch(getUserGraph(User));
    }
    catch (err) {
      setError(err);
      console.log(error);
      dispatch(isAuthenticated(false));
    }
  };

  const logOut = () => {
    publicClientApplication.logout();
    dispatch(setInitialToken());
    dispatch(isAuthenticated(false));
    dispatch(setInitialUser());
  };

  //token
  const getToken = async () => {
    //let account = sessionStorage.getItem("msalAccount");
    //DEVO FARE IL LOGIN 2 VOLTE SENNO NON MI SI AUTENTICA
    if (!usernameUser['username']) {
      throw new Error(
        "L'account dell' utente manca nel sessioneStorage. Perfavore sloggati e loggati ntorna."
      );
    }

    try {
      const silentRequest: any = {
        scopes: config.scopes,
        account: publicClientApplication.getAccountByUsername(usernameUser['username']),
      };
      const silentResult = await publicClientApplication.acquireTokenSilent(
        silentRequest
      );
      dispatch(getTokenActions(silentResult.accessToken));
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

      {user.user && authentication.value === true ? (
        <span>
          <span style={{ marginRight: '35px', color: 'white', fontSize: '20px' }}>Benvenuto {user['user'].displayName}.</span>
          <button className='btn btn-danger' onClick={logOut}>LogOut</button>
        </span>
      ) : (
          <button className='btn btn-warning' onClick={logIn}>Login</button>
        )}
    </span>
  );
};

