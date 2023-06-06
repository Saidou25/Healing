import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "./index.css";

const SERVICE_ID = 'service_3qy8lbc';
const TEMPLATE_ID = 'template_s6gfci4';
const USER_ID = 'RWSohpTYy2zdo_uXO';

const ProfileModal = () => {

    const form = useRef();

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleInputChange = (event) => {

        // const emailRegex = /^\S+@\S+\.\S+$/;

        const { name, value } = event.target;

        if (name === "user_name") {

            setUser(value);
            //   if (value.length > 0) {

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
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
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
                style={{ fontSize: '1.2rem' }}
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
                            <div className="modal-header d-flex align-items-center">
                                <h1 className="modal-title-contact fs-7" id="exampleModalLabel">Contact Me</h1>
                                <button type="button" className="btn-close btn btn-primary mb-5" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form ref={form} onClick={sendEmail}>
                                    <label className="form-label-contact fs-4">Name</label>
                                    <input
                                        style={{ fontSize: '1.2rem' }}
                                        className="form-control"
                                        onChange={handleInputChange}
                                        type="text"
                                        value={user}
                                        name="user_name"
                                        placeholder="Name" />
                                    <label className="form-label-contact fs-4">Email</label>
                                    <input
                                        style={{ fontSize: '1.2rem' }}
                                        className="form-control"
                                        value={email}
                                        onChange={handleInputChange}
                                        type="email"
                                        name="user_email"
                                        placeholder="example@example.com" />

                                    <label className="form-label-contact fs-4">Message</label>
                                    <textarea
                                        style={{ fontSize: '1.1rem' }}
                                        className="form-control message"
                                        name="message"
                                        value={message}
                                        onChange={handleInputChange}
                                        placeholder="type your message..." />
                                    <div className="modal-footer">
                                        <button type="button"
                                            style={{ fontSize: '1.2rem' }}
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button
                                            style={{ fontSize: '1.2rem' }}
                                            type="button"
                                            className="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ProfileModal;