import React, { useState } from 'react';
import { sendMessage } from '../../utils/email.js';
import "./index.css";

const ProfileModal = (props) => {
    const username = props.username;
    // const email = props.email;

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState(false);

    const handleSubmit = () => {

        const templateParams = {
            username: username,
            email: 'saidou.monta@yahoo.com',
            message: message
        };
        if (!message) {
            setConfirm('');
            setError('You need to leave a message')
            return;
        };
        setConfirm(true);

        setTimeout(() => {
            setConfirm(false);
        }, 5000);

        console.log('message sent');
        sendMessage(templateParams);
        setError('');
        setMessage('');
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary direct-message rounded-0 m-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                message
            </button>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title-contact fs-1" id="exampleModalLabel">Contact Me</h1>
                                <button type="button" className="btn-close btn btn-primary mb-5" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body fs-4 m-2">
                                <form>
                                    <label className="form-label-contact fs-4">Message</label>
                                    <textarea
                                        className="form-control message"
                                        type="text"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="type your message..." />
                                    <div className='row m-2'>
                                        <button className="col-6 btn btn-primary bg-transparent text-primary fs-4"
                                            type="button"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button className="col-6 btn btn-primary fs-4"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {error && (
                                <div className="my-3 p-3 bg-danger text-white">
                                    {error}
                                </div>
                            )}
                            {confirm === true && (
                                <div className="my-3 p-3 bg-success text-white">
                                    Message sent. You can now close the window.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
export default ProfileModal;