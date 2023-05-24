import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
// import Input from 'react-phone-number-input/input';
import { PatternFormat } from 'react-number-format';
import SelectUSState from 'react-select-us-states';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";

import './index.css';
import Navbar from '../Navbar';

const UpdateMyProfileForm = (props) => {
    const profileId = props.profileId;
    // console.log('profileId', profileId);

    const navigate = useNavigate();
    const location = useLocation();
    const userProfile = location.state.userProfile;
    // console.log('userProfile', userProfile);

    const [profile, setProfile] = useState('');
    const [patientState, setNewValue] = useState('');
    const [patientnumber, setPatientNumber] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [zip, setzip] = useState('');
    const [patientemail, setPatientEmail] = useState('');
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const [updateProfile] = useMutation(UPDATE_PROFILE);
    const patientzip = parseInt(zip);

    const handleChange = (e) => {


        const { name, value } = e.target;

        if (name === 'patientlastname') {
            if (value.length > 2)
                setPatientLastName(value);
        }
        if (name === 'patientaddress') {
            if (value.length > 5)
                setPatientAddress(value);
        }
        if (name === 'patientcity') {
            if (value.length > 2)
                setPatientCity(value);
        }
        if (name === 'patientemail') {
            if (emailRegex.test(value))
                setPatientEmail(value);
        }
        if (name === 'patientnumber') {
            if (phoneRegex.test(value))
                setPatientNumber(value);
        }
        if (name === 'zip') {
            if (value.length === 5)
                setzip(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await updateProfile({
                variables: { id: profileId, patientlastname: patientlastname, patientaddress: patientaddress, patientnumber: patientnumber, patientcity: patientcity, patientzip: patientzip, patientState: patientState }
            });
            console.log('success updating profile');
            setNewValue('');
            setPatientCity('');
            setPatientAddress('');
            setzip('');
            setPatientNumber('');
            setPatientLastName('');
        } catch (err) {
            console.error(err);
        }
        navigate('/Dashboard');
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='container-update mt-5'>
                    <h1>Updating your profile</h1>
                    <div className='card-update'>
                        <form className='profile-update'>
                            <div className='row m-5'>
                                <div className="col-6">
                                    <label className="form-label"> Last name</label>
                                    <input
                                        className="form-control"
                                        onChange={handleChange}
                                        type="text"
                                        name="patientlastname"
                                        value={patientlastname}
                                        placeholder={userProfile.patientlastname}
                                         />

                                </div>
                                {/* <div className="col-6">
                                    <label className="form-label"> Email</label>
                                    <input
                                        className="form-control"
                                        onChange={handleChange}
                                        type="text"
                                        name="patientemail"
                                        value={patientemail}
                                        placeholder={userProfile.patientemail} />

                                </div> */}

                                <div className="col-6">
                                    <label className="form-label">Address</label>
                                    <input
                                        className="form-control"
                                        value={patientaddress}
                                        onChange={handleChange}
                                        type="text"
                                        name="patientaddress"
                                        placeholder={userProfile.patientaddress} />

                                </div>

                                <div className="col-6">
                                    <label className="form-label">City</label>
                                    <input
                                        className="form-control"
                                        value={patientcity}
                                        type="text"
                                        name="patientcity"
                                        onChange={handleChange}
                                        placeholder={userProfile.patientcity} />

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
                                    <label className="form-label">zip code</label>
                                    <input
                                        className="form-control"
                                        name="zip"
                                        value={zip}
                                        onChange={handleChange}
                                        type="Number"
                                        placeholder={userProfile.patientzip} />
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Phone number</label>

                                    <PatternFormat
                                     className='phone-update'
                                        format="(###) ### ####"
                                        allowEmptyFormatting mask="_"
                                        value={profile.patientnumber}
                                        name='patientnumber'
                                        placeholder={userProfile.patientnumber}
                                        onValueChange={(values, sourceInfo) => {
                                            setPatientNumber(values.value);
                                        }} />

                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary"
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
        </>
    );
};

export default UpdateMyProfileForm;





