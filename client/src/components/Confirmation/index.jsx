import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';


const Confirmation = () => {
    const location = useLocation();
    const passedData = location.state;

    return (
        <>
         
            <h1>Your appointment was successfully created.{' '} </h1>
            <Link to="/Dashboard">Lets navigate to your Dashboard.</Link>
        </>
    )
};

export default Confirmation;