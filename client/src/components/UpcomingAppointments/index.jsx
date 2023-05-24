import React from 'react';
import './index.css';

const UpcomingAppointments = (props) => {
    const myAppointments = props.myAppointments;
    const date = new Date();
    const todaysDate = date.getDate();
    const todaysYear = date.getFullYear();
    const todaysMonth = date.getMonth() + 1;
    const todaysMonthStr = todaysMonth.toString();

    let newMonth;

    if (todaysMonthStr.length === 1) {
        newMonth = `0${todaysMonth}`;
    } else {
        newMonth = todaysMonthStr;
    };

    const today = `${newMonth}/${todaysDate}/${todaysYear}`;

    const futureAppointments = myAppointments.filter(bookingdate => today < bookingdate.digitalAppointment);

    if (!futureAppointments.length) {
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <div className="row">
                {futureAppointments &&
                    futureAppointments.map((bookingdate) => (
                        <div key={bookingdate._id} className="col-12 mt-5">
                            <div className="card mb-3">
                                <div className="card-header" style={{ fontSize: '1.3rem' }} >You have an appointment:</div>
                                <div className='card-body m-3'>
                                    <div className="text pt-3" style={{ fontSize: '1.3rem' }}>
                                        {bookingdate.appDay}, {bookingdate.appMonth} {bookingdate.appDate}, {bookingdate.appYear} at {bookingdate.appTime}.
                                    </div> <br />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    )
};
export default UpcomingAppointments;
