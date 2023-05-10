import React from 'react';
import './index.css';

const AppointmentList = ({ myAppointments }) => {

    if (!myAppointments.length) {
        return <h3>No appointment Yet</h3>;
    }
    return (
        <div>
            <h3 className="text">Upcoming myAppointments</h3>
            <div className="flex-row justify-center my-4">
                {myAppointments &&
                    myAppointments.map((Bookingdate) => (
                        <div key={Bookingdate._id} className="col-12 col-lg-10 p-4">
                            <div className="card mb-3">

                                <h4 className="card-header bg-primary text-white p-2">
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
                                    <button type='button' className='btn delete-appointment btn-danger mt-4'>
                                        delete
                                    </button>
                                </h4>

                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default AppointmentList;
