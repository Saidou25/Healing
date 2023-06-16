import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import ContactModal from '../../components/ContactModal';
import UpcomingAppointments from '../../components/UpcomingAppointments';
import AllReviews from '../../components/AllReviews';
import ReviewForm from '../../components/ReviewForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './index.css';

const Dashboard = () => {
    //  getting all data in this page and send them to components thru props

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

    const [isShown, setIsShown] = useState(false);

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const username = me.username;
    const myReviews = me.reviews;
    const email = me.email;

    const { loading, error, data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);

    const bookingdates = appointmentsData?.bookingdates || [];

    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === username);

    const futureAppointments = myAppointments.filter(bookingdate => bookingdate.digitalAppointment > today);

    const handleSubmit = (e) => {
        //  setIsShown(current => !current);
        e === 'review' ? setIsShown(current => !current) : navigate('/Appointment');
    };

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong ...</p>

    return (
        <>
            <Navbar />
            <main className='dashboard-main'>
                <div className='container-buttons'>
                    <div className='row buttons mb-5'>
                        <div className='col-4 btn ds-btns btn-primary rounded-0'>
                            <Link to='/AppointmentForm'
                                className='dashboard-text text-white'
                                state={{ username }} >
                                Book
                            </Link>
                        </div>
                        <div className='col-4 btn ds-btns btn-primary rounded-0'>
                            <Link to='/AppointmentHistory'
                                className='dashboard-text text-white'
                                state={{ username, myReviews }} >
                                History
                            </Link>
                        </div>
                        <div className='col-4 btn btn-primary rounded-0'>
                            <ContactModal username={username} email={email} />
                        </div>
                    </div>
                </div>
                <div className='container-dashboard'>
                    <div className='row'>
                        <div className='col-lg-8 col-sm-12 dashb-border'>
                            <UpcomingAppointments futureAppointments={futureAppointments} today={today} />
                        </div>
                        {futureAppointments.length ? (
                            <div className='col-lg-4 col-sm-12 mt-5 mb-5 right-window'>
                                <div className='card suggestion p-3'><br/>
                                <h4 className='note mb-2'>Notes</h4><br/>
                                    <p>
                                        We suggest arriving 15 minutes prior to your appointment. <br />
                                    </p >
                                    <p>
                                        Use direct message to provide additional information about your upcoming visit. <br />
                                    </p>
                                    <p>
                                        For appointment cancelation please provide a 48 hours notice. Book a new appointment if you would like to reschedule.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    <div className='row review-row mt-4'>
                        <div className='col-lg-8 col-sm-12 dashb-border'>
                            <AllReviews />
                        </div>
                        <div className='col-lg-4 col-sm-12 right-window'>
                            <h3 className="write-review-title mt-4">
                                Write a review
                            </h3>
                            <button
                                type='button'
                                className='btn col-12 d-flex btn-primary rounded-0 justify-content-center mt-5 mb-5'
                                onClick={() => handleSubmit('review')}>
                                start/close
                            </button>
                            {isShown ? (
                                <>
                                </>
                            ) : null}
                            {isShown ? <ReviewForm username={username} today={today} /> : null}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
};

export default Dashboard;

