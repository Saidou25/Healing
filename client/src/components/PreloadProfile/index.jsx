import React, { useState } from 'react';
import ProfileForm from '../ProfileForm';
import { useLocation } from 'react-router-dom';
import PetOwnerProfileForm from '../PetOwnerProfileForm';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import Navbar from '../../components/Navbar';

const PreloadProfile = (props) => {
    const location = useLocation();
    const mepet = location.state;
    console.log('mepet from preload', mepet)
    
    const { data } = useQuery(QUERY_ME);
    const meUser = data?.me || [];
    const userId = meUser._id;
    console.log('id', userId);

    const myUserName = meUser.username;

    const { meLoading, data: profilesData } = useQuery(QUERY_PROFILES);

    const profiles = profilesData?.profiles || [];

    const myProfileInfo = profiles.filter(profile => profile.username === myUserName);

    const userProfile = myProfileInfo[0];

    return (
        <div>
            {(mepet === 'me') ? (
                <div>
                    <ProfileForm userProfile={userProfile} mepet={mepet} />
                </div>
            ) : (
                <div>
                    <PetOwnerProfileForm userProfile={userProfile} mepet={mepet} />
                </div>
            )}
        </div>
    )

};

export default PreloadProfile;