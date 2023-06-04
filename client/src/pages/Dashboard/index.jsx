import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
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
    // const myAppointments = props.myAppointments;
    const date = new Date();
    const todaysDate = date.getDate();
    const todaysYear = date.getFullYear();
    const todaysMonth = date.getMonth() + 1;
    const todaysMonthStr = todaysMonth.toString();
    const todaysDateStr = todaysDate.toString();

    let newMonth;
    let newDay;

    if (todaysMonthStr.length === 1) {
        newMonth = `0${todaysMonth}`;
    } else {
        newMonth = todaysMonth;
    };
    if (todaysDateStr.length === 1) {
        newDay = `0${todaysDate}`;
    } else {
        newDay = todaysDate;
    };

    const today = `${newMonth}/${newDay}/${todaysYear}`;
    console.log('today', today);

    const [isShown, setIsShown] = useState(false);

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const username = me.username;
    const myReviews = me.reviews;

    const { loading, error, data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);

    const bookingdates = appointmentsData?.bookingdates || [];

    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === username);

    const futureAppointments = myAppointments.filter(bookingdate => bookingdate.digitalAppointment > today);
    console.log('future appoitnments from dashboard', futureAppointments);

    const handleSubmit = (e) => {
        //  setIsShown(current => !current);
        e === 'review' ? setIsShown(current => !current) : navigate('/Appointment');
    };

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong ...</p>

    return (
        // {!loading && !error && }
        <>
            <Navbar />
            <div className='container-dashboard'>
                <div className='row buttons mt-5'>
                    <div className='btn buttons col-lg-3 '>
                        <div >
                            <Link to='/Appointment'
                                className='btn btn-primary rounded-0 m-2'
                                state={{ username }} >
                                <div style={{ fontSize: '1.2rem' }}>
                                    Book an appointment
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className='btn buttons col-lg-3'>
                        <Link to='/AppointmentHistory'
                            style={{ fontSize: '1.2rem' }}
                            className='btn btn-primary rounded-0 m-2'
                            state={{ username }} >
                            appointment History
                        </Link>
                    </div>

                    <div className='btn buttons col-lg-3'>
                        <ContactModal />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-6 col-sm-12'>
                        <UpcomingAppointments futureAppointments={futureAppointments} today={today} />
                    </div>
                    {futureAppointments.length ? (
                        <div className='col-lg-6 col-sm-12 mt-5 mb-5'>
                            <div className='card suggestion p-3'>
                                <p style={{ fontSize: '1.2rem' }}>
                                    We suggest comming 15 minutes prior to your appointment. <br />
                                </p >
                                <p style={{ fontSize: '1.2rem' }}>
                                    Use direct message to provide additional information about your upcomming visit. <br />
                                </p>
                                <p style={{ fontSize: '1.2rem' }}>
                                    For appointment cancelation please provide a 48 hours notice. Book a new appointment if you would like to reschedule.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                </div>
                <div className='row mt-4'>
                    <div className='col-lg-8 col-sm-12 border-end'>
                        <MyReviewsList username={username} myReviews={myReviews} /> <br />
                    </div>
                    <div className='col-lg-4 col-sm-12 border-start mt-4'>
                        <h3 className="write-review-title mt-4"
                            style={{ fontSize: '1.4rem' }}>
                            Write a review
                        </h3>
                        <button
                            style={{ fontSize: '1.2rem' }}
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

