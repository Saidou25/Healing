import React, { useState } from 'react';
import UpdateMyProfileForm from '../../components/UpdateMyProfileForm';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import Navbar from '../../components/Navbar';

const UpdateProfile = () => {

  const { data } = useQuery(QUERY_ME);
  const meUser = data?.me || [];
  const userId = meUser._id;
  console.log('id', userId);

  const myUserName = meUser.username;

  const { meLoading, data: profilesData } = useQuery(QUERY_PROFILES);

  const profiles = profilesData?.profiles || [];

  const myProfileInfo = profiles.filter(profile => profile.username === myUserName);

  const userProfile = myProfileInfo[0];
  const profileId = userProfile._id;
  

  return (
    <div>
      {/* <Navbar /> */}
      <UpdateMyProfileForm userProfile={userProfile} userId={userId} profileId={profileId} />
    </div>
  )

};

export default UpdateProfile;