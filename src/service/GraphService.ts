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
  sendEmail = async (client: any,email:any) => {
    const mail = {
      subject: email.subject,
      toRecipients: [
        {
          emailAddress: {
            address: email.toRecipients[0].emailAddress.address,
          },
          
        }
            
          ,
      ],ccRecipients: [
        {
          emailAddress: {
            address: "giacomo.verdesca@gmail.com"
          }
        }
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

  createEvent = async (client: any) => {
    const params = {
      subject: "Il nostro primo evento",
      body: {
        contentType: "HTML",
        content: "L evento è stato creato da gianluca lu megghiu",
      },
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "Pacific Standard Time",
      },
      end: {
        dateTime: new Date().toISOString(),
        timeZone: "Pacific Standard Time",
      },
      location: {
        displayName: "onlinemeetings",
      },
      attendees: [
        {
          emailAddress: {
            address: "giacomo.verdesca@gmail.com",
            name: "Giacomo Verdesca",
          },
          type: "required",
        },
      ],
    };

    try {
      const response = await client.api("me/events").post(params);
      console.log(response);
      alert("Evento inviato");
    } catch (error) {
      throw error;
    }
  };

  createOnlineMeeting = async (client: any) => {
    console.log(client);
    const onlineMeeting = {
      subject: "Questo è il nostro primo online meeting",
      startDateTime: new Date().toISOString(),
      endDateTime: new Date().toISOString(),
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
