import React from 'react';
import './index.css';

const UpcomingAppointments = (props) => {
    const futureAppointments = props.futureAppointments;

    if (!futureAppointments.length) {
        return (
            <>
            </>
        )
    }

    return (
        <div className='container-upcoming-appointment mt-5'>
            <h3>Upcoming appointments</h3>
            <div className="row">
                {futureAppointments &&
                    futureAppointments.map((bookingdate) => (
                        <div key={bookingdate._id} className="col-12 mt-5">
                            <div className="card app-card mb-3">
                                <div className="card-header fs-3">You have an appointment:</div>
                                <div className='card-body m-3'>
                                    <div className="text">
                                        {bookingdate.appDay}, {bookingdate.appMonth} {bookingdate.appDate}, {bookingdate.appYear} at {bookingdate.appTime}.
                                    </div>
                                    <p className="text pt-3">
                                        Reason: <br />
                                        {bookingdate.reason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default UpcomingAppointments;
