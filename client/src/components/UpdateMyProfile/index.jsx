import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import Input from 'react-phone-number-input/input';
import SelectUSState from 'react-select-us-states';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';

// import './index.css';
import Navbar from '../Navbar';


const UpdateMyProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState('');
    const [patientState, setNewValue] = useState('');
    const [patientnumber, setValue] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [zip, setzip] = useState('');
    // const [email, setEmail] = useState('');

    const { data: meData } = useQuery(QUERY_ME);
    // const profile = me.profile;
    const profileId = profile._id;
    const patientzip = parseInt(zip);
    console.log('profile update foorm', profile);
    console.log('profile id form update form', profileId)

    const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
        update(cache, { data: { updateProfile } }) {
            try {
                const { profiles } = cache.readQuery({ query: QUERY_PROFILES });

                cache.writeQuery({
                    query: QUERY_PROFILES,
                    data: { profiles: [...profiles, updateProfile] },
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, profile: { ...me.profile, updateProfile } } },
            });
        },
    });
    useEffect(() => {
        if (meData) {
            const me = meData?.me || [];
            const profile = me.profile;
            setProfile(profile);
        }
    }, [meData]);

    const handleChange = (e) => {

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

        const { name, value } = e.target;

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
        if (name === 'zip') {
            setzip(value);
            if (value.length === 5) {
                x4.style.display = "block";
                y4.style.display = "none";
            } else {
                x4.style.display = "none";
                y4.style.display = "block";
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
                },
            });
            console.log('success updating profile');
            setNewValue('');
            setPatientCity('');
            setPatientAddress('');
            setzip('');
            setValue('');
            setPatientLastName('');
        } catch (err) {
            console.error(err);
        }
        navigate('/AppointmentConfirmation');
    };

    return (
        <>
            <Navbar />
            <div>
                {/* {(email && !profileId) ? ( */}
                <div className='container-visitor'>
                    <h1>Updating your profile</h1>
                    <div className='card-visitor'>
                        <form className='profile-update'>
                            <div className='row m-5'>


                                <div className="col-6">
                                    <label className="form-label1"> Last name</label>
                                    <input
                                        className="form-control"
                                        onChange={handleChange}
                                        type="text"
                                        name="patientlastname"
                                        value={patientlastname}
                                        placeholder={profile.patientlastname} />
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
                                        placeholder={profile.patientaddress} />
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
                                        placeholder={profile.patientcity} />
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
                                        name="zip"
                                        value={zip}
                                        onChange={handleChange}
                                        type="Number"
                                        placeholder={profile.patientzip} />
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
                                        placeholder={profile.patientnumber}
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

                                <div className="col-12">
                                    <button className="btn btn-primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                        value="Send">
                                        Submit
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* ) : ( */}
                {/* <div>Reasons</div> */}
                {/* )} */}
            </div>
        </>
    );
};

export default UpdateMyProfile;





