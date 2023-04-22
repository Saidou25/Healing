import React from 'react';
// import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
// import { DELETE_USER } from '../../utils/mutations';
import style from './index.css';

const Profile = () => {

  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];
  console.log('user', user);
  const myName = user.username;
  console.log('userName', myName);
  const myProfileData = user.visitorappointments;
  console.log('myProfileData', myProfileData[0]);

  return (
     <div className='container-profile'>
        <h3 className="text-profile-title">My profile</h3>
        <div className='title-profile' style={{ fontSize: '1.9rem' }}>
          General
        </div>
        <div className="card-profile mb-3">

          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Username: {user.username}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            First name: {myProfileData[0].patientfirstname}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Last name: {myProfileData[0].patientlastname}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Date of birth: {myProfileData[0].birthdate}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Gender: {myProfileData[0].patientgender}</span> <br />
        </div>
        <div>
          <div className='title-profile ' style={{ fontSize: '1.9rem' }}>
            Contact information
          </div>
          <div className="card-profile mb-3">
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Email: {user.email}</span> <br />
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Phone number: {myProfileData[0].patientnumber}</span> <br />
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Address: {myProfileData[0].patientaddress}</span> <br />
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              City: {myProfileData[0].patientcity}</span> <br />
            {/* <span className="text-profile" style={{ fontSize: '1.7rem' }}>
               State: {bookingdate.patientstate}</span> <br /> */}
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Zip code: {myProfileData[0].patientzip}</span> <br />

          </div>
        </div>
      </div>
 )
};
export default Profile;