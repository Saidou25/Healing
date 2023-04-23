import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';

const MyAppointments = () => {
    const { data, loading, error } = useQuery(QUERY_ME);
    const visitorappointments = data?.me.visitorappointments || [];
    const generalInfo = data?.me || [];
    console.log('appointments', visitorappointments);
    console.log('generalInfo', generalInfo);
  

return (
    
        <div>
            <h3 className="text">Appointment List</h3>
            <div className="flex-row justify-space-between my-4">
                {visitorappointments &&
                    visitorappointments.map((visitorappointment) => (
                        <div key={visitorappointment._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    {visitorappointment.finalDateISO.toString()} <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        First name: {visitorappointment.patientfirstname}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Email: {generalInfo.email}</span> <br />
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

export default MyAppointments;