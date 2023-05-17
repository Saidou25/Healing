import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import { useNavigate, Link } from 'react-router-dom';
import ContactModal from '../../components/ContactModal';
import MyAppointmentsList from '../../components/MyAppointmentsList';
import MyReviewsList from '../../components/MyReviewsList';
import ReviewForm from '../../components/ReviewForm';
import Navbar from '../../components/Navbar';
import './index.css';


const Dashboard = () => {
    const navigate = useNavigate();

    const [isShown, setIsShown] = useState(false);

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const username = me.username;
    const myReviews = me.reviews;
    console.log('myReviews from dashboard', myReviews);

    const { data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);
    const bookingdates = appointmentsData?.bookingdates || [];
    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === username);

    const handleSubmit = (e) => {
        e === 'review' ? setIsShown(current => !current) : navigate('/Appointment');

    };

    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='row justify-content-evenly mt-5'>

                    <div className='col-6 col-lg-5'>
                        <MyAppointmentsList myAppointments={myAppointments} /> <br />

                    </div>

                    <div className='col-6 col-lg-5'>
                        <h3 className='book-title'>Message your practitioner</h3><br />
                        <ContactModal />
                    </div>



                    <div className='col-6 col-lg-5'>
                        <h3 className='book-title'>Book an appointment</h3><br />
                        <button
                            type='button'
                            className='btn review-button btn-primary mb-5'
                            onClick={() => handleSubmit('appointment')}>
                            start
                        </button>
                    </div>

                    <div className='col-6 col-lg-5'>
                        <h3 className='review-title'>Add your own review</h3><br />
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
                    </div>
                    <div className='col-12'>
                        <MyReviewsList username={username} myReviews={myReviews} /> <br />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;

