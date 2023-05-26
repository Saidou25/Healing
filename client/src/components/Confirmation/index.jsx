import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {

    return (
        <>
            <h1>Your appointment was successfully created.{' '} </h1>
            <Link to="/Dashboard">Lets navigate to your Dashboard.</Link>
        </>
    )
};

export default Confirmation;