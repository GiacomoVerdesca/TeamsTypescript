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
            .api('/me')
            // Only get the fields used by the app
            .select('id,displayName,mail,userPrincipalName,mailboxSettings')
            .get();
    }

     //send email
      sendEmail = async (client: any) => {
        const mail = {
            subject: "talk Azure-la nostra prima email",
            toRecipients: [
                {
                    emailAddress: {
                        address: "gianluca.bellafronte@gmail.com"
                    }
                }

            ],
            body: {
                content: `
          <div>Prima mail ciao</div>
          <h1>Ola amigo mio, oplà</h1>
          `,
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
}