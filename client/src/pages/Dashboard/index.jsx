import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import AppointmentForm from '../../components/AppointmentForm';
import MyAppointmentsList from '../../components/MyAppointmentsList';
import MyReviewsList from '../../components/MyReviewsList';
import ReviewForm from '../../components/ReviewForm';
import Navbar from '../../components/Navbar';
import './index.css';


const Dashboard = () => {

    const [isShown, setIsShown] = useState(false);
    const [isShown1, setIsShown1] = useState(false);

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const username = me.username;

    const { data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);
    const bookingdates = appointmentsData?.bookingdates || [];
    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === username);

    const handleSubmit = (e) => {
        e === 'appointment' ? setIsShown1(current => !current) : setIsShown(current => !current);
    };

    return (
        <>
            <Navbar />
            <div className='row mt-5'>
                <div className='col-6 col-lg-5'>
                    <h3>Add your own review</h3><br />
                    <button
                        type='button'
                        className='btn review-button btn-primary mb-5'
                        onClick={() => handleSubmit('review')}>
                        add a review
                    </button>
                    {isShown ? (
                        <>
                        </>
                    ) : null}
                    {isShown ? <ReviewForm username={username} /> : null}
                    <MyReviewsList username={username} /> <br />
                </div>
                <div className='col-6 col-lg-5'>
                    <h3>Book an appointment</h3><br />
                    <button
                        type='button'
                        className='btn review-button btn-primary mb-5'
                        onClick={() => handleSubmit('appointment')}>
                        start
                    </button>
                    {isShown1 ? (
                        <>
                        </>
                    ) : null}
                    {isShown1 ? <AppointmentForm username={username} /> : null}
                    <MyAppointmentsList myAppointments={myAppointments} /> <br />
                </div>
            </div>
        </>
    )
};

export default Dashboard;

