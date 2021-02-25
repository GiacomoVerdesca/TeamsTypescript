import {
  Client,
  ImplicitMSALAuthenticationProvider,
  MSALAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client";
import { UserAgentApplication } from "msal";
import { config } from "../config/config";

export let client: Client;

export const initGraph = ():any => {
  const msalConfig = {
    auth: {
      clientId: config.appId,
    },
  };
  const graphScopes = config.scopes;

  const msalApplication = new UserAgentApplication(msalConfig);
  const options = new MSALAuthenticationProviderOptions(graphScopes);
  const authProvider = new ImplicitMSALAuthenticationProvider(
    msalApplication,
    options
  );

  client = Client.initWithMiddleware({ authProvider });
};
