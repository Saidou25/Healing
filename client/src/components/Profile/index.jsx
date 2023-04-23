import React from 'react';
// import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';
import { DELETE_USER } from '../../utils/mutations';
import style from './index.css';

const Profile = () => {

  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];
  console.log('user', user);
  const myName = user.username;
  console.log('userName', myName);
  // const myProfileData = user.visitorappointments;
  // console.log('myProfileData', myProfileData);


  const [deleteUser, { error }] = useMutation(DELETE_USER, {
    variables: { username: user.username},
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
  });



  return (
    <div className='container-profile'>
      <h3 className="text-profile-title">My profile</h3>
      <div className='title-profile' style={{ fontSize: '1.9rem' }}>
        General
      </div>
      <div className="card-profile mb-3">

        <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
          Username: {user.username}</span> <br />
        {/* <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            First name: {myProfileData.patientfirstname}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Last name: {myProfileData.patientlastname}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Date of birth: {myProfileData.birthdate}</span> <br />
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Gender: {myProfileData.patientgender}</span> <br /> */}
      </div>
      <button onClick={deleteUser}>Submit</button>
      <div>
        <div className='title-profile ' style={{ fontSize: '1.9rem' }}>
          Contact information
        </div>
        <div className="card-profile mb-3">
          <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
            Email: {user.email}</span> <br />
          {/* <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Phone number: {myProfileData.patientnumber}</span> <br />
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Address: {myProfileData.patientaddress}</span> <br />
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              City: {myProfileData.patientcity}</span> <br />
            <span className="text-profile" style={{ fontSize: '1.7rem' }}>
               State: {bookingdate.patientstate}</span> <br />
            <span className="text-profile m-3 mt-4" style={{ fontSize: '1.7rem' }}>
              Zip code: {myProfileData.patientzip}</span> <br /> */}

        </div>
      </div>
    </div>
  )
};
export default Profile;