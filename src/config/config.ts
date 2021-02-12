import { stringify } from "querystring";

export const config:configInterface = {
  appId: "765221b8-fb88-4f07-a1ef-b40f3ad08d91",
  redirectURI: "http://localhost:3000/",
  scopes: ["user.read",'OnlineMeetings.ReadWrite'],
};

export interface configInterface  {
  appId:string;
  redirectURI:string;
  scopes:any;
}