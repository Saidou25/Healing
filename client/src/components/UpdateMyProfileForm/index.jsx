import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import SelectUSState from 'react-select-us-states';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";
import { Regex } from '../../utils/Regex';
import Navbar from '../Navbar';
import Footer from '../Footer';

import './index.css';

const UpdateMyProfileForm = (props) => {
    const profileId = props.profileId;

    const navigate = useNavigate();
    const location = useLocation();

    const userProfile = location.state.userProfile;

    const [patientState, setNewValue] = useState(userProfile.patientState);
    const [patientnumber, setPatientNumber] = useState('');
    const [patientlastname, setPatientLastName] = useState(userProfile.patientlastname);
    const [patientaddress, setPatientAddress] = useState(userProfile.patientaddress);
    const [patientcity, setPatientCity] = useState(userProfile.patientcity);
    const [patientzip, setPatientZip] = useState(userProfile.patientzip);
    const [numberValue, setNumberValue] = useState('');
    const [error, setError] = useState('');
    const [updateProfile] = useMutation(UPDATE_PROFILE);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Regex.zipRegex.test(patientzip) || !patientzip) {
            setError('zip code needs to be a five digit number!');
            return;
        };
        if (!Regex.checkphone.test(numberValue) || !numberValue) {
            setError('Invalid phone format');
            return;
        }
        if (!patientaddress || !patientlastname || !patientcity || !patientzip) {
            console.log('is not a number');
            setError('All fields need to be filled!');
            return;
        }
        try {
            const { data } = await updateProfile({
                variables: {
                    id: profileId,
                    patientlastname: patientlastname,
                    patientaddress: patientaddress,
                    patientnumber: patientnumber,
                    patientcity: patientcity,
                    patientzip: patientzip,
                    patientState: patientState
                }
            });
            console.log('success updating profile');
            setNewValue('');
            setPatientCity('');
            setPatientAddress('');
            setPatientZip('');
            setPatientNumber('');
            setPatientLastName('');
        } catch (err) {
            setError('message');

        }
        navigate('/MyProfile');
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='container-update mt-5'>
                    <p className='update-p mb-5'>
                        Please modify the fields you would like to update with your new information.</p>
                    <h4 className="card-header bg-primary rounded-0 text-light p-4">
                        Update profile</h4>
                    <div className='card-update'>
                        <form className='profile-update'>
                            <div className='row mt-5'>
                                <div className="col-6 update-fields">
                                    <label className="form-label"> Last name</label>
                                    <input
                                        className="form-control update-control"
                                        onChange={(e) => setPatientLastName(e.target.value)}
                                        type="text"
                                        value={patientlastname}
                                        name="patientlastname"
                                    />
                                </div>
                                <div className="col-6  ">
                                    <label className="form-label">Address</label>
                                    <input
                                        className="form-control"
                                        value={patientaddress}
                                        onChange={(e) => setPatientAddress(e.target.value)}
                                        type="text"
                                        name="patientaddress"
                                    />
                                </div>
                                <div className="col-6 update-fields">
                                    <label className="form-label">City</label>
                                    <input
                                        className="form-control"
                                        value={patientcity}
                                        type="text"
                                        name="patientcity"
                                        onChange={(e) => setPatientCity(e.target.value)}
                                    />
                                </div>
                                <div className='col-6 update-fields'>
                                    <label className='form-label'>
                                        Select a state
                                    </label>
                                    <SelectUSState
                                        id="myId"
                                        className="myClassName"
                                        onChange={(e) => setNewValue(e)} />
                                </div>
                                <div className="col-6 update-fields">
                                    <label className="form-label">zip code</label>
                                    <input
                                        className="form-control"
                                        name="patientzip"
                                        value={patientzip}
                                        type="text"
                                        onChange={(e) => setPatientZip(e.target.value)}
                                    />
                                </div>
                                <div className="col-6 update-fields">
                                    <label className="form-label">Phone number</label>
                                    <PatternFormat
                                        className='phone-update'
                                        format="(###) ### ####"
                                        allowEmptyFormatting mask="_"
                                        name='patientnumber'
                                        onValueChange={(values, sourceInfo) => {
                                            setPatientNumber(values.formattedValue);
                                            setNumberValue(values.value);
                                        }} />
                                </div>
                                <div className="col-12 mt-5 ">
                                    {error && (
                                        <div className="bg-danger phone-error text-white">
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary rounded-0"
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        value="Send">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdateMyProfileForm;





