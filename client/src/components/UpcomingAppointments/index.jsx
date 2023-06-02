import React from 'react';
import './index.css';

const UpcomingAppointments = (props) => {
    const futureAppointments = props.futureAppointments;

    if (!futureAppointments) {
        return (
            <>
            </>
        )
    }

    return (
        <div className='container-upcoming-appointment'>
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
