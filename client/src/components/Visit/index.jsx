import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';
import { useMutation } from "@apollo/client";
import { ADD_PATIENT } from "../../utils/mutations";

const Visit = () => {

    const [mepet, setMePet] = useState('');
    const [patientnumber, setValue] = useState('');
    const [patientgender, setPatientGender] = useState('');
    // const [male, setMale] = useState('');
    // const [female, setFemale] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');
    const [patientemail, setPatientEmail] = useState('');
    // const [patientnumber, setPatientNumber] = useState('');
    const [patientreason, setPatientReason] = useState('');

    const [addPatient, { data, loading, error }] = useMutation(ADD_PATIENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const handleChange = (e) => {
        // e.preventDefault();
        // setMePet(e.target.value);
        // console.log(e.target.value);
        // setPatientGender(e.target.value);
        // console.log(e.target.value);
        // setValue(e.target.value);
        // console.log(e.target.value);
        

        const emailRegex = /^\S+@\S+\.\S+$/;
        const { name, value } = e.target;

        if (name === 'patientgender') {
            setPatientGender(e.target.value);
            console.log(e.target.value);
        }
        if (name === 'mepet') {
            setMePet(e.target.value);
            console.log(e.target.value);
        }

        if (name === 'birthdate') {
            setBirthDate(value);
            console.log(value);
        }
        if (name === 'patientfirstname') {
            setPatientFirstName(value);
            console.log(value);
        }
        if (name === 'patientlastname') {
            setPatientLastName(value);
            console.log(value);
        }
        if (name === 'patientaddress') {
            setPatientAddress(value);
            console.log(value);
        }
        if (name === 'patientcity') {
            setPatientCity(value);
            console.log(value);
        }
        if (name === 'patientzip') {
            setPatientZip(value);
            console.log(value);
            if (value.length === 5) {
                console.log('great');
            }
        }
        if (name === 'patientreason') {
            setPatientReason(value);
            console.log(value);
        }
        if (name === 'patientemail') {

            setPatientEmail(value);
            console.log(value);
            if (value.length > 0 && emailRegex.test(value)) {
                console.log('email ok');
            }
        }
        // if (name === 'patientnumber') {
        //     setValue(value);
        //     console.log(value);
        //     if (value.length === 11) {
        //         console.log('great');
        //     }
        // }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('hello');

        const patientfirstname = e.target.patientfirstname.value
        const patientgender = e.target.patientgender.value
        const patientaddress = e.target.patientaddress.value
        const patientemail = e.target.patientemail.value
        const patientlastname = e.target.patientlastname.value
        const patientcity = e.target.patientcity.value
        const patientnumber = e.target.patientnumber.value
        const patientreason = e.target.patientreason.value
        // const patientnumber = e.target.patientnumber.value
        const birthdate = e.target.birthdate.value
        const patientzip = e.target.patientzip.value
        const mepet = e.target.mepet.value

        try {
            await addPatient({
                variables: { patientnumber: patientnumber, patientfirstname: patientfirstname, patientgender: patientgender, patientaddress: patientaddress, patientemail: patientemail, patientlastname: patientlastname, patientcity: patientcity, patientreason: patientreason, birthdate: birthdate, mepet: mepet, patientzip: parseInt(patientzip) }
            });

            setPatientFirstName("");
            setPatientLastName("")
            // setMale("");
            setPatientGender("");
            // setMale("");
            // setFemale("");
            setPatientReason("");
            setMePet("");
            setPatientCity("")
            setPatientAddress("");
            setPatientZip("");
            setPatientEmail("");
            // setPatientNumber("")
            setValue("");
            setBirthDate("");


            console.log(`success adding ${patientfirstname}`)

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='container'>
            <h1>Please answer few questions</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='row'>
                    <div className='col-6'>
                        <div>
                            <label className="form-label">Who is the appointment for?</label><br />
                            <input
                                type="radio"
                                name="mepet"
                                value="me"
                                checked={mepet === 'me'}
                                onChange={handleChange} /> me
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="mepet"
                                value="mypet"
                                checked={mepet === 'mypet'}
                                onChange={handleChange} /> my pet
                        </div>
                    </div>

                    <div className='col-6'>
                        <div>
                            <label className="form-label">Who is the appointment for?</label><br />
                            <input
                                type="radio"
                                name="patientgender"
                                value='male'
                                checked={patientgender === 'male'}
                                onChange={handleChange} /> male
                        </div>
                        <div>
                            <input
                                type="radio"
                                name='patientgender'
                                value='female'
                                checked={patientgender === 'female'}
                                onChange={handleChange} /> female
                        </div>
                    </div>

                    <div className='col-6'>
                        <label className="form-label">Age</label><br />
                        <input
                            type='text'
                            name="birthdate"
                            value={birthdate}
                            onChange={handleChange}
                            placeholder="MM/DD/YYYY..."
                        />
                    </div>

                    <div className="col-6">
                        <label className="form-label1"> First name</label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            value={patientfirstname}
                            name="patientfirstname"
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
                        <label className="form-label1"> Last name</label>
                        <input
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="patientlastname"
                            value={patientlastname}
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

                    <div className="col-6">
                        <label className="form-label1">Address</label>
                        <input
                            className="form-control"
                            value={patientaddress}
                            onChange={handleChange}
                            type="text"
                            name="patientaddress"
                            placeholder="address..." />
                        <div className='validate3'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate3'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label1">City</label>
                        <input
                            className="form-control"
                            value={patientcity}
                            type="text"
                            name="patientcity"
                            onChange={handleChange}
                            placeholder="enter city..." />
                        <div className='validate4'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate4'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label1">zip code</label>
                        <input
                            className="form-control"
                            name="patientzip"
                            value={patientzip}
                            onChange={handleChange}
                            type="Number"
                            placeholder="zip code..." />
                        <div className='validate5'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate5'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            value={patientemail}
                            onChange={handleChange}
                            type="email"
                            name="patientemail"
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
                        <Input
                            placeholder="Enter phone number"
                            name='patientnumber'
                            value={patientnumber}
                            onChange={setValue}/>

                        <div className='validate3'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate3'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div className='col-6'>
                        <div>
                            <label className="form-label">What is your reason for visitint?</label>
                            <textarea className="form-control"
                                name="patientreason"
                                value={patientreason}
                                placeholder='type your text here...'
                                onChange={handleChange}>
                            </textarea>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary"
                            type="submit"
                            value="Send">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Visit;