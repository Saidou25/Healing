import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERBOOKINGDATES } from '../../utils/queries';
// import AppointmentForm from '../../components/AppointmentForm';
import MyAppointmentsList from '../../components/MyAppointmentsList';
import Navbar from '../../components/Navbar';



const Dashboard = () => {
    // const [myAppointments, setMyAppointments] = useState('');
    // const [username, setUsername] = useState('');

    const { data } = useQuery(QUERY_ME);

    const me = data?.me || [];
    const username = me.username;
    console.log('username', username);

    const { data: userbookingdatesData } = useQuery(QUERY_USERBOOKINGDATES, {
        variables: { username: username },
    });
    const myAppointments = userbookingdatesData?.userbookingdates || [];
    console.log('myAppointments', myAppointments);


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
                    <MyAppointmentsList username={username} myAppointments={myAppointments} />
                </div>
            </div>
        </>
    )
};

export default Dashboard;

