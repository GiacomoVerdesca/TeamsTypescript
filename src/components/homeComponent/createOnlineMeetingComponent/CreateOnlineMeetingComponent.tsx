import React, { useState } from 'react';
import { GraphService } from '../../../service/GraphService';
import { client } from '../../../service/InitialGraph';


let serviceCallApiGraph: any = GraphService.getInstance();
export const CreateOnlineMeetingComponent = () => {

    const [meeting, setMeeting] = useState({
        subject: '',
        startDateTime: new Date().toISOString(),
        endDateTime: new Date().toISOString()
    });


    const createOnlineMeeting = () => {
        serviceCallApiGraph.createOnlineMeeting(client, meeting);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createOnlineMeeting();
    }

    const handleChangeSubject = (event: any) => {
        setMeeting((prev: any) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        console.log("subject", meeting.subject);
    };

    return (
        <div className='card'>
            <div className="card-header">
                <h3>Online meeting</h3>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input className="form-control" type="text" name="subject" id="subject" placeholder="insert object" value={meeting.subject} onChange={handleChangeSubject} />
                </div>
                <button className='btn btn-primary'>Create onlineMeeting</button>
            </form>
        </div>
    )
}