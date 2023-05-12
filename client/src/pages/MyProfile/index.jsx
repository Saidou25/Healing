import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import Navbar from '../../components/Navbar';
import { DELETE_USER } from '../../utils/mutations';
import style from './index.css';

const MyProfile = () => {

    const [profile, setProfile] = useState('');
    const [email, setPatientEmail] = useState('');
    const [username, setUserName] = useState('');
    const [profileId, setProfileId] = useState('');
    const [me, setMe] = useState('');
    const { data } = useQuery(QUERY_ME);

    // const profile = me.profile;
    // console.log('profile from MyProfile', profile);
    // const email = me.email;
    // const username = me.username;
    // const profileId = me._id;
    // console.log('profileId', profileId);
    // console.log('meme', me)
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!');
    };

    useEffect(() => {
        if (data) {
            const me = data?.me || [];
            const profile = me.profile;
            // const email = me.email;
            // setPatientEmail(email);
            setProfile(profile);
            setMe(me);
            // setUserName(username);

        }
    }, [data]);

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
                <div className='container-profile mt-5'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>My profile</h3>
                    <div className="flex-row justify-space-between my-4">

                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>Login</h3>
                            <div className="card mb-3">
                                <h4 className="card-header text-dark p-2 m-0">
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
                <div className='container-profile mt-5'>
                    <h3 className="text my-profile" style={{ fontSize: '2.5rem' }}>
                        My profile</h3>
                    <div className="flex-row row-profile justify-space-between my-4">
                        <div className='col-12 '>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>
                                Login</h3>
                            <div className="card text-white bg-primary mb-3">
                                <h4 className="card-body">
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                      <FaIdBadge className="icon m-2" style={{ fontSize: '1.6rem' }} />  
                                      Username: {me.username}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                      <FaEnvelope className="icon m-2" style={{ fontSize: '1.6rem' }} />  
                                      Email: {me.email}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                      <FaPhone className="icon m-2" style={{ fontSize: '1.6rem' }} />  
                                      Phone number: {profile.patientnumber}</span>
                                </h4>
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>General</h3>
                            <div className="card text-white bg-primary mb-3">
                                <h4 className="card-body ">

                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        First name: {profile.patientfirstname}</span> <br />
                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        Last name: {profile.patientlastname}</span> <br />
                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        Birth date: {profile.birthdate}</span>
                                </h4>
                            </div>
                            <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5.5rem' }}>Contact</h3>
                            <div className="card text-white bg-primary mb-3">
                                <h4 className="card-body">
                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        Address: {profile.patientaddress}</span> <br />
                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        City: {profile.patientcity}</span> <br />
                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        State: {profile.patientState}</span> <br />
                                    <span className="text m-2" style={{ fontSize: '1rem' }}>
                                        Zip code: {profile.patientzip}</span> <br />
                                </h4>
                            </div>
                        </div>
                        <Link to='/UpdateMyProfile' className='nav-item'>
                            <button className='btn delete-review mt-4 btn-info rounded-0'>
                                update
                            </button> <br />
                        </Link>
                        <button className='btn delete-review mt-4 btn-danger rounded-0' onClick={(event) => { deleteUser(); logout(event) }}>
                            delete
                        </button>
                    </div>
                </div>
            </div >
        )
    }
};
export default MyProfile;