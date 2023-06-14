import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useLocation } from 'react-router-dom';
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import { DELETE_BOOKINGDATE } from '../../utils/mutations';
import MyReviewList from '../../components/MyReviewList';
import Navbar from '../Navbar';
import Footer from '../Footer';
import trash from '../../assets/images/trash.png';
import './index.css';

const AppointmentHistory = () => {
    // filter user appointments and compare with actual date to find out if appointment is passed
    const location = useLocation();
    const myReviews = location.state.myReviews;
    console.log(myReviews);
    // buiding today's date format 
    const date = new Date();
    const todaysDate = date.getDate();
    const todaysYear = date.getFullYear();
    const todaysMonth = date.getMonth() + 1;
    const todaysMonthStr = todaysMonth.toString();
    const todaysDateStr = todaysDate.toString();

    let newDay;
    let newMonth;

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

    // filter user's appointment and add delete button to passed appointments

    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const username = me.username;

    const { data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);
    const bookingdates = appointmentsData?.bookingdates || [];
    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === username);

    const [bookingdateId, setBookingdateId] = useState('');

    const [deleteBookingdate] = useMutation(DELETE_BOOKINGDATE, {
        variables: { id: bookingdateId },
        update(cache, { data: { deleteBookingdate } }) {
            try {
                const { bookingdates } = cache.readQuery({ query: QUERY_BOOKINGDATES });

                cache.writeQuery({
                    query: QUERY_BOOKINGDATES,
                    data: { bookingdates: bookingdates.filter(bookingdate => bookingdate._id !== deleteBookingdate._id) },
                });
            } catch (error) {
                console.error(error);
            }
        }
    });

    const history = myAppointments.filter(bookingdate => today >= bookingdate.digitalAppointment);

    const handleSubmit = (bookingdate) => {
        const bookingdateId = bookingdate._id;

        try {
            const { data } = deleteBookingdate({
                variables: { id: bookingdateId }
            });
            setBookingdateId(bookingdateId);
            console.log('appointment deleted successfully');
        } catch (err) {
            console.error(err);
        }
    };

    if (!history.length) {
        return (
            <>
                <Navbar />
                <div className='container-no-history'>
                    <div className='card no-history'>
                        <p className='card-header history-header fs-3'>
                            No history yet
                        </p>
                        <div className='card-body history-text'>
                            <p>
                                Your past appointments will show on here soon.
                            </p>
                        </div>
                    </div>
                </div>
                <MyReviewList myReviews={myReviews} username={username} />
                <div className='footer-history'>
                    <Footer />
                </div>
            </>
        )
    }
    return (
        <div>
            <Navbar />
            <div className='container-history'>
                <h3 className="appointment-list-title mt-4 mb-5">Appointment history</h3>
                <div className="row">
                    {history &&
                        history.map((bookingdate) => (
                            <div key={bookingdate._id} className="col-12 history-column">
                                <div className="card history mb-3">
                                    <div className="card-header fs-3">This appointment is passed:</div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-6 d-flex align-items-center'>
                                                <div className='appointment-text'>
                                                    <div className="text">
                                                        {bookingdate.appDay}, {bookingdate.appMonth} {bookingdate.appDate}, {bookingdate.appYear} at {bookingdate.appTime}.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6 d-flex justify-content-end'>
                                                <button
                                                    type='button'
                                                    className='btn delete-appointment rounded-0'
                                                    onClick={() => handleSubmit(bookingdate)}
                                                >
                                                    <img className='trash-can' src={trash} alt='trash-can' height={50} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <MyReviewList myReviews={myReviews} username={username} />
            <Footer />
        </div>
    )
};

export default AppointmentHistory;