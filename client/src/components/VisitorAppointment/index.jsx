import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';
import SelectUSState from 'react-select-us-states';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_VISITORAPPOINTMENT } from "../../utils/mutations";
import { QUERY_VISITORAPPOINTMENTS, QUERY_USERS, QUERY_ME } from '../../utils/queries';
import './index.css';

const VisitorAppointment = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const passedVisitData = location.state;
    const [newValue, setNewValue] = useState('');
    const [patientnumber, setValue] = useState('');
    const [patientgender, setPatientGender] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');
    const [patientreason, setPatientReason] = useState('');

    const { data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    console.log('users', users);

    
    const [addVisitorappointment, { error }] = useMutation(ADD_VISITORAPPOINTMENT, {
        update(cache, { data: { addVisitorappointment } }) {
            try {
                const { visitorappointments } = cache.readQuery({ query: QUERY_VISITORAPPOINTMENTS });

                cache.writeQuery({
                    query: QUERY_VISITORAPPOINTMENTS,
                    data: { visitorappointments: [addVisitorappointment, ...visitorappointments] },
                });
            } catch (e) {
                console.error(e);
            }

            // update me object's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, visitorappointments: [...me.visitorappointments, addVisitorappointment] } },
            });
        },
        
    });
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const appointment = passedVisitData.finalDateISO

        // const navigateData = {

        //     isBooked: passedVisitData.isBooked,
        //     finalDateISO: passedVisitData.finalDateISO,
        //     appDay: passedVisitData.appDay,
        //     appMonth: passedVisitData.appMonth,
        //     appDate: parseInt(passedVisitData.appDate),
        //     appTime: passedVisitData.appTime,
        //     appYear: parseInt(passedVisitData.appYear),
        //     appointment: passedVisitData.appointment,
        //     patientnumber: patientnumber,
        //     patientfirstname: patientfirstname,
        //     patientgender: patientgender,
        //     patientaddress: patientaddress,
        //     patientlastname: patientlastname,
        //     patientcity: patientcity,
        //     patientreason: patientreason,
        //     birthdate: birthdate,
        //     patientzip: parseInt(patientzip)
        // }

        try {
            const { data } = await addVisitorappointment({
                variables: { appointment: appointment, mepet: passedVisitData.mepet, isBooked: passedVisitData.isBooked, finalDateISO: passedVisitData.finalDateISO, appDay: passedVisitData.appDay, appMonth: passedVisitData.appMonth, appDate: parseInt(passedVisitData.appDate), appTime: passedVisitData.appTime, appYear: parseInt(passedVisitData.appYear), patientnumber: patientnumber, patientfirstname: patientfirstname, patientgender: patientgender, patientaddress: patientaddress, patientlastname: patientlastname, patientcity: patientcity, patientreason: patientreason, birthdate: birthdate, patientzip: parseInt(patientzip) }
            });
            setPatientFirstName("");
            setPatientLastName("")
            setPatientGender("");
            setPatientReason("");
            setPatientCity("")
            setPatientAddress("");
            setPatientZip("");
            setValue("");
            setBirthDate("");
            // navigate('/AppointmentConfirmation', { state: navigateData });

            console.log(`success adding ${patientfirstname} appointment on ${appointment}`);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {

        const x = document.querySelector(".validate");
        const y = document.querySelector(".invalidate");
        const x1 = document.querySelector(".validate1");
        const y1 = document.querySelector(".invalidate1");
        const x2 = document.querySelector(".validate2");
        const y2 = document.querySelector(".invalidate2");
        const x3 = document.querySelector(".validate3");
        const y3 = document.querySelector(".invalidate3");
        const x4 = document.querySelector(".validate4");
        const y4 = document.querySelector(".invalidate4");
        const x6 = document.querySelector(".validate6");
        const y6 = document.querySelector(".invalidate6");
        const x7 = document.querySelector(".validate7");
        const y7 = document.querySelector(".invalidate7");
        const x8 = document.querySelector(".validate8");
        const y8 = document.querySelector(".invalidate8");
        const x9 = document.querySelector(".validate9");
        const y9 = document.querySelector(".invalidate9");


        const { name, value } = e.target;

        if (name === 'patientgender') {
            setPatientGender(e.target.value);

            if (e.target.value) {
                x9.style.display = "block";
                y9.style.display = "none";
            } else {
                x9.style.display = "none";
                y9.style.display = "block";
            }
        }
        // if (name === 'mepet') {
        //     setMePet(e.target.value);

        //     if (e.target.value === 'mypet')
        //         navigate('/PetForm')
        // }
        if (name === 'birthdate') {
            setBirthDate(value);

            // const validateAge = 2023 - value.split('').slice(6, 10).join('');

            if (value.length === 10) {
                x8.style.display = "block";
                y8.style.display = "none";
            } else {

                x8.style.display = "none";
                y8.style.display = "block";
            }
        }
        if (name === 'patientfirstname') {
            setPatientFirstName(value);
            if (value.length > 2) {
                x.style.display = "block";
                y.style.display = "none";
            } else {
                x.style.display = "none";
                y.style.display = "block";
                return;
            }
        }
        if (name === 'patientlastname') {
            setPatientLastName(value);
            if (value.length > 2) {
                x1.style.display = "block";
                y1.style.display = "none";
            } else {
                x1.style.display = "none";
                y1.style.display = "block";
            }
        }
        if (name === 'patientaddress') {
            setPatientAddress(value);
            if (value.length > 5) {
                x2.style.display = "block";
                y2.style.display = "none";
            } else {
                x2.style.display = "none";
                y2.style.display = "block";
            }
        }
        if (name === 'patientcity') {
            setPatientCity(value);
            if (value.length > 2) {
                x3.style.display = "block";
                y3.style.display = "none";
            } else {
                x3.style.display = "none";
                y3.style.display = "block";
            }
        }
        if (name === 'patientzip') {
            setPatientZip(value);
            if (value.length === 5) {
                x4.style.display = "block";
                y4.style.display = "none";
            } else {
                x4.style.display = "none";
                y4.style.display = "block";
            }
        }
        if (name === 'patientreason') {
            setPatientReason(value);
            if (value.length > 10) {
                x7.style.display = "block";
                y7.style.display = "none";
            } else {
                x7.style.display = "none";
                y7.style.display = "block";
            }
        }

        if (name === 'patientnumber') {
            setValue(e.target.value);
            console(e.target.value)
            if (e.target.value.length === 3) {

                x6.style.display = "block";
                y6.style.display = "none";
            } else {
                x6.style.display = "none";
                y6.style.display = "block";
            }
        }
    };

    return (
        <div className='container-visitor'>
            <h1>Please answer few questions about you</h1>
            <div className='card-visitor'>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className='row m-5'>
                        <div className='col-6'>
                            <div>
                                <label className="form-label gender-question">What is your gender?</label><br />
                                <input
                                    type="radio"
                                    name="patientgender"
                                    value='male'
                                    checked={patientgender === 'male'}
                                    onChange={handleChange} /> male
                                <input
                                    type="radio"
                                    name='patientgender'
                                    value='female'
                                    checked={patientgender === 'female'}
                                    onChange={handleChange} /> female
                            </div>
                            <div className='validate9'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate9'>
                                required
                                <i className="fa-solid fa-check"></i>
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
                            <div className='validate8'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate8'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
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
                            <label className="form-label1">City</label>
                            <input
                                className="form-control"
                                value={patientcity}
                                type="text"
                                name="patientcity"
                                onChange={handleChange}
                                placeholder="enter city..." />
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
                            Select a state: <SelectUSState id="myId" className="myClassName" onChange={setNewValue} />
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
                            <label className="form-label">Phone number</label>
                            <Input
                                placeholder="Enter phone number"
                                name='patientnumber'
                                value={patientnumber}
                                onChange={setValue} />

                            <div className='validate6'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate6'>
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
                                <div className='validate7'>
                                    Looks good
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className='invalidate7'>
                                    required
                                    <i className="fa-solid fa-check"></i>
                                </div>
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
        </div>
    )
};

export default VisitorAppointment;