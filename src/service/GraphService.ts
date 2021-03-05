import { Client } from "@microsoft/microsoft-graph-client";

var instance:any = null;

export class GraphService {
  static getInstance() {
    if (instance === null) {
      instance = new GraphService();
    }
    return instance;
  }

  static setInstance(_instance: any) {
    instance = _instance;
  }

  //get user
  getUser = async (client: Client) => {
    return await client.api("/me").get();
  };

  //send email
  sendEmail = async (
    client: Client,
    address: string,
    subject: string,
    content: string,
    userPrincipalName: string
  ) => {
    const mail = {
      subject: subject,
      toRecipients: [{ emailAddress: { address: address } }],
      ccRecipients: [
        {
          emailAddress: {
            address: userPrincipalName,
          },
        },
      ],
      body: {
        content: content,
        contentType: "html",
      },
    };
    try {
    return await client.api("/me/sendMail").post({ message: mail });
    } catch (error) {
      throw error;
    }
  };

  createEvent = async (
    client: Client,
    subject: string,
    address: string,
    content: string,
    displayName: string,
    startDateTime: string,
    endDateTime: string
  ) => {
    const params = {
      subject: subject,
      body: {
        contentType: "HTML",
        content: content,
      },
      start: {
        dateTime: startDateTime,
        timeZone: "Pacific Standard Time",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Pacific Standard Time",
      },
      location: {
        displayName: displayName,
      },
      attendees: [{ emailAddress: { address: address } }],
    };

    try {
     return await client.api("me/events").post(params);
    } catch (error) {
      throw error;
    }
  };

  createOnlineMeeting = async (
    client: Client,
    subject: string,
    startDateTime: string,
    endDateTime: string
  ) => {
    console.log(client);
    const onlineMeeting = {
      subject: subject,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    };
    try {
      return await client
        .api("me/onlineMeetings")
        .post(onlineMeeting);
    } catch (error) {
      throw error;
    }
  };
}
