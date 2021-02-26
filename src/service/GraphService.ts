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

  getUser = async (client: any) => {
    return await client
      .api("/me")
      // Only get the fields used by the app
      // .select('id,displayName,mail,userPrincipalName,mailboxSettings')
      .get();
  };

  //send email
  sendEmail = async (client: any, email: any) => {
    const mail = {
      subject: email.subject,
      toRecipients: email.toRecipients,
      ccRecipients: [
        {
          emailAddress: {
            address:
              client.config.authProvider.msalApplication.account.userName,
          },
        },
      ],
      body: {
        content: email.body.content,
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

  createEvent = async (client: any, Event: any) => {
    const params = {
      subject: Event.subject,
      body: {
        contentType: "HTML",
        content: Event.body.content,
      },
      start: {
        dateTime: Event.start.dateTime,
        timeZone: "Pacific Standard Time",
      },
      end: {
        dateTime: Event.end.dateTime,
        timeZone: "Pacific Standard Time",
      },
      location: {
        displayName: Event.location.displayName,
      },
      attendees: Event.attendees,
    };

    try {
      const response = await client.api("me/events").post(params);
      console.log(response);
      alert("Evento inviato");
    } catch (error) {
      throw error;
    }
  };

  createOnlineMeeting = async (client: any, meeting: any) => {
    console.log(client);
    const onlineMeeting = {
      subject: meeting.subject,
      startDateTime: meeting.startDateTime,
      endDateTime: meeting.startDateTime,
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
