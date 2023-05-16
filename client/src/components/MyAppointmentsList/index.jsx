import React from 'react';
import './index.css';

const AppointmentList = (props) => {
    const myAppointments = props.myAppointments;
    console.log('appointments', myAppointments);



    if (!myAppointments.length) {
        return (
            <>
            </>
        )
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
                                    <p className="text " style={{ fontSize: '1.4rem' }}>
                                        hello   {Bookingdate.appDay} {Bookingdate.appMonth} , {Bookingdate.appYear} at {Bookingdate.appTime}.
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
