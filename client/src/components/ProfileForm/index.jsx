import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import SelectUSState from 'react-select-us-states';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';

import './index.css';

const ProfileForm = () => {

    const navigate = useNavigate();
    const [patientState, setNewValue] = useState('');
    const [patientnumber, setPatientNumber] = useState('');
    const [patientgender, setPatientGender] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');

    const { loading, data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const username = me.username;

    const [addProfile] = useMutation(ADD_PROFILE, {
        variables: { username, patientState, patientnumber, patientfirstname, patientgender, patientaddress, patientlastname, patientcity, birthdate, patientzip },
        update(cache, { data: { addProfile } }) {
            try {
                const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
                cache.writeQuery({
                    query: QUERY_PROFILES,
                    data: { profiles: [addProfile, ...profiles] },
                });
                console.log(`success adding ${patientfirstname} appointment`);

            } catch (e) {
                console.error(e);
            }
        }
    });

    // const handleChange = (e) => {


    //     const { name, value } = e.target;

    //     if (name === 'patientgender') {
    //         setPatientGender(e.target.value);
    //     }

    //     if (name === 'birthdate') {
    //         setBirthDate(value);
            // const validateAge = 2023 - value.split('').slice(6, 10).join('');
    //     }
    //     if (name === 'patientfirstname') {
    //         setPatientFirstName(value);
    //     }
    //     if (name === 'patientlastname') {
    //         setPatientLastName(value);
    //     }
    //     if (name === 'patientaddress') {
    //         setPatientAddress(value);
    //     }
    //     if (name === 'patientcity') {
    //         setPatientCity(value);
    //     }
    //     if (name === 'patientzip') {
    //         setPatientZip(value);
    //     }
    //     if (name === 'patientnumber') {
    //         setValue(e.target.value);
    //     }
    // };
    const handleFormSubmit = (event) => {
        event.preventDefault();

        addProfile(username, patientState, patientnumber, patientfirstname, patientgender, patientaddress, patientlastname, patientcity, birthdate, patientzip);

        setPatientFirstName("");
        setPatientLastName("")
        setPatientGender("");
        setPatientCity("")
        setPatientAddress("");
        setPatientZip("");
        setPatientNumber("");
        setBirthDate("");

        console.log(`success adding ${patientfirstname}' appointment`);
        navigate('/Dashboard');
    };

    if (loading) {
        return (
            <main>
                <h2>Loading . . . . . . </h2>
            </main>
        )
    }
    return (
        <>
            <Navbar />
            <div>
                <div className='container-profile'>
                    <h4 className="card-header bg-primary rounded-0 text-light p-4 mt-5"
                        style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                        Please answer few questions about you</h4>
                    <div className='card-body'>
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                            <div className='row mt-5'>
                                <div className='col-6'>
                                    <div>
                                        <label className="form-label gender-question">What is your gender?</label><br />
                                        <input
                                            className='radio m-2 ms-4'
                                            type="radio"
                                            name="patientgender"
                                            value='male'
                                            checked={patientgender === 'male'}
                                            onChange={(e) => setPatientGender(e.target.value)} /> male
                                        <input
                                            className='radio m-2 ms-4'
                                            type="radio"
                                            name='patientgender'
                                            value='female'
                                            checked={patientgender === 'female'}
                                            onChange={(e) => setPatientGender(e.target.value)} /> female
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <label className="form-label">Age</label><br />
                                    <input
                                        className='age'
                                        type='text'
                                        name="birthdate"
                                        value={birthdate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        placeholder="MM/DD/YYYY..."
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1"> First name</label>
                                    <input
                                        className="form-control"
                                        onChange={(e) => setPatientFirstName(e.target.value)}
                                        type="text"
                                        value={patientfirstname}
                                        name="patientfirstname"
                                        placeholder="first name..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1"> Last name</label>
                                    <input
                                        className="form-control"
                                        onChange={(e) => setPatientLastName(e.target.value)}
                                        type="text"
                                        name="patientlastname"
                                        value={patientlastname}
                                        placeholder="last name..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1">Address</label>
                                    <input
                                        className="form-control"
                                        value={patientaddress}
                                        onChange={(e) => setPatientAddress(e.target.value)}
                                        type="text"
                                        name="patientaddress"
                                        placeholder="address..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1">City</label>
                                    <input
                                        className="form-control"
                                        value={patientcity}
                                        type="text"
                                        name="patientcity"
                                        onChange={(e) => setPatientCity(e.target.value)}
                                        placeholder="enter city..." />
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>
                                        Select a state
                                    </label>
                                    <SelectUSState
                                        id="myId"
                                        className="myClassName"
                                        onChange={setNewValue} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1">zip code</label>
                                    <input
                                        className="form-control"
                                        name="patientzip"
                                        value={patientzip}
                                        onChange={(e) => setPatientZip(e.target.value)}
                                        type="text"
                                        placeholder="zip code..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">
                                        Phone number
                                    </label>
                                    <div>
                                    <PatternFormat
                                                    className='phone-update'
                                                    format="(###) ### ####"
                                                    allowEmptyFormatting mask="_"
                                                    name='patientnumber'
                                                    onValueChange={(values, sourceInfo) => {
                                                        setPatientNumber(values.formattedValue);
                                                    }} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn button-profile btn-primary rounded-0"
                                        type="submit"
                                        value="Send">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>Í
            </div>
        </>
    );
};
export default ProfileForm;