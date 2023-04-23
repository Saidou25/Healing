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
  const visitorappointments = data?.me.visitorappointments || [];
  console.log('visiitorinfo', visitorappointments)
  for ( let i = 0; i < visitorappointments.length; i ++) {
    const oneApp = (visitorappointments[0])
    console.log( 'one appointment', oneApp)
  }



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


  <button onClick={deleteUser}>Submit</button>

  return  (
  <div>
  <h3 className="text">Appointment List</h3>
  <div className="flex-row justify-space-between my-4">
     
                  <div className="card mb-3">
                      <h4 className="card-header bg-dark text-white p-2 m-0">
                          {visitorappointment.finalDateISO.toString()} <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              Username: {user.username}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              First name: {oneApp.patientfirstname}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              Last name: {oneApp.patientlastname}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              Date of birth: {oneApp.birthdate}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              Email: {oneApp.patieintemail}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              Phone number: {oneApp.patientnumber}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              Address: {oneApp.patientaddress}</span> <br />
                          <span className="text" style={{ fontSize: '1rem' }}>
                              City: {oneApp.patientcity}</span>
                      </h4>
                  </div>
              </div>
        
 
</div>
  )
};
export default Profile;