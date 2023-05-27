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
                <div className='container-profile'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>Profile</h3>
                    <div className="flex-row justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.6rem' }}>Login</h3>
                            <div className="card profile-card mb-3">
                                <div className="card-body profile-body">
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaIdBadge className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        Username: {me.username}</div> <br />
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaEnvelope className="icon m-2" style={{ fontSize: '1.2rem' }} />
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
                                       {me.email}</div> <br />
                                    <div className="text" style={{ fontSize: '1.2rem' }}>
                                        <FaPhone className="icon m-2" style={{ fontSize: '1.2rem' }} />
                                        {userProfile.patientnumber}</div>
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
                        <div>
                            <DeleteModal
                                userProfile={userProfile}
                                userId={userId}
                                myAppointments={myAppointments}
                                profileId={profileId}
                                myPets={myPets} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
};
export default Profile;