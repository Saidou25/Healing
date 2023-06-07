import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "./index.css";

const SERVICE_ID = 'service_ps339pa';
const TEMPLATE_ID = 'template_s6gfci4';
const USER_ID = 'RWSohpTYy2zdo_uXO';

const ProfileModal = () => {
    const form = useRef();

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (event) => {

        const { name, value } = event.target;

        if (name === "user_name") {
            setUser(value);
        }
        if (name === "user_email") {
            setEmail(value);
        }
        if (name === "message") {
            setMessage(value);
        }
    };

    const sendEmail = (e) => {
       
        e.preventDefault();
         if (!user || !email || !message) {
            console.log('missing')
            setError('err')
            return;
        }
        emailjs.sendForm(
            SERVICE_ID, 
            TEMPLATE_ID, 
            form.current,
            USER_ID,
            )
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            })
        setMessage('');
        setEmail('');
        setUser('');
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
                                    <form ref={form}>
                                        <label className="form-label-contact fs-4">Name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleInputChange}
                                            type="text"
                                            value={user}
                                            name="user_name"
                                            placeholder="Name" />
                                        <label className="form-label-contact fs-4">Email</label>
                                        <input
                                            className="form-control"
                                            value={email}
                                            onChange={handleInputChange}
                                            type="email"
                                            name="user_email"
                                            placeholder="example@example.com" />
                                        <label className="form-label-contact fs-4">Message</label>
                                        <textarea
                                            className="form-control message"
                                            type="text"
                                            name="message"
                                            value={message}
                                            onChange={handleInputChange}
                                            placeholder="type your message..." />
                                        <div className='row m-2'>
                                            <button className="col-6 btn btn-primary bg-transparent text-primary fs-4"
                                                type="button"
                                                data-bs-dismiss="modal">
                                                Close
                                            </button>
                                            <button className="col-6 btn btn-primary fs-4"
                                                type="button"
                                                onClick={sendEmail}
                                               >
                                                Save changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            All fields need filled!
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