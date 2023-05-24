import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import { useNavigate, Link } from 'react-router-dom';
import ContactModal from '../../components/ContactModal';
import UpcomingAppointments from '../../components/UpcomingAppointments';
import MyReviewsList from '../../components/MyReviewsList';
import ReviewForm from '../../components/ReviewForm';
import Navbar from '../../components/Navbar';
import './index.css';

const Dashboard = () => {
    const navigate = useNavigate();
    // const today = new Date();
    // const todaysDate = today.getDate();
    // const todaysYear = today.getFullYear();
    // const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const todaysMonthName = month[today.getMonth()];

    const [isShown, setIsShown] = useState(false);

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const username = me.username;
    const myReviews = me.reviews;

    const { data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);
    const bookingdates = appointmentsData?.bookingdates || [];
    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === username);

    const handleSubmit = (e) => {
        //  setIsShown(current => !current);
        e === 'review' ? setIsShown(current => !current) : navigate('/Appointment');
    };


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row mt-5 mb-5'>
                    <div className='d-flex col-12'>

                        <div>
                            <Link to='/Appointment' className='btn btn-primary m-2' state={{ username }} >
                                Book an appointment
                            </Link>

                        </div>

                        <div>
                            <Link to='/AppointmentHistory' className='btn btn-primary m-2' state={{ username }} >
                                History
                            </Link>
                        </div>

                        <div>
                            <ContactModal />
                        </div>
                    </div>
                </div>
                <div className='row justify-content-between'>
                    <div className='col-6 col-lg-5'>
                        <UpcomingAppointments myAppointments={myAppointments} /> <br />
                    </div>

                    <div className='col-6 col-lg-5 mt-5'>
                        <p>
                            For appointment cancelation please use our "direct message form".<br />
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 border-end'>
                        <MyReviewsList username={username} myReviews={myReviews} /> <br />
                    </div>
                    <div className='col-4 border-start'>
                        <h3 className="review-list-title mt-4">Write your own review </h3>
                        <button
                            type='button'
                            className='btn bt-write btn-primary mb-5'
                            onClick={() => handleSubmit('review')}>
                            Click to start
                        </button>
                        {isShown ? (
                            <>
                            </>
                        ) : null}
                        {isShown ? <ReviewForm username={username} /> : null}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;

