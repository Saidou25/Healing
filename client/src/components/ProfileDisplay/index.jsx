import React from "react";

const ProfileDisplay = (props) => {
    const userProfile = props.userProfile;

    return (
        <>
            <h1>Hello {userProfile.patientfirstname}</h1><br />
            <h3>{userProfile.patientlastname}</h3><br />
            <h3>{userProfile.patientaddress}</h3><br />
            <h3>{userProfile.patientcity}</h3><br />
        </>
    )
};
export default ProfileDisplay;