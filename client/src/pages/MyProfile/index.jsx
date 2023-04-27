import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';
import Navbar from '../../components/Navbar';
// import { DELETE_USER } from '../../utils/mutations';
import style from './index.css';

const MyProfile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profiles, setProfiles] = useState('');
    const { data } = useQuery(QUERY_ME);
    // const user = data?.me || []


    // const mapProfile = (profiles) => {
    //     profiles.map((Profile) => {

    //         return setProfileInfo(Profile);
    //     })
    // };

    useEffect(() => {
        if (data) {
            const user = data?.me || [];
            console.log('user', user);
            const profiles = user.profiles;
            console.log('profiles', profiles);
            const email = user.email;
            console.log('email', email);
            const username = user.username;
            setEmail(email);
            setUsername(username);
            setProfiles(profiles);
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

    // if (!bookingdates.length) {
    //     return <h3>No appointments Yet</h3>;
    // }
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

                    {profiles &&
                        profiles.map((Profile) => (
                            <div key={Profile._id} className="col-12">
                                <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5rem' }}>General</h3>
                                <div className="card mb-3">
                                    <h4 className="card-header bg-dark text-white p-2 m-0">

                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            First name: {Profile.patientfirstname}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            Last name: {Profile.patientlastname}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            Birth date: {Profile.birthdate}</span>
                                    </h4>
                                </div>
                                <h3 className="text my-profile-titles mb-5 mt-5" style={{ fontSize: '1.5.5rem' }}>Contact</h3>
                                <div className="card mb-3">
                                    <h4 className="card-header bg-dark text-white p-2 m-0">
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            Address: {Profile.patientaddress}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            City: {Profile.patientcity}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            State: {Profile.patientState}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            Zip code: {Profile.patientzip}</span> <br />
                                        <span className="text" style={{ fontSize: '1rem' }}>
                                            Phone number: {Profile.patientnumber}</span>

                                    </h4>
                                </div>
                            </div>

                        ))}
                </div>
            </div>
        </div >
    )
};
export default MyProfile;