import { Client } from "@microsoft/microsoft-graph-client";

var instance: any = null;
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
  getUser = async (client: any) => {
    return await client.api("/me").get();
  };

  //send email
  sendEmail = async (
    client: any,
    address: string,
    subject: string,
    content: string
  ) => {
    const mail = {
      subject: subject,
      toRecipients: [{ emailAddress: { address } }],
      ccRecipients: [
        {
          emailAddress: {
            address:
              client.config.authProvider.msalApplication.account.userName,
          },
        },
      ],
      body: {
        content: content,
        contentType: "html",
      },
    };
    try {
      await client.api("/me/sendMail").post({ message: mail });
      alert("inviato amigo!");
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
      const response = await client.api("me/events").post(params);
      console.log(response);
      alert("Evento inviato");
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
      const response = await client
        .api("me/onlineMeetings")
        .post(onlineMeeting);
      console.log(response);
      alert("Meeting creato");
    } catch (error) {
      throw error;
    }
  };
}
