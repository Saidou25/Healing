import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Auth from "../../utils/auth";
import { DELETE_USER, DELETE_PET, DELETE_PROFILE, DELETE_BOOKINGDATE } from '../../utils/mutations';
import './index.css';

const Profile = (props) => {
    const userProfile = props.userProfile;
    const userId = props.userId;
    const myAppointments = props.myAppointments;
    const profileId = props.profileId;
    const myPets = props.myPets;

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];

    const [toConfirm, setToConfirm] = useState('');

    const [deleteUser] = useMutation(DELETE_USER);
    const [deleteProfile] = useMutation(DELETE_PROFILE);
    const [deletePet] = useMutation(DELETE_PET);
    const [deleteBookingdate] = useMutation(DELETE_BOOKINGDATE);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!');
    };

    const deleteAll = async (event) => {
        for (let pet of myPets) {
            const { data } = await deletePet({
                variables: { username: pet.username }
            });
        }
        for (let bookingdate of myAppointments) {
            const { data } = await deleteBookingdate({
                variables: { id: bookingdate._id }
            });
        }
        try {
            const { data } = await deleteProfile({
                variables: { id: profileId }
            })
        } catch (e) {
            console.error(e);
        }
        try {
            const { data } = await deleteUser({
                variables: { id: userId }
            })
        } catch (e) {
            console.error(e);
        }
        console.log('success');
        logout(event);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setToConfirm('toConfirm');
    };

    if (!userProfile) {

        return (
            <div>
                <div className='container-profile'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>Profile</h3>
                    <div className="flex-row justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.6rem' }}>Login</h3>
                            <div className="card profile-card mb-3">
                                {/* <div className="card"> */}
                                <div className="card-body profile-body">
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaIdBadge className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        Username: {me.username}</div> <br />
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaEnvelope className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        Email: {me.email}</div> <br />
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {/* <Navbar /> */}
                <div className='container-profile mt-5'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>
                        My profile</h3>
                    <div className="flex-row justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.6rem' }}>
                                Login</h3>
                            <div className="card profile-body p-3">
                                <div className="card-header">
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaIdBadge className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        Username: {userProfile.username}</div> <br />
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaEnvelope className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        Email: {me.email}</div> <br />
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaPhone className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        Phone number: {userProfile.patientnumber}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.6rem' }}>General</h3>
                            <div className="card profile-body p-3 ">
                                <div className="card-header">
                                    <div className="text-profile m-2" style={{ fontSize: '1.2rem' }}>
                                        First name: {userProfile.patientfirstname}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.2rem' }}>
                                        Last name: {userProfile.patientlastname}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.2rem' }}>
                                        Birth date: {userProfile.birthdate}</div>
                                </div>
                            </div>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.6.5rem' }}>Contact</h3>

                            <div className="card profile-body p-3">
                                <div className="card-header">
                                    <div className="text m-2" style={{ fontSize: '1.2rem' }}>
                                        Address: {userProfile.patientaddress}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.2rem' }}>
                                        City: {userProfile.patientcity}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.2rem' }}>
                                        State: {userProfile.patientState}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.2rem' }}>
                                        Zip code: {userProfile.patientzip}</div> <br />
                                </div>
                            </div>
                        </div>
                        <Link to='/UpdateProfile' state={{ userProfile }} className='nav-item'>
                            <button className='btn update-profile mt-5 btn-info rounded-0'>
                                update
                            </button> <br />
                        </Link>

                        {!toConfirm ? (
                            <div className='d-flex justify-content-end'>
                                <button
                                    type='button'
                                    className='btn delete-user btn-danger rounded-0'
                                    onClick={(event) => handleSubmit(event)}
                                >
                                    delete
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3>This operation is irreversible... Please confirm.</h3>

                                <button
                                    className='btn confirm-delete mt-4 btn-danger rounded-0'
                                    onClick={(event) => { deleteAll(event) }}>
                                    confirm
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        )
    }
};
export default Profile;