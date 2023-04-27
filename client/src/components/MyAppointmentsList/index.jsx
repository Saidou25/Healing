import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERBOOKINGDATES } from '../../utils/queries';


const AppointmentList = (props) => {
    const username = props.username;
    
    // const [username, setUsername] = useState('');
    // const [myAppointments, setMyAppointments] = useState('');

    // const { data: meData } = useQuery(QUERY_ME);
    // const user = meData?.me || [];
    // const username = user.username;
    // console.log('username', username);

    // console.log('username', username);

    const { data: userbookingdatesData } = useQuery(QUERY_USERBOOKINGDATES, {
        variables: { username: username },
    });
    const myAppointments = userbookingdatesData?.userbookingdates || [];
    console.log('myAppointment', myAppointments);
    
    // useEffect(() => {
    //     if (userbookingdatesData) {
    //         setMyAppointments(myAppointments);
    //     }

    // });

    // console.log(myAppointments);
    // if (!bookingdates.length) {
    //     return <h3>No appointments Yet</h3>;
    // }
    return (
        <div>
            <h3 className="text">Appointment List</h3>
            {username}
            {/* <div className="flex-row justify-space-between my-4">
                {bookingdates &&
                    bookingdates.map((bookingdate) => (
                        <div key={bookingdate._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    {bookingdate.finalDateISO.toString()} <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Month: {bookingdate.appMonth}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Day: {bookingdate.appDay}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Date: {bookingdate.appDate}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Time: {bookingdate.appTime}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Year: {bookingdate.appYear}</span>
                                </h4>
                            </div>
                        </div>
                    ))}
            </div> */}
        </div>
    )
};
export default AppointmentList;
