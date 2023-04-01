import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PATIENT } from "../../utils/mutations";

import './index.css';

const Info = () => {

    const form = useRef();
    const [patientname, setPatientName] = useState('');
    const [age, setAge] = useState("");

    const [addPatient, { data, loading, error }] = useMutation(ADD_PATIENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const handleInputChange = (e) => {


        const { name, value } = e.target;

        if (name === 'patientname') {
            setPatientName(value);
        }
        if (name === 'age') {

            setAge(value);
          
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const patientname = e.target.patientname.value;
        const age = e.target.age.value;
        console.log(patientname);
        console.log(age);

        try {
            await addPatient({ variables: { patientname: patientname, age: parseInt(age) } });

            setPatientName("");
            setAge("");

            console.log(`success adding ${patientname}`)

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="space">
                <div className='title'>Information form</div>
            </div>
            <div className="row">
                <form ref={form} onSubmit={handleFormSubmit} className='row profile'>
                    <div className="col-6">
                        <label className="form-label1"> First name</label>
                        <input
                            className="form-control"
                            onChange={handleInputChange}
                            type="text"
                            value={patientname}
                            name="patientname"
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
                        <label className="form-label1">Age</label>
                        <input
                            className="form-control"
                            value={age}
                            onChange={handleInputChange}
                            type="Number"
                            name="age"
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
export default Info;