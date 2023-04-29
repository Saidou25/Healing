import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERBOOKINGDATES, QUERY_REVIEWS } from '../../utils/queries';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from '../../components/AppointmentForm';
import MyAppointmentsList from '../../components/MyAppointmentsList';
import MyReviewsList from '../../components/MyReviewsList';
import Navbar from '../../components/Navbar';



const Dashboard = () => {
    const navigate = useNavigate();

    const { data } = useQuery(QUERY_ME);

    const me = data?.me || [];
    const username = me.username;

    const { data: reviewsData } = useQuery(QUERY_REVIEWS);
    const reviews = reviewsData?.reviews || [];


    const { data: userbookingdatesData } = useQuery(QUERY_USERBOOKINGDATES, {
        variables: { username: username },
    });
    const myAppointments = userbookingdatesData?.userbookingdates || [];

    const handleSubmit = () => {
        navigate('/ReviewForm');
    };


    return (
        <>
            <Navbar />
            <div className='row'>
                <div className='col-4'>
                    <MyAppointmentsList username={username} myAppointments={myAppointments} />
                </div>
                <div className='col-4'>
                    <AppointmentForm username={username} />
                </div>
                <div className='col-4'>
                    <MyReviewsList reviews={reviews} /> <br />
                    <button className='review-button' onClick={handleSubmit}>
                        add a review
                    </button>
                </div>
            </div>

        </>
    )
};

export default Dashboard;

