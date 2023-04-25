import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AppointmentConfirmation = () => {
    const location = useLocation();
    const passedData = location.state;
    const passedDateStringifyied = JSON.stringify(passedData);

    return (
        <>
        <h1>Your appointment was successfully created.{' '} Lets navigate to your</h1>
        <Link to="/Dashboard">Lets navigate to your Dashboard.</Link>
        <div>{passedDateStringifyied}</div>
        </>
    )
};

export default AppointmentConfirmation;