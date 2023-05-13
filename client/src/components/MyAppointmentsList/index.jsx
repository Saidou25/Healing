import React from 'react';
import './index.css';

const AppointmentList = ({ myAppointments }) => {

    if (!myAppointments.length) {
        return <h3>No appointment Yet</h3>;
    }
    return (
        <div>
            <h3 className="appointment-list-title mt-4 mb-5">Upcoming myAppointments</h3>
            <div className="row justify-context-space-between">
                {myAppointments &&
                    myAppointments.map((Bookingdate) => (
                        <div key={Bookingdate._id} className="col-12">
                            <div className="text-white bg-primary m-3">
                                {/* <div className="card-header">
                                    {Bookingdate.username}, you have an appointment 
                                </div> */}
                                <div className='card-body m-3'>
                                    {/* <span className="text" style={{ fontSize: '1rem' }}>
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
                                        Time: {Bookingdate.appTime}</span> <br /> */}
                                    {/* <button type='button' className='btn delete-appointment mt-4 btn-danger'>
                                        delete
                                    </button> */}
                                    <p className="text " style={{ fontSize: '1.4rem' }}>
                                        {Bookingdate.appDay} {Bookingdate.appMonth} , {Bookingdate.appYear} at {Bookingdate.appTime}.
                                    </p> <br />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default AppointmentList;
