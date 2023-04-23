import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERVISITORAPPOINTMENTS } from '../../utils/queries';

const UserVisitorappointments = () => {
const { data, loading, error } = useQuery(QUERY_USERVISITORAPPOINTMENTS);
const myAppointments = data?.userVisitorappointments || [];
console.log("myAppointments", myAppointments.patientfirstname);
    
if (!myAppointments.length) {
    return <h3>No appointments Yet</h3>;
}
return (
    <div>
        <h3 className="text">Appointment List</h3>
        <div className="flex-row justify-space-between my-4">
            {myAppointments &&
                myAppointments.map((visitorappointment) => (
                    <div className="col-12 col-xl-6">
                        <div className="card mb-3">
                            <h4 className="card-header bg-dark text-white p-2 m-0">
                                {visitorappointment.finalDateISO.toString()} <br />
                                <span className="text" style={{ fontSize: '1rem' }}>
                                    ID: {visitorappointment.id}</span> <br />
                                <span className="text" style={{ fontSize: '1rem' }}>
                                    Month: {visitorappointment.appMonth}</span> <br />
                                <span className="text" style={{ fontSize: '1rem' }}>
                                    Day: {visitorappointment.appDay}</span> <br />
                                <span className="text" style={{ fontSize: '1rem' }}>
                                    Date: {visitorappointment.appDate}</span> <br />
                                <span className="text" style={{ fontSize: '1rem' }}>
                                    Time: {visitorappointment.appTime}</span> <br />
                                <span className="text" style={{ fontSize: '1rem' }}>
                                    Year: {visitorappointment.appYear}</span>
                            </h4>
                        </div>
                    </div>
                ))}
        </div>
    </div>
)
};

export default UserVisitorappointments;