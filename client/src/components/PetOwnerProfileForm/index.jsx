import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import { Regex } from '../../utils/Regex';
import SelectUSState from 'react-select-us-states';
import Navbar from '../Navbar';
import Footer from '../Footer';

import './index.css';

const PetOwnerProfileForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const appInfo = location.state.appInfo;
    const petForm = location.state.petForm;

    const [patientState, setNewValue] = useState('');
    const [patientnumber, setPatientNumber] = useState('');
    const [numberValue, setNumberValue] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if ( name === 'patientfirstname') {
           const upperCase = value.charAt(0).toUpperCase();
           const toAdd = value.split('').slice(1, ).join('');
           const UpperCaseName = upperCase.concat('', toAdd);
           setPatientFirstName(UpperCaseName);
        };
        if ( name === 'patientlastname') {
           const upperCase = value.charAt(0).toUpperCase();
           const toAdd = value.split('').slice(1, ).join('');
           const UpperCaseName = upperCase.concat('', toAdd);
            setPatientLastName(UpperCaseName);
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ownerInfo = {
            patientfirstname: patientfirstname,
            patientaddress: patientaddress,
            patientState: patientState,
            patientlastname: patientlastname,
            patientcity: patientcity,
            patientzip: patientzip,
            patientnumber: patientnumber,
            username: appInfo.username,
            profile: appInfo.profile
        };
        if (!patientfirstname ||
            !patientaddress ||
            !patientlastname ||
            !patientcity ||
            !patientState) {

            setError('All fields need to be filled!');
            return;
        };
        if (!Regex.zipRegex.test(patientzip) || !patientzip) {
            setError('zip code needs to be a five digit number!');
            return;
        };
        if (!Regex.checkphone.test(numberValue) || !patientnumber) {
            setError('10 digits phone number is missing!');
            return;
        };
        console.log('ok');

        navigate('/PetProfileForm', { state: { appInfo, ownerInfo, petForm } })
        setPatientFirstName('');
        setPatientLastName('');
        setPatientAddress('');
        setPatientZip('');
        setPatientCity('');
        setNewValue('');
        setPatientNumber('');
    };

    return (
        <>
            <Navbar />
            <main className='main-petOwner'>
                <div>
                    <div className='container-owner'>
                        <p>
                            Our practitioner will be driving to the address provided in the form below.
                            Please don't hesitate to add any useful information in the address field.
                        </p><br />
                        <h4 className="card-header owner-tilte bg-primary rounded-0 text-light p-4 mt-2">
                            Please answer few questions about yourself</h4>
                        <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className='row mt-4'>
                                    <div className="col-lg-6 col-sm-12 owner-fields">
                                        <label className="form-label1"> First name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            value={patientfirstname}
                                            name="patientfirstname"
                                            placeholder="first name..." />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 owner-fields">
                                        <label className="form-label1"> Last name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            name="patientlastname"
                                            value={patientlastname}
                                            placeholder="last name..." />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 owner-fields">
                                        <label className="form-label1">Address</label>
                                        <input
                                            className="form-control"
                                            value={patientaddress}
                                            onChange={(e) => setPatientAddress(e.target.value)}
                                            type="text"
                                            name="patientaddress"
                                            placeholder="address..." />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 owner-fields">
                                        <label className="form-label1">City</label>
                                        <input
                                            className="form-control"
                                            value={patientcity}
                                            type="text"
                                            name="patientcity"
                                            onChange={(e) => setPatientCity(e.target.value)}
                                            placeholder="enter city..." />
                                    </div>
                                    <div className='col-lg-6 col-sm-12 owner-fields'>
                                        <label className='form-label1'>
                                            Select a state
                                        </label>
                                        <SelectUSState
                                            id="myId"
                                            className="myClassName"
                                            onChange={setNewValue}
                                        />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 owner-fields">
                                        <label className="form-label1">Zip code</label>
                                        <input
                                            className="form-control"
                                            name="patientzip"
                                            value={patientzip}
                                            onChange={(e) => setPatientZip(e.target.value)}
                                            type="text"
                                            placeholder="zip code..." />
                                    </div>
                                    <div className="col-lg-6 col-sm-12 owner-fields">
                                        <label className="form-label1">
                                            Phone number
                                        </label>
                                        <div>
                                            <PatternFormat
                                                className='phone-update mb-5'
                                                format="(###) ### ####"
                                                allowEmptyFormatting mask="_"
                                                name='patientnumber'
                                                onValueChange={(values, sourceInfo) => {
                                                    setPatientNumber(values.formattedValue);
                                                    setNumberValue(values.value);
                                                }} />
                                        </div>
                                    </div>
                                    <div>
                                        {error && (
                                            <div className="bg-danger text-white mb-5">
                                                <p className='owner-error m-2'>
                                                    {error}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 d-flex justify-content-center">
                                        <button className="btn button-owner rounded-0 btn-primary"
                                            type="submit"
                                            value="Send">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </main>
            <Footer />
        </>
    )
};

export default PetOwnerProfileForm;