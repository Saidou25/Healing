import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERBOOKINGDATES, QUERY_BOOKINGDATES } from '../../utils/queries';
import './index.css';

const AppointmentList = (props) => {
    // const username = props.username;
    // const myAppointments = props.myAppointments;

    const { data: bookingdatesData } = useQuery(QUERY_BOOKINGDATES);
    const myAppointments = bookingdatesData?.bookingdates || [];
    // const [deleteUser, { error }] = useMutation(DELETE_USER, {
    //     variables: { username: user.username },
    //     update(cache, { data: { deleteUser } }) {
    //         try {
    //             const { users } = cache.readQuery({ query: QUERY_USERS });

    //             cache.writeQuery({
    //                 query: QUERY_USERS,
    //                 data: { users: [...users, deleteUser] },
    //             })
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    // });
    // const [username, setUsername] = useState('');
    // const [myAppointments, setMyAppointments] = useState('');

    // const { data: meData } = useQuery(QUERY_ME);
    // const username = user.username;
    // console.log('username', username);

    // console.log('username', username);

    // const { data: userbookingdatesData } = useQuery(QUERY_USERBOOKINGDATES, {
    //     variables: { username: username },
    // });
    // console.log('myAppointments', myAppointments);

    // useEffect(() => {
    //     if (userbookingdatesData && meData) {
    //         const user = meData?.me || [];
    //         const username = user.username
    //         const myAppointments = userbookingdatesData?.userbookingdates || [];
    //         setMyAppointments(myAppointments);
    //         setUsername(username);
    //     }

    // }, [userbookingdatesData && meData]);


    if (!myAppointments.length) {
        return <h3>No appointment Yet</h3>;
    }
    return (
        <div>
            <h3 className="text">Upcoming appointments</h3>
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
