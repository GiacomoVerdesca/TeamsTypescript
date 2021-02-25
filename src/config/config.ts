export const config:configInterface = {
  appId: "765221b8-fb88-4f07-a1ef-b40f3ad08d91",
  redirectURI: "http://localhost:3000/",
  scopes: ["user.read", "mail.send", "calendars.readwrite"],
};

export interface configInterface  {
  appId:any;
  redirectURI:string;
  scopes:any;
}