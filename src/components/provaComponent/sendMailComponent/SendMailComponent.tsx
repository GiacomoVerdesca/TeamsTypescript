import React, { useState } from 'react';
import { GraphService } from '../../../service/GraphService';
import { client } from '../../../service/InitialGraph';


let serviceCallApiGraph: any = GraphService.getInstance();
export const SendMailComponent = () => {

    const [mail, setMail] = useState({
        toRecipients: [{ emailAddress: { address: "" } }],
        subject: "",
        body: {
            content: "",
            contentType: "HTML"
        }


    })

    const sendEmail = () => {
        serviceCallApiGraph.sendEmail(client,mail);
    }


    const handleSubmit = (event: any) => {
        event.preventDefault();
        sendEmail();
    }

    const handleChangeMail = (event: any) => {
        setMail((prev: any) => ({
            ...prev,
            toRecipients: [{
                emailAddress: {
                    [event.target.name]: event.target.value

                },

            }]

        }))
        console.log("mail",mail.toRecipients[0].emailAddress.address)


    };
    const handleChangeBody = (event: any) => {
        setMail((prev: any) => ({
            ...prev,
            body: {
                [event.target.name]: event.target.value
            }

        }))
        console.log("content",mail.body.content)
    }
    const handleChangeSubject = (event: any) => {
        setMail((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value
            
        })
        )
        console.log("subj",mail.subject)
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <input type="mail" placeholder="insert mail address" name="address" id="address" value={mail.toRecipients[0].emailAddress.address} onChange={handleChangeMail}></input>
            <input type="text" name="subject" id="subject" placeholder="insert object" value={mail.subject} onChange={handleChangeSubject} />
            <textarea name="content" id="content" placeholder="insert body" value={mail.body.content} onChange={handleChangeBody} />
            <button >Send Mail</button>
        </form>

    </div>)
}