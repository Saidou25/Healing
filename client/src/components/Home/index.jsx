import React from 'react';
import { useQuery } from '@apollo/client';
import PatientList from '../PatientList';
import { QUERY_PATIENTS } from '../../utils/queries';


const Home = () => {

    const { data } = useQuery(QUERY_PATIENTS);
    const patients = data?.patients || [];

    return (
        <div>
            <PatientList patients={patients} />
        </div>
    )
};


export default Home;