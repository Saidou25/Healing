import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_BOOKINGDATES } from '../../utils/queries';
import { DELETE_BOOKINGDATE } from '../../utils/mutations';
import Navbar from '../Navbar';
import trash from '../../assets/images/trash.png';
import './index.css';

const AppointmentHistory = () => {

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
    }

    const today = `${newMonth}/${newDay}/${todaysYear}`;

    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const userName = me.username;

    const { data: appointmentsData } = useQuery(QUERY_BOOKINGDATES);
    const bookingdates = appointmentsData?.bookingdates || [];
    const myAppointments = bookingdates.filter(bookingdate => bookingdate.username === userName);

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
                <h3>
                    No history yet
                </h3>

            </>
        )
    }
    return (
        <div>
            <Navbar />
            <div className='container-history'>
                <h1 className="appointment-list-title mt-4 mb-5">Appointments history</h1>
                <div className="row">
                    {history &&
                        history.map((bookingdate) => (
                            <div key={bookingdate._id} className="col-12 mt-5">
                                <div className="card mb-3">
                                    <div className="card-header" style={{ fontSize: '1.3rem' }} >Your past appointments:</div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-6 d-flex align-items-center'>
                                                <div className='appointment-text'>
                                                    <div className="text" style={{ fontSize: '1.4rem' }}>
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
                                                    <img className='trash-can' src={trash} alt='trash-can' height={60} />
                                                </button>
                                            </div>
                                        </div>


                                        {/* <div className='d-flex justify-content-end'>
                                            <button
                                                type='button'
                                                className='btn delete-appointment rounded-0'
                                                onClick={() => handleSubmit(bookingdate)}
                                            >
                                               <img className='trash-can' src={trash} alt='trash-can' height={60} />
                                            </button>
                                        </div> */}
                                    </div>
                                </div>

                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
};

export default AppointmentHistory;