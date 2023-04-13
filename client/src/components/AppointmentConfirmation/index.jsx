import React from 'react';
import { useLocation } from 'react-router-dom';


const AppointmentConfirmation = () => {
    const location = useLocation();
    const passedData = location.state;
    const passedDateStringifyied = JSON.stringify(passedData);
    console.log('passedData to confirmation comp', passedData);

    return (
        <>
        <h1>Your appointment was successfully created</h1>
        <div>{passedDateStringifyied}</div>
        </>
    )
};

export default AppointmentConfirmation;