import React, { useState } from 'react';
import { GraphService } from '../../../service/GraphService';
import { client } from '../../../service/InitialGraph';


let serviceCallApiGraph: any = GraphService.getInstance();
export const CreateOnlineMeetingComponent = () => {

    const [subject, setSubject] = useState('');
    const [startDateTime, setStartDateTime] = useState(new Date().toISOString());
    const [endDateTime, setEndDateTime] = useState(new Date().toISOString());


    const createOnlineMeeting = () => {
        serviceCallApiGraph.createOnlineMeeting(client, subject, startDateTime, endDateTime);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createOnlineMeeting();
    }

    const handleChangeSubject = (event: any) => {
        setSubject(event.target.value)
        console.log("subject", subject);
    };

    return (
        <div className='card'>
            <div className="card-header text-white bg-primary">
                <h3>Online meeting</h3>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input className="form-control" type="text" name="subject" id="subject" placeholder="insert object" value={subject} onChange={handleChangeSubject} />
                </div>
                <button className='btn btn-primary' disabled={!subject}>Create onlineMeeting</button>
            </form>
        </div>
    )
}