import React from 'react';



const PatientList = ({ patients }) => {
    if (!patients.length) {
        return <h3>No Patients Yet</h3>;
    }

    return (
        <div>
            <h3 className="text">patient list</h3>
            <div className="flex-row justify-space-between my-4">
                {patients &&
                    patients.map((patient) => (
                        <div key={patient._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    {patient.patientname} <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        age: {patient.age }</span>
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PatientList;