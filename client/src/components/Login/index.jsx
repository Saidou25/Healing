// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_PATIENT } from "../../utils/mutations";

import './index.css';

const login = () => {

    // const [patientpassword, setPatientPassword] = useState("");
    // const [patientemail, setPatientEmail] = useState("");


    // const [addPatient, { data, loading, error }] = useMutation(ADD_PATIENT);

    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    const handleInputChange = () => {
        // const x = document.querySelector(".validate");
        // const y = document.querySelector(".invalidate");
        // const x1 = document.querySelector(".validate1");
        // const y1 = document.querySelector(".invalidate1");

        // const emailRegex = /^\S+@\S+\.\S+$/;

        // const { name, value } = e.target;

        // if (name === 'patientemail') {

        //     setPatientEmail(value);

        //     if (value.length > 0 && emailRegex.test(value)) {

        //         x.style.display = "block";
        //         y.style.display = "none";
        //     } else {

        //         x.style.display = "none";
        //         y.style.display = "block";
        //     }

        // }
        // if (name === 'password') {

        //     setPatientPassword(value);

        //     if (value.length > 0) {

        //         x1.style.display = "block";
        //         y1.style.display = "none";
        //     } else {

        //         x1.style.display = "none";
        //         y1.style.display = "block";
        //     }

        // }
    };

    const handleFormSubmit = async () => {
        // e.preventDefault();
        console.log('Hello');
        // const patientpassword = e.target.patientpassword.value;
        // const patientemail = e.target.patientemail.value;

        // try {
        //     await addPatient({ variables: { patientpassword: patientpassword, patientemail: patientemail } });

        //     setPatientPassword("");
        //     setPatientEmail("");

        //     console.log(`success adding ${patientfirstname}`)

        // } catch (err) {
        //     console.error(err);
        // }
    };

    return (
        <>
            <div className="container">
                {/* <div className='title'> */}
                    <h1>login information form</h1>
                {/* </div> */}
            </div>
            <div>
                <form onSubmit={handleFormSubmit} className='row profile'>


                    <div>
                        <label className="form-label1">Email</label>
                        <input
                            className="form-control"
                            // value={patientemail}
                            onChange={handleInputChange}
                            type="text"
                            name="patientemail"
                            placeholder="" />
                        <div className='validate'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div>
                        <label className="form-label1">Password</label>
                        <input
                            className="form-control"
                            // value={patientpassword}
                            onChange={handleInputChange}
                            type="text"
                            name="patientpassword"
                            placeholder="" />
                        <div className='validate1'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate1'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary"
                            type="submit"
                            value="Send">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default login;