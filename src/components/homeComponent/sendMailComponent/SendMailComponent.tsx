import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../../service/InitialGraph';
import { reEmail } from '../../../core/function/function';
import { postSendEmail } from '../../../Redux/slices/sendEmailSlice';
import { authResponseSelector, sendEmailSelector } from '../../../Redux/selectors/selectors';
import { ToastAlertComponent } from '../../../core/components/toastAlertComponent/ToastAlertComponent';
import { setSuccessEmail, setRejectedEmail } from '../../../Redux/slices/sendEmailSlice';


export const SendMailComponent = () => {

    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const authResponse = useSelector(authResponseSelector);

    const sendEmailResponse = useSelector(sendEmailSelector);

    const email = {
        client: client,
        address: address,
        subject: subject,
        content: content,
        userPrincipalName: authResponse.userPrincipalName
    }

    const sendEmail = () => {
        dispatch(postSendEmail(email))
    }


    const handleSubmit = (event: any) => {
        event.preventDefault();
        sendEmail();
    }

    const handleChangeMail = (event: any) => {
        setAddress(event.target.value)
        console.log("mail", address)
    };
    const handleChangeBody = (event: any) => {
        setContent(event.target.value)
        console.log("content", content)
    }
    const handleChangeSubject = (event: any) => {
        setSubject(event.target.value)
        console.log("subj", subject)
    }



    return (
        <div>

            <div className='card'>
                <div className="card-header text-white bg-primary">
                    <h3>Email</h3>
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
                        <textarea className="form-control" name="content" id="content" placeholder="insert body" value={content} onChange={handleChangeBody} />
                    </div>
                    <button className='btn btn-primary' disabled={!reEmail.test(address) || !subject || !content}>Send Mail</button>
                </form>
            </div>

            {sendEmailResponse.pending ? <img src="http://www.sudburycatholicschools.ca/wp-content/plugins/3d-flip-book/assets/images/dark-loader.gif" alt="Loading..." height='50' width='50' /> : null}

            {(sendEmailResponse.success || sendEmailResponse.rejected.message) && <ToastAlertComponent esito={sendEmailResponse} id='sendEmailResponse' success={setSuccessEmail(false)} error={setRejectedEmail({})} />}

        </div>

    )
}