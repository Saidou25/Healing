import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERBOOKINGDATES } from '../../utils/queries';
import AppointmentForm from '../../components/AppointmentForm';
import MyAppointmentsList from '../../components/MyAppointmentsList';
import MyReviewsList from '../../components/MyReviewsList';
import ReviewForm from '../../components/ReviewForm';
import Navbar from '../../components/Navbar';
import './index.css';


const Dashboard = () => {
  
    const [isShown, setIsShown] = useState(false);
    const { data } = useQuery(QUERY_ME);

    const me = data?.me || [];
    const username = me.username;

    const { data: userbookingdatesData } = useQuery(QUERY_USERBOOKINGDATES, {
        variables: { username: username },
    });
    const myAppointments = userbookingdatesData?.userbookingdates || [];

    const handleSubmit = (e) => {
      
        setIsShown(current => !current);
    };


    return (
        <>
            <Navbar />
            <div className='row mt-5'>
                <div className='col-6'>
                    <MyAppointmentsList username={username} me={me} myAppointments={myAppointments} />
                </div>
                <div className='col-6 col-lg-5'>
                    <h3>Add your own review</h3><br />
                    <button 
                    type='button'
                    className='btn review-button btn-primary mb-5' 
                    onClick={handleSubmit}>
                        add a review
                    </button>
                    {isShown ? (
                        <>
                        </>
                    ) : null}
                    {isShown ? <ReviewForm username={username} /> : null}
                    <MyReviewsList username={username} /> <br />
                </div>
                <div className='col-12'>
                    <AppointmentForm username={username} />
                </div>
            </div>

        </>
    )
};

export default Dashboard;

