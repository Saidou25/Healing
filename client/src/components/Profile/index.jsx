import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';
import Navbar from '../Navbar';
// import { DELETE_USER } from '../../utils/mutations';
// import style from './index.css';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profileInfo, setProfileInfo] = useState('');

    const { data } = useQuery(QUERY_ME);
    const user = data?.me || []


    const mapProfile = (profiles) => {
        profiles.map((Profile) => {

            return setProfileInfo(Profile);
        })
    };

    useEffect(() => {
        if (data) {
            const user = data?.me || [];
            console.log('user', user);
            const profiles = user.profiles;
            console.log('profiles', profiles);
            const email = user.email;
            console.log('email', email);
            const username = user.username;
            setEmail(email)
            setUsername(username)
            mapProfile(profiles);
        }

    }, [data]);

    // const [deleteUser, { error }] = useMutation(DELETE_USER, {
    //     variables: { username: user.username },
    //     update(cache, { data: { deleteUser } }) {
    //         try {
    //             const { users } = cache.readQuery({ query: QUERY_USERS });

    //             cache.writeQuery({
    //                 query: QUERY_USERS,
    //                 data: { users: [...users, deleteUser] },
    //             })
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    // });

    return (
        <>
            <Navbar />
            <div>
                <h3>My Profile</h3>
                <div className="flex-row justify-space-between my-4">

                    <div className="card mb-3">
                        <h4 className="card-header bg-dark text-white p-2 m-0">

                            <span className="text" style={{ fontSize: '1rem' }}>
                                Username: {username}</span> <br />
                            <span className="text" style={{ fontSize: '1rem' }}>
                                Email: {email}</span> <br />
                            <span className="text" style={{ fontSize: '1rem' }}>
                                First name: {profileInfo.patientfirstname}</span> <br />
                            <span className="text" style={{ fontSize: '1rem' }}>
                                Last name: {profileInfo.patientlastname}</span> <br />
                            <span className="text" style={{ fontSize: '1rem' }}>
                                Address: {profileInfo.patientaddress}</span> <br />
                            <span className="text" style={{ fontSize: '1rem' }}>
                                City: {profileInfo.patientcity}</span> <br />
                            <span className="text" style={{ fontSize: '1rem' }}>
                                Zip code: {profileInfo.patientzip}</span>
                        </h4>
                    </div>
                    <button>Delete</button>
                </div>
            </div>
        </>

    )
};
export default Profile;