import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_PROFILES, QUERY_PETS, QUERY_ME } from '../../utils/queries';
import Navbar from '../Navbar';
import AppointmentForm from '../AppointmentForm';

const Appointment = () => {

    const { data } = useQuery(QUERY_ME);
    const meUser = data?.me || [];
    const myUserName = meUser.username;
    
    const { petsLoading, data: petsData } = useQuery(QUERY_PETS);
    const pets = petsData?.pets || [];
    const myPet = pets.filter(pet => pet.username === myUserName);
    

    const { meLoading, data: profilesData } = useQuery(QUERY_PROFILES);
    const profiles = profilesData?.profiles || [];
    const myProfileInfo = profiles.filter(profile => profile.username === myUserName);
    const userProfile = myProfileInfo[0];

    return (
        <>
            <AppointmentForm userProfile={userProfile} myPet={myPet} />
        </>
    )
};

export default Appointment;

