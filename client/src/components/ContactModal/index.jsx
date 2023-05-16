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

        // const x = document.querySelector(".validate");
        // const y = document.querySelector(".invalidate");
        // const x1 = document.querySelector(".validate1");
        // const y1 = document.querySelector(".invalidate1");
        // const x2 = document.querySelector(".validate2");
        // const y2 = document.querySelector(".invalidate2");
        // const emailRegex = /^\S+@\S+\.\S+$/;

        const { name, value } = event.target;

        if (name === "user_name") {
          
            setUser(value);
            //   if (value.length > 0) {
            //     console.log(value.length);
            //     console.log('good');
            //     x.style.display = "block";
            //     y.style.display = "none";
            //   } else {
            //     console.log('no name');
            //     x.style.display = "none";
            //     y.style.display = "block";
            //   }
        }
        if (name === "user_email") {
           
            setEmail(value);
            //   if (emailRegex.test(value)) {
            //     console.log(value);
            //     console.log('good');
            //     x1.style.display = "block";
            //     y1.style.display = "none";
            //   } else {
            //     console.log('no name');
            //     x1.style.display = "none";
            //     y1.style.display = "block";
            //   }
        }
        if (name === "message") {
           
            setMessage(value);
            //   if (value.length > 0) {
            //     console.log(value);
            //     console.log('good');
            //     x2.style.display = "block";
            //     y2.style.display = "none";
            //   } else {
            //     console.log('no name');
            //     x2.style.display = "none";
            //     y2.style.display = "block";
            //   }
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
                type="button"
                className="btn btn-primary btn-modal rounded-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Contact
            </button>

            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Contact Me</h1>
                                <button type="button" className="btn-close btn btn-primary mb-5" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form ref={form} onClick={sendEmail}>
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        onChange={handleInputChange}
                                        type="text"
                                        value={user}
                                        name="user_name"
                                        placeholder="Name" />
                                    {/* <div className='validate'>
                                                    Looks good
                                                    <i className="fa-solid fa-check"></i>
                                                </div>
                                                <div className='invalidate'>
                                                    required
                                                    <i className="fa-solid fa-check"></i>
                                                </div> */}
                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-control"
                                        value={email}
                                        onChange={handleInputChange}
                                        type="email"
                                        name="user_email"
                                        placeholder="example@example.com" />
                                    {/* <div className='validate1'>
                                                    Looks good
                                                    <i className="fa-solid fa-check"></i>
                                                </div>
                                                <div className='invalidate1'>
                                                    required
                                                    <i className="fa-solid fa-check"></i>
                                                </div> */}
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-control message"
                                        name="message"
                                        value={message}
                                        onChange={handleInputChange}
                                        placeholder="type your message..." />
                                    {/* <div className='validate2'>
                                                    Looks good
                                                    <i className="fa-solid fa-check"></i>
                                                </div>
                                                <div className='invalidate2'>
                                                    required
                                                    <i className="fa-solid fa-check"></i>
                                                </div> */}

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button
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