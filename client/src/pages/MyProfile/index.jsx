import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import Navbar from '../../components/Navbar';
import { DELETE_USER } from '../../utils/mutations';
import style from './index.css';

const MyProfile = () => {
    const { data } = useQuery(QUERY_ME);

    const me = data?.me || [];
    // console.log('me', me);
    const profile = me.profile;
    const email = me.email;
    const username = me.username;
    const profileId = me._id;
    // console.log('profileId', profileId);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!')

    };

    const [deleteUser] = useMutation(DELETE_USER, {
        variables: { id: profileId },
        update(cache, { data: { deleteUser } }) {
            try {
                const { users } = cache.readQuery({ query: QUERY_USERS });

                cache.writeQuery({
                    query: QUERY_USERS,
                    data: { users: [...users, deleteUser] },
                })
            } catch (e) {
                console.error(e);
            }
        }
    }
    );
    
    if (!profile) {

        return (
            <div>
                <Navbar />
                <div className='container-profile'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>My profile</h3>
                    <div className="flex-row justify-space-between my-4">

                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>Login</h3>
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Username: {me.username}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Email: {me.email}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <div className='container-profile'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>My profile</h3>
                    <div className="flex-row justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>Login</h3>
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Username: {username}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Email: {email}</span>
                                </h4>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>General</h3>
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">

                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        First name: {profile.patientfirstname}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Last name: {profile.patientlastname}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Birth date: {profile.birthdate}</span>
                                </h4>
                            </div>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5.5rem' }}>Contact</h3>
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Address: {profile.patientaddress}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        City: {profile.patientcity}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        State: {profile.patientState}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Zip code: {profile.patientzip}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Phone number: {profile.patientnumber}</span>

                                </h4>
                            </div>
                        </div>
                        <button className='btt-profile-delete' onClick={(event) => {deleteUser(); logout(event)}}>
                            delete
                        </button>
                        <Link to='/UpdateMyProfile' className='nav-item'>
                        <button className='btt-profile-update'>
                            update
                        </button>
                        </Link>
                    </div>
                </div>
            </div >
        )
    }
};
export default MyProfile;