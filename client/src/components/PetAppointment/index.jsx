import React, { useState } from 'react';
import './index.css';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { ADD_PETAPPOINTMENT } from "../../utils/mutations";

const PetAppointment = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const passedVisitData = location.state;

    const [patientnumber, setValue] = useState('');
    const [petName, setPetName] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petReason, setPetReason] = useState('');
    const [petGender, setPetGender] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');
    const [patientemail, setPatientEmail] = useState('');

    const [addPetappointment, { loading, error }] = useMutation(ADD_PETAPPOINTMENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const handleChange = (e) => {

        const x = document.querySelector(".dovalidate");
        const y = document.querySelector(".doinvalidate");
        const x1 = document.querySelector(".dovalidate1");
        const y1 = document.querySelector(".doinvalidate1");
        const x2 = document.querySelector(".dovalidate2");
        const y2 = document.querySelector(".doinvalidate2");
        const x3 = document.querySelector(".dovalidate3");
        const y3 = document.querySelector(".doinvalidate3");
        const x4 = document.querySelector(".dovalidate4");
        const y4 = document.querySelector(".doinvalidate4");
        const x5 = document.querySelector(".dovalidate5");
        const y5 = document.querySelector(".doinvalidate5");
        const x6 = document.querySelector(".dovalidate6");
        const y6 = document.querySelector(".doinvalidate6");
        const x7 = document.querySelector(".dovalidate7");
        const y7 = document.querySelector(".doinvalidate7");
        const x8 = document.querySelector(".dovalidate8");
        const y8 = document.querySelector(".doinvalidate8");
        const x9 = document.querySelector(".dovalidate9");
        const y9 = document.querySelector(".doinvalidate9");
        const x11 = document.querySelector(".dovalidate11");
        const y11 = document.querySelector(".doinvalidate11");
        const x12 = document.querySelector(".dovalidate12");
        const y12 = document.querySelector(".doinvalidate12");
        const x13 = document.querySelector(".dovalidate13");
        const y13 = document.querySelector(".doinvalidate13");

        const emailRegex = /^\S+@\S+\.\S+$/;
        const { name, value } = e.target;


        if (name === 'petName') {
            setPetName(value);
            if (value.length > 2) {
                x.style.display = "block";
                y.style.display = "none";
            } else {
                x.style.display = "none";
                y.style.display = "block";
            }
        }
        if (name === 'petGender') {
            setPetGender(e.target.value);
            if (e.target.value) {
                x1.style.display = "block";
                y1.style.display = "none";
            } else {
                x1.style.display = "none";
                y1.style.display = "block";
            }
        }
        if (name === 'petAge') {
            setPetAge(value);
            if (value.length === 10) {
                x2.style.display = "block";
                y2.style.display = "none";
            } else {
                x2.style.display = "none";
                y2.style.display = "block";
            }
        }
        if (name === 'petBreed') {
            setPetBreed(value);
            if (value.length > 3) {
                x3.style.display = "block";
                y3.style.display = "none";
            } else {
                x3.style.display = "none";
                y3.style.display = "block";
            }
        }
        if (name === 'petWeight') {
            setPetWeight(value);
            if (value > 3) {
                x4.style.display = "block";
                y4.style.display = "none";
            } else {
                x4.style.display = "none";
                y4.style.display = "block";
            }
        }
        if (name === 'petReason') {
            setPetReason(value);
            if (value.length > 10) {
                x5.style.display = "block";
                y5.style.display = "none";
            } else {
                x5.style.display = "none";
                y5.style.display = "block";
            }
        }
        // const dovalidateAge = 2023 - value.split('').slice(6, 10).join('');
        if (name === 'patientfirstname') {
            setPatientFirstName(value);
            if (value.length > 2) {
                x6.style.display = "block";
                y6.style.display = "none";
            } else {
                x6.style.display = "none";
                y6.style.display = "block";
                return;
            }
        }
        if (name === 'patientlastname') {
            setPatientLastName(value);
            console.log(value)
            if (value.length > 2) {
                x7.style.display = "block";
                y7.style.display = "none";
            } else {
                x7.style.display = "none";
                y7.style.display = "block";
            }
        }
        if (name === 'patientaddress') {
            setPatientAddress(value);
            if (value.length > 5) {
                x8.style.display = "block";
                y8.style.display = "none";
            } else {
                x8.style.display = "none";
                y8.style.display = "block";
            }
        }
        if (name === 'patientcity') {
            setPatientCity(value);
            if (value.length > 2) {
                x9.style.display = "block";
                y9.style.display = "none";
            } else {
                x9.style.display = "none";
                y9.style.display = "block";
            }
        }
        if (name === 'patientzip') {
            setPatientZip(value);
            if (value.length === 5) {
                x11.style.display = "block";
                y11.style.display = "none";
            } else {
                x11.style.display = "none";
                y11.style.display = "block";
            }
        }
        if (name === 'patientemail') {
            setPatientEmail(value);
            if (value.length > 5 && emailRegex.test(value)) {

                x12.style.display = "block";
                y12.style.display = "none";
            } else {
                x12.style.display = "none";
                y12.style.display = "block";
            }
        }
        if (name === 'patientnumber') {
            setValue(e.target.value);
            console.log(e.target.value)
            if (e.target.value.length === 3) {

                x13.style.display = "block";
                y13.style.display = "none";
            } else {
                x13.style.display = "none";
                y13.style.display = "block";
            }
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const petNavigateData = {
            petReason: petReason,
            petName: petName,
            petAge: petAge,
            petWeight: petWeight,
            petBreed: petBreed,
            petGender: petGender
        }
        try {
            await addPetappointment({
                variables: { petName: petName, petGender: petGender, petWeight: parseInt(petWeight), petReason: petReason, petAge: petAge, petBreed: petBreed, isBooked: passedVisitData.isBooked, finalDateISO: passedVisitData.finalDateISO, appDay: passedVisitData.appDay, appMonth: passedVisitData.appMonth, appDate: parseInt(passedVisitData.appDate), appTime: passedVisitData.appTime, appYear: parseInt(passedVisitData.appYear), patientnumber: patientnumber, patientfirstname: patientfirstname, patientaddress: patientaddress, patientemail: patientemail, patientlastname: patientlastname, patientcity: patientcity, patientzip: parseInt(patientzip) }
            });

            navigate('/VisitorAppointment', { state: petNavigateData });

            setPatientFirstName("");
            setPatientLastName("")
            setPetGender("");
            setPetReason("");
            setPatientCity("");
            setPatientAddress("");
            setPatientZip("");
            setPatientEmail("");
            setValue("");
            setPetName("");
            setPetWeight("");
            setPetBreed("");
            setPetAge("");

            console.log(`success adding ${petName} 's appointment `);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='container-pet'>
            <h1>Please answer few questions bout your pet</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className='card-pet'>
                    <div className='row m-5'>
                        <div className="col-6">
                            <label className="form-label1"> Pet's name</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                value={petName}
                                name="petName"
                                placeholder="pet's name..."
                            />
                            <div className='dovalidate'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className='col-6'>
                            <div>
                                <label className="form-label">What is your pet's gender?</label><br />
                                <input
                                    type="radio"
                                    name="petGender"
                                    value='male'
                                    checked={petGender === 'male'}
                                    onChange={handleChange} /> male

                                <input
                                    type="radio"
                                    name='petGender'
                                    value='female'
                                    checked={petGender === 'female'}
                                    onChange={handleChange} /> female
                            </div>
                            <div className='dovalidate1'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate1'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className='col-6'>
                            <label className="form-label">Age</label><br />
                            <input
                                type='text'
                                name="petAge"
                                value={petAge}
                                onChange={handleChange}
                                placeholder="MM/DD/YYYY..."
                            />
                            <div className='dovalidate2'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate2'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label1"> Breed</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                value={petBreed}
                                name="petBreed"
                                placeholder="breed..." />
                            <div className='dovalidate3'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate3'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label1"> Pet's weight</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                name="petWeight"
                                value={petWeight}
                                placeholder="weight..." />
                            <div className='dovalidate4'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate4'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className='col-6'>
                            <div>
                                <label className="form-label">What is the reason for visitint?</label>
                                <textarea className="form-control"
                                    name="petReason"
                                    value={petReason}
                                    placeholder='type your text here...'
                                    onChange={handleChange}>
                                </textarea>
                                <div className='dovalidate5'>
                                    Looks good
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className='doinvalidate5'>
                                    required
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Please answer few questions about you</h1>
                <div className='card'>
                    <div className='row m-5'>

                        <div className="col-6">
                            <label className="form-label1"> First name</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                value={patientfirstname}
                                name="patientfirstname"
                                placeholder="first name..." />
                            <div className='dovalidate6'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate6'>
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
                            <div className='dovalidate7'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate7'>
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
                            <div className='dovalidate8'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate8'>
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
                            <div className='dovalidate9'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate9'>
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
                            <div className='dovalidate11'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate11'>
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
                            <div className='dovalidate12'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate12'>
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

                            <div className='dovalidate13'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='doinvalidate13'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary"
                        type="submit"
                        value="Send">
                        Submit
                    </button>
                </div>
            </form >
        </div >
    )
};

export default PetAppointment;