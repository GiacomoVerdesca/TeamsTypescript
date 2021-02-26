import React, { useState } from 'react';
import { GraphService } from '../../../service/GraphService';
import { client } from '../../../service/InitialGraph';


let serviceCallApiGraph: any = GraphService.getInstance();
export const CreateEventComponent = () => {

    const [Event, setEvent] = useState({
        subject: '',
        body: {
            content: '',
        },
        start: {
            dateTime: new Date().toISOString(),
        },
        end: {
            dateTime: new Date().toISOString(),
        },
        location: {
            displayName: "",
        },
        attendees: [{
            emailAddress: {
                address: "",
            },
        },
        ],
    });

    const createEvent = () => {
        serviceCallApiGraph.createEvent(client, Event);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createEvent();
    }

    const handleChangeSubject = (event: any) => {
        setEvent((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        console.log("subject", Event.subject);
    };

    const handleChangeContent = (event: any) => {
        setEvent((prev: any) => ({
            ...prev,
            body: {
                [event.target.name]: event.target.value
            }

        }))
        console.log("content", Event.body.content);
    };


    const handleChangeMail = (event: any) => {
        setEvent((prev: any) => ({
            ...prev,
            attendees: [{
                emailAddress: {
                    [event.target.name]: event.target.value
                }
            }]
        }))
        console.log("email", Event.attendees[0].emailAddress.address);
    };

    const handleChangeLocation = (event: any) => {
        setEvent((prev: any) => ({
            ...prev,
            location: {
                [event.target.name]: event.target.value
            }

        }))
        console.log("displayName", Event.location.displayName);
    };

    return (
        <div className='card'>
            <div className="card-header">
                <h3>Event calendar</h3>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Email address</label>
                    <input className="form-control" type="mail" placeholder="insert mail address" name="address" id="address" value={Event.attendees[0].emailAddress.address} onChange={handleChangeMail} />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input className="form-control" type="text" name="subject" id="subject" placeholder="insert object" value={Event.subject} onChange={handleChangeSubject} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" name="content" id="content" placeholder="insert body" value={Event.body.content} onChange={handleChangeContent} />
                </div>
                <div className="form-group">
                    <label htmlFor="displayName">Location</label>
                    <input type='text' className="form-control" name="displayName" id="displayName" placeholder="insert location" value={Event.location.displayName} onChange={handleChangeLocation} />
                </div>
                <button className='btn btn-primary ' >Create event into calendar</button>
            </form>
        </div>
    )
}