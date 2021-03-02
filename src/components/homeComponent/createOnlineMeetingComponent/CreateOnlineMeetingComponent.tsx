import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../../service/InitialGraph';
import { postCreateOnlineMeeting } from '../../../Redux/slices/createOnlineMeetingSlice';
import { createOnlineMeetingSelector } from '../../../Redux/selectors/selectors';


export const CreateOnlineMeetingComponent = () => {

    const dispatch = useDispatch();

    const [subject, setSubject] = useState('');
    const [startDateTime, setStartDateTime] = useState(new Date().toISOString());
    const [endDateTime, setEndDateTime] = useState(new Date().toISOString());

    const OnlineMeeting = useSelector(createOnlineMeetingSelector)

    const onlineMeetingObj = {
        client: client,
        subject: subject,
        startDateTime: startDateTime,
        endDateTime: endDateTime
    }

    const createOnlineMeeting = () => {
        // serviceCallApiGraph.createOnlineMeeting(client, subject, startDateTime, endDateTime);
        dispatch(postCreateOnlineMeeting(onlineMeetingObj))
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
        <div>
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

                {OnlineMeeting.onlineMeeting.joinWebUrl && <div className="card-header"> <a href={OnlineMeeting.onlineMeeting.joinWebUrl} target='_blank' >Link al meeting</a> </div>}
            </div>
            {OnlineMeeting.pending ? <img src="http://www.sudburycatholicschools.ca/wp-content/plugins/3d-flip-book/assets/images/dark-loader.gif" alt="Loading..." height='50' width='50'/> : null}
        </div>

    )
}