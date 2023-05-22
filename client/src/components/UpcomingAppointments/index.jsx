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
    console.log('today', today);

    if (!myAppointments.length) {
        return (
            <>
                hello
            </>
        )
    }

    return (
        <div>
            <h3 className="appointment-list-title mt-4 mb-5">Upcoming appointments</h3>
            <div className="row justify-context-space-between">
                {myAppointments &&
                    myAppointments.map((bookingdate) => (
                        <div key={bookingdate._id} className="col-12">
                            {today < bookingdate.digitalAppointment ? (
                                <div className="text-white bg-primary m-3">
                                    {/* <div className="card-header">
                                    {Bookingdate.username}, you have an appointment 
                                </div> */}
                                    <div className='card-body m-3'>
                                        <p className="text " style={{ fontSize: '1.4rem' }}>
                                            today: {today} digitalApp: {bookingdate.digitalAppointment} {bookingdate.appDay} {bookingdate.appMonth} {bookingdate.appDate} , {bookingdate.appYear} at {bookingdate.appTime}.
                                        </p> <br />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default UpcomingAppointments;
