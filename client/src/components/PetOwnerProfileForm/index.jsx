import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';
import SelectUSState from 'react-select-us-states';
import Navbar from '../Navbar';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_USERS, QUERY_PROFILES } from '../../utils/queries';

import './index.css';

const PetOwnerProfileForm = (props) => {
    const userProfile = props.userProfile;
    const mepet = props.mepet;
    const navigate = useNavigate();

    const [profile, setProfile] = useState('');
    // const [profileId, setProfileId] = useState('');
    const [patientState, setNewValue] = useState('');
    const [patientnumber, setValue] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');

    // const [addProfile] = useMutation(ADD_PROFILE);
    const { loading, data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const username = me.username;

    const profileInfo = me.profile;

    const [addProfile, { error, data }] = useMutation(ADD_PROFILE, {
        variables: { username, patientState, patientnumber, patientfirstname, patientaddress, patientlastname, patientcity, patientzip },

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
            // const { me } = cache.readQuery({ query: QUERY_ME });
            // cache.writeQuery({
            //   query: QUERY_ME,
            //   data: { me: { ...me, profile: [addProfile, ...me.profile] } },
            // });
        }
    });
    // console.log('data from pet owner form', data);

    const handleChange = (e) => {

        // const x = document.querySelector(".validate");
        // const y = document.querySelector(".invalidate");
        // const x1 = document.querySelector(".validate1");
        // const y1 = document.querySelector(".invalidate1");
        // const x2 = document.querySelector(".validate2");
        // const y2 = document.querySelector(".invalidate2");
        // const x3 = document.querySelector(".validate3");
        // const y3 = document.querySelector(".invalidate3");
        // const x4 = document.querySelector(".validate4");
        // const y4 = document.querySelector(".invalidate4");
        // const x6 = document.querySelector(".validate6");
        // const y6 = document.querySelector(".invalidate6");

        const { name, value } = e.target;

        if (name === 'patientfirstname') {
            setPatientFirstName(value);
            // if (value.length > 2) {
            //     x.style.display = "block";
            //     y.style.display = "none";
            // } else {
            //     x.style.display = "none";
            //     y.style.display = "block";
            //     return;
            // }
        }
        if (name === 'patientlastname') {
            setPatientLastName(value);
            // if (value.length > 2) {
            //     x1.style.display = "block";
            //     y1.style.display = "none";
            // } else {
            //     x1.style.display = "none";
            //     y1.style.display = "block";
            // }
        }
        if (name === 'patientaddress') {
            setPatientAddress(value);
            // if (value.length > 5) {
            //     x2.style.display = "block";
            //     y2.style.display = "none";
            // } else {
            //     x2.style.display = "none";
            //     y2.style.display = "block";
            // }
        }
        if (name === 'patientcity') {
            setPatientCity(value);
            // if (value.length > 2) {
            //     x3.style.display = "block";
            //     y3.style.display = "none";
            // } else {
            //     x3.style.display = "none";
            //     y3.style.display = "block";
            // }
        }
        if (name === 'patientzip') {
            const zip = parseInt(value);
            setPatientZip(zip);
            // if (value.length === 5) {
            //     x4.style.display = "block";
            //     y4.style.display = "none";
            // } else {
            //     x4.style.display = "none";
            //     y4.style.display = "block";
            // }
        }
        if (name === 'patientnumber') {
            setValue(e.target.value);
            // console(e.target.value)
            // if (e.target.value.length === 3) {

            //     x6.style.display = "block";
            //     y6.style.display = "none";
            // } else {
            //     x6.style.display = "none";
            //     y6.style.display = "block";
            // }
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        addProfile(username, patientState, patientnumber, patientfirstname, patientaddress, patientlastname, patientcity, patientzip)
        // try {
        //     const { data } = await addProfile({
        //         // variables: { patientState: patientState, patientnumber: patientnumber, patientfirstname: patientfirstname, patientaddress: patientaddress, patientlastname: patientlastname, patientcity: patientcity, patientzip: patientzip },
        //     });
        // setPatientFirstName("");
        // setPatientLastName("");
        // setPatientCity("")
        // setPatientAddress("");
        // setPatientZip("");
        // setValue("");
        // } catch (e) {
        //     console.error(e);
        // }
        console.log(`success adding your info ${patientfirstname} !`);
        (mepet === 'pet') ? navigate('/PetProfileForm', { state: username }) : navigate('/Dashboard');


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
                {!userProfile ? (
                    <div className='container-visitor mt-5'>
                        <h4 className="card-header bg-primary rounded-0 text-light p-4"
                            style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                            Please answer few questions about you</h4>
                        <div className="card-body">
                            {/* {profile ? (
                            <p>
                                Success! You may now head{' '}
                                {/* <Link to="/Login">lets now login.</Link> */}
                            <Link to="/PetProfileForm">lets go</Link>
                            {/* </p> */}
                            {/* ) : ( */}
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className='row m-5'>
                                    <div className="col-6">
                                        <label className="form-label"> First name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            value={patientfirstname}
                                            name="patientfirstname"
                                            placeholder="first name..." />
                                        {/* <div className='validate'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div> */}
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label"> Last name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            name="patientlastname"
                                            value={patientlastname}
                                            placeholder="last name..." />
                                        {/* <div className='validate1'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate1'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div> */}
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">Address</label>
                                        <input
                                            className="form-control"
                                            value={patientaddress}
                                            onChange={handleChange}
                                            type="text"
                                            name="patientaddress"
                                            placeholder="address..." />
                                        {/* <div className='validate2'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate2'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div> */}
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">City</label>
                                        <input
                                            className="form-control"
                                            value={patientcity}
                                            type="text"
                                            name="patientcity"
                                            onChange={handleChange}
                                            placeholder="enter city..." />
                                        {/* <div className='validate3'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate3'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div> */}
                                    </div>

                                    <div className='col-6'>
                                        <label className='form-label'>
                                            Select a state
                                        </label>

                                        <SelectUSState
                                            id="myId"
                                            className="myClassName"
                                            onChange={setNewValue}

                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">Zip code</label>
                                        <input
                                            className="form-control"
                                            name="patientzip"
                                            value={patientzip}
                                            onChange={handleChange}
                                            type="Number"
                                            placeholder="zip code..." />
                                        {/* <div className='validate4'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate4'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div> */}
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">
                                            Phone number
                                        </label>
                                        <div>
                                            <Input
                                                className='phone-number'
                                                placeholder="Enter phone number..."
                                                name='patientnumber'
                                                value={patientnumber}
                                                onChange={setValue} />

                                            {/* <div className='validate6'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate6'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div> */}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button className="btn button-owner rounded-0 btn-primary"
                                            type="submit"
                                            value="Send">Submit</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div >
                ) : (
                    <p>
                        Success! You may now head{' '}
                        <Link to='/Dashboard'>Appointment booked</Link>
                    </p>

                )}
            </div >
        </>
    )


};

export default PetOwnerProfileForm;