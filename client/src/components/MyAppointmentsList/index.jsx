import React, { useState, useEffect } from 'react';
// import { useQuery } from "@apollo/client";
// import { QUERY_ME, QUERY_USERBOOKINGDATES } from '../../utils/queries';


const AppointmentList = (props) => {
    // const username = props.username;
    const myAppointments = props.myAppointments;

    // const [username, setUsername] = useState('');
    // const [myAppointments, setMyAppointments] = useState('');

    // const { data: meData } = useQuery(QUERY_ME);
    // const user = meData?.me || [];
    // const username = user.username;
    // console.log('username', username);

    // console.log('username', username);

    // const { data: userbookingdatesData } = useQuery(QUERY_USERBOOKINGDATES, {
    //     variables: { username: username },
    // });
    // const myAppointments = userbookingdatesData?.userbookingdates || [];
    // console.log('myAppointments', myAppointments);

    // useEffect(() => {
    //     if (userbookingdatesData) {
    //         setMyAppointments(myAppointments);
    //     }

    // });

   
    if (!myAppointments.length) {
        return <h3>No appointment Yet</h3>;
    }
    return (
        <div>
            <h3 className="text">Upcoming appointments</h3>
            <div className="flex-row justify-space-between my-4">
                {myAppointments &&
                    myAppointments.map((Bookingdate) => (
                        <div key={Bookingdate._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">

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
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default AppointmentList;
