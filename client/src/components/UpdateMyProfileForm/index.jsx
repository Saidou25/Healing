import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import SelectUSState from 'react-select-us-states';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";

import './index.css';
import Navbar from '../Navbar';

const UpdateMyProfileForm = (props) => {
    const profileId = props.profileId;

    const navigate = useNavigate();
    const location = useLocation();
    const userProfile = location.state.userProfile;
    const [patientState, setNewValue] = useState(userProfile.patientState);
    const [patientnumber, setPatientNumber] = useState(userProfile.patientnumber);
    const [patientlastname, setPatientLastName] = useState(userProfile.patientlastname);
    const [patientaddress, setPatientAddress] = useState(userProfile.patientaddress);
    const [patientcity, setPatientCity] = useState(userProfile.patientcity);
    const [patientzip, setPatientZip] = useState(userProfile.patientzip);
    // const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    const [updateProfile, { error, data }] = useMutation(UPDATE_PROFILE);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.error(err);
        }
        navigate('/MyProfile');
        // window.location.assign('/Profile');
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='container-update mt-5'>
                  {/* {data ? ( */}
                        {/* // <div className='row success'>
                        //     <div className='col-12 d-flex justify-content-center'>
                        //         <i className="fa-solid fa-check"></i>
                        //     </div>
                        //     <div className='col-12 d-flex justify-content-center mt-5'>
                        //         Success!
                        //     </div>
                        //     <div className='col-12 d-flex justify-content-center mt-5'>
                        //         Profile updated
                        //     </div>
                        // </div> */}
                    {/* ) : (  */}
                        <div>
                            <h3 className='update-title'>Please fill up the fields you would like to update.</h3>
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
                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UpdateMyProfileForm;





