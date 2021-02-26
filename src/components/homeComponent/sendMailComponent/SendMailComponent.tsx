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
        }


    })

    const sendEmail = () => {
        serviceCallApiGraph.sendEmail(client, mail);
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
        console.log("mail", mail.toRecipients[0].emailAddress.address)
    };
    const handleChangeBody = (event: any) => {
        setMail((prev: any) => ({
            ...prev,
            body: {
                [event.target.name]: event.target.value
            }

        }))
        console.log("content", mail.body.content)
    }
    const handleChangeSubject = (event: any) => {
        setMail((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value

        })
        )
        console.log("subj", mail.subject)
    }

    return (
        <div className='card'>
            <div className="card-header">
                <h3>Email</h3>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Email address</label>
                    <input className="form-control" type="mail" placeholder="insert mail address" name="address" id="address" value={mail.toRecipients[0].emailAddress.address} onChange={handleChangeMail} />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input className="form-control" type="text" name="subject" id="subject" placeholder="insert object" value={mail.subject} onChange={handleChangeSubject} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" name="content" id="content" placeholder="insert body" value={mail.body.content} onChange={handleChangeBody} />
                </div>
                <button className='btn btn-primary'>Send Mail</button>
            </form>
        </div>
    )
}