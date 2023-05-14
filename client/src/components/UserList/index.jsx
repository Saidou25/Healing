import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import ProfileDisplay from '../ProfileDisplay';
import Navbar from '../Navbar';

const UserList = () => {
  // const [profileForDisplay, setProfileForDisplay] = useState('');
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  console.log('me', me);

  const myUserName = me.username;
  console.log('myUserName', myUserName);


  const { meLoading, data: profilesData } = useQuery(QUERY_PROFILES);
  
  const profiles = profilesData?.profiles || [];
  console.log('all profiles', profiles);

  const myProfile = profiles.filter(profile => profile.username === myUserName);
  console.log('myProfile', myProfile);
  const userProfile = myProfile[0]

  if (!userProfile) {
    return (
      <>
       <Navbar />
        {myUserName}
      </>
    )
  } 
    return (
      <div>
        <Navbar />
      
        <ProfileDisplay userProfile={userProfile} />
      </div>
    )

};

export default UserList;