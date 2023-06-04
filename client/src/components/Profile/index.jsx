import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import DeleteModal from '../DeleteModal';
import './index.css';

const Profile = ({ userProfile, userId, myAppointments, profileId, myPets }) => {

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];

    if (!userProfile) {
        return (
            <div>
                <div className='container-profile mt-5'>
                    <div className="flex-row justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.7rem' }}>Login</h3>
                            <div className="card profile-body p-3">
                                <div className="card-header">
                                    <div className="text" style={{ fontSize: '1.4em' }}>
                                        <FaIdBadge className="icon m-2" style={{ fontSize: '1.4em' }} />
                                        {me.username}</div> <br />
                                    <div className="text" style={{ fontSize: '1.4em' }}>
                                        <FaEnvelope className="icon m-2" style={{ fontSize: '1.4em' }} />
                                        Email: {me.email}</div> <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='container-profile mt-5'>
                    <div className="flex-row justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.7rem' }}>
                                Login</h3>
                            <div className="card profile-body p-3">
                                <div className="card-header">
                                    <div className="text" style={{ fontSize: '1.4em' }}>
                                        <FaIdBadge className="icon m-2" style={{ fontSize: '1.4em' }} />
                                        {userProfile.username} </div> <br />
                                    <div className="text" style={{ fontSize: '1.4em' }}>
                                        <FaEnvelope className="icon m-2" style={{ fontSize: '1.4em' }} />
                                        {me.email}</div> <br />
                                    <div className="text" style={{ fontSize: '1.4em' }}>
                                        <FaPhone className="icon m-2" style={{ fontSize: '1.4em' }} />
                                        {userProfile.patientnumber}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.7rem' }}>General</h3>
                            <div className="card profile-body p-3 ">
                                <div className="card-header">
                                    <div className="text-profile m-2" style={{ fontSize: '1.4em' }}>
                                        First name: {userProfile.patientfirstname}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.4em' }}>
                                        Last name: {userProfile.patientlastname}</div> <br />
                                    {userProfile.birthdate ?
                                        <div className="text m-2" style={{ fontSize: '1.4em' }}>
                                            Birth date: {userProfile.birthdate}</div>
                                        :
                                        <>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.7rem' }}>Contact</h3>
                            <div className="card profile-body p-3">
                                <div className="card-header">
                                    <div className="text m-2" style={{ fontSize: '1.4em' }}>
                                        Address: {userProfile.patientaddress}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.4em' }}>
                                        City: {userProfile.patientcity}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.4em' }}>
                                        State: {userProfile.patientState}</div> <br />
                                    <div className="text m-2" style={{ fontSize: '1.4em' }}>
                                        Zip code: {userProfile.patientzip}</div> <br />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <Link to='/UpdateProfile' state={{ userProfile }}>
                                <button className='btn update-profile mt-5 btn-info' style={{ fontSize: '1.4em' }}>
                                    update
                                </button>
                            </Link>
                        </div>
                        <div className="col-12">
                            <DeleteModal
                                userProfile={userProfile}
                                userId={userId}
                                myAppointments={myAppointments}
                                profileId={profileId}
                                myPets={myPets} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Profile;