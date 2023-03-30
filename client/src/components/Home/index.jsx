import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_PATIENTS } from '../../utils/queries';

import PatientList from '../PatientList';



const Home = () => {

    const { data } = useQuery(QUERY_PATIENTS);
    const patients = data.patients || [];

    return (
        <>
            <h3>This is the new homepage</h3>
            <div>
                <PatientList
                    patients={patients}
                />
            </div>
        </>
    )
};

export default Home;