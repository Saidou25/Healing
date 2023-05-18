import React, { useState } from 'react';
import Profile from '../../components/Profile';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import Navbar from '../../components/Navbar';

const MyProfile = () => {

  const { data } = useQuery(QUERY_ME);
  const meUser = data?.me || [];
  const userId = meUser._id;
  console.log('id', userId);

  const myUserName = meUser.username;

  const { meLoading, data: profilesData } = useQuery(QUERY_PROFILES);

  const profiles = profilesData?.profiles || [];

  const myProfileInfo = profiles.filter(profile => profile.username === myUserName);

  const userProfile = myProfileInfo[0]

  return (
    <div>
      <Navbar />
      <Profile userProfile={userProfile} userId={userId} />
    </div>
  )

};

export default MyProfile;