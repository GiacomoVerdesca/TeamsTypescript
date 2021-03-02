import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GraphService } from '../../../service/GraphService';
import { client } from '../../../service/InitialGraph';
import { reEmail } from '../../../core/function/function';
import { postCreateEvent } from '../../../Redux/slices/createEventSlice';


let serviceCallApiGraph: any = GraphService.getInstance();
export const CreateEventComponent = () => {

    const dispatch = useDispatch();

    const [subject, setSubject] = useState('');
    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [startDateTime, setStartDateTime] = useState(new Date().toISOString());
    const [endDateTime, setEndDateTime] = useState(new Date().toISOString());

    const event = {
        client: client,
        subject: subject,
        address: address,
        content: content,
        displayName: displayName,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
    }

    const createEvent = () => {
        // serviceCallApiGraph.createEvent(client, subject, address, content, displayName, startDateTime, endDateTime);
        dispatch(postCreateEvent(event))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createEvent();
    }

    const handleChangeSubject = (event: any) => {
        setSubject(event.target.value)
        console.log("subject", subject);
    };

    const handleChangeContent = (event: any) => {
        setContent(event.target.value)
        console.log("content", content);
    };


    const handleChangeMail = (event: any) => {
        setAddress(event.target.value)
        console.log("email", address);
    };

    const handleChangeLocation = (event: any) => {
        setDisplayName(event.target.value)
        console.log("displayName", displayName);
    };

    return (
        <div className='card'>
            <div className="card-header text-white bg-primary">
                <h3>Event calendar</h3>
            </div>
            <form className='card-body' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">Email address</label>
                    <input className="form-control" type="mail" placeholder="insert mail address" name="address" id="address" value={address} onChange={handleChangeMail} />
                    {!reEmail.test(address) && address && <small className='text-danger'>Inserire un' email valida!</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input className="form-control" type="text" name="subject" id="subject" placeholder="insert object" value={subject} onChange={handleChangeSubject} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea className="form-control" name="content" id="content" placeholder="insert body" value={content} onChange={handleChangeContent} />
                </div>
                <div className="form-group">
                    <label htmlFor="displayName">Location</label>
                    <input type='text' className="form-control" name="displayName" id="displayName" placeholder="insert location" value={displayName} onChange={handleChangeLocation} />
                </div>
                <button className='btn btn-primary' disabled={!reEmail.test(address) || !subject || !content || !displayName}>Create event into calendar</button>
            </form>
        </div>
    )
}