import React from 'react';
import Profile from '../../components/Profile';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILES, QUERY_PETS, QUERY_BOOKINGDATES } from '../../utils/queries';
import Spinner from '../../components/Spinner';
const MyProfile = () => {

  const { data, dataLoading } = useQuery(QUERY_ME);
  const meUser = data?.me || [];
  const userId = meUser._id;
  const myUserName = meUser.username;

  const { data: profilesData, profileDataLoading } = useQuery(QUERY_PROFILES);

  const profiles = profilesData?.profiles || [];
  const myProfileInfo = profiles.filter(profile => profile.username === myUserName);
  const userProfile = myProfileInfo[0];
  const profileId = userProfile?._id;

  const { data: appointmentsData, appointmentsDataLoading } = useQuery(QUERY_BOOKINGDATES);
  const bookingdates = appointmentsData?.bookingdates || [];
  const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === myUserName);

  const { data: petsData, petsDataLoading } = useQuery(QUERY_PETS);
  const pets = petsData?.pets || [];
  const myPets = pets.filter(pet => pet.username === myUserName);

  if (dataLoading || profileDataLoading || appointmentsDataLoading || petsDataLoading) {
     return <Spinner />
  }
  return (
    <main className='profile-main'>
      <Profile userProfile={userProfile} userId={userId} profileId={profileId} myAppointments={myAppointments} myPets={myPets} myUserName={myUserName} />    
    </main>
  )
};

export default MyProfile;