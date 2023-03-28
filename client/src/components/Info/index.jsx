import React, { useRef, useState } from "react";

import './index.css';

const Info = () => {
    const form = useRef();

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userPhoneNumber, setUserNumber] = useState('');
    // const [userReason, setUserReason] = useState('');
   

    const handleInputChange = (e) => {
        e.preventDefault();

        const x = document.querySelector(".validate");
        const y = document.querySelector(".invalidate");
        const x1 = document.querySelector(".validate1");
        const y1 = document.querySelector(".invalidate1");
        // const x2 = document.querySelector(".validate2");
        // const y2 = document.querySelector(".invalidate2");
        // const x3 = document.querySelector(".validate3");
        // const y3 = document.querySelector(".invalidate3");
        // const x4 = document.querySelector(".validate4");
        // const y4 = document.querySelector(".invalidate4");

        // const emailRegex = /^\S+@\S+\.\S+$/;

        const { name, value } = e.target;

        if (name === 'userFirstName') {
            setUserFirstName(value);

            if (value.length > 0) {

                x.style.display = "block";
                y.style.display = "none";
            } else {

                x.style.display = "none";
                y.style.display = "block";
            }
        }
        if (name === 'userLastName') {

            setUserLastName(value);
            if (value.length > 0) {

                x1.style.display = "block";
                y1.style.display = "none";
            } else {

                x1.style.display = "none";
                y1.style.display = "block";
            }
        }
        // if (name === 'userEmail') {

        //     setUserEmail(value);
        //     if (value.length > 0 && emailRegex.test(value)) {

        //         x2.style.display = "block";
        //         y2.style.display = "none";
        //     } else {

        //         x2.style.display = "none";
        //         y2.style.display = "block";
        //     }
        // }
        // if (name === 'userNumber') {

        //     setUserNumber(value);
        //     if (value.length === 11) {


        //         x3.style.display = "block";
        //         y3.style.display = "none";
        //     } else {

        //         x3.style.display = "none";
        //         y3.style.display = "block";
        //     }
        // }
        // if (name === 'userReason') {

        //     setUserReason(value);
        //     if (value.length > 0) {

        //         x4.style.display = "block";
        //         y4.style.display = "none";
        //     } else {

        //         x4.style.display = "none";
        //         y4.style.display = "block";
        //     }
        // }

    };

    const print = () => {

        console.log('Perfect');
        setUserFirstName('');
        setUserLastName('');
        // setUserEmail('');
        // setUserNumber('');
        // setUserReason('');
    }

    return (
        <>
            <div className="space">
                <div className='title'>Information form</div>
            </div>
            <div className="row">
                <form ref={form} onSubmit={print} className='row profile'>
                    <div className="col-6">
                        <label className="form-label1"> First name</label>
                        <input
                            className="form-control"
                            onChange={handleInputChange}
                            type="text"
                            value={userFirstName}
                            name="userFirstName"
                            placeholder="first name..." />
                        <div className='validate'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <label className="form-label1">Last name</label>
                        <input
                            className="form-control"
                            value={userLastName}
                            onChange={handleInputChange}
                            type="text"
                            name="userLastName"
                            placeholder="last name..." />
                        <div className='validate1'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate1'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    {/* <div className="col-6">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            value={userEmail}
                            onChange={handleInputChange}
                            type="email"
                            name="userEmail"
                            placeholder="example@example.com" />
                        <div className='validate2'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate2'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Phone number</label>
                        <input
                            className="form-control"
                            type="Number"
                            value={userPhoneNumber}
                            onChange={handleInputChange}
                            name="userNumber"
                            placeholder="phone number..." />
                        <div className='validate3'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate3'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Reason for your visit</label>
                        <textarea
                            className="form-control message"
                            type="text"
                            name="userReason"
                            value={userReason}
                            onChange={handleInputChange}
                            placeholder="reason for your visit..." />
                        <div className='validate4'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate4'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div> */}
                    <div className="col-12">
                        <button className="btn btn-primary"
                            type="submit"
                            value="Send">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Info;