import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERBOOKINGDATES } from '../../utils/queries';
// import AppointmentForm from '../../components/AppointmentForm';
import MyAppointmentsList from '../MyAppointmentsList';
import Navbar from '../Navbar';



const Dashboard = () => {
    // const [myAppointments, setMyAppointments] = useState('');
    // const [username, setUsername] = useState('');

    const { data } = useQuery(QUERY_ME);

    const username = data?.me.username || [];
    console.log('username', username);


    // const { data: bookingdatesData, error } = useQuery(QUERY_USERBOOKINGDATES, {
    //     variables: { username: "Symanou" }
    // });
    // const myAppointments = bookingdatesData?.bookingdates || [];
    // console.error(error)
    // console.log(myAppointments);



    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col-6'>
                    {/* <AppointmentForm /> */}
                    AppointmentForm
                </div>
                <div className='col-6'>
                    <MyAppointmentsList username={username} />
                </div>
            </div>
        </>
    )
};

export default Dashboard;

