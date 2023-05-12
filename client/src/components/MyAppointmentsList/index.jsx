import React from 'react';
import './index.css';

const AppointmentList = ({ myAppointments }) => {

    if (!myAppointments.length) {
        return <h3>No appointment Yet</h3>;
    }
    return (
        <div>
            <h3 className="appointment-list-title mt-4 mb-5">Upcoming myAppointments</h3>
            <div className="row">
                {myAppointments &&
                    myAppointments.map((Bookingdate) => (
                        <div key={Bookingdate._id} className="col-12">
                            <div className="text-white bg-primary mb-3">
                                <div className="card-header">Header</div>
                                <div className='card-body'>
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Username: {Bookingdate.username}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Day: {Bookingdate.appDay}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Date: {Bookingdate.appDate}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Month: {Bookingdate.appMonth}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Year: {Bookingdate.appYear}</span>
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Time: {Bookingdate.appTime}</span> <br />
                                    <button type='button' className='btn delete-appointment mt-4 btn-danger'>
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default AppointmentList;
