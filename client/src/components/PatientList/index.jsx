import React from 'react';

const PatientList = ({ patients, title }) => {
if(!patients.length) {
    return <h3>No Patients Yet</h3>;
}
}

return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {patients &&
          patients.map((patient) => (
            <div key={patient._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {patient.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently is {patient.age ? patient.age.length : 0}{' '}
                    years old
                    {patient.age && patient.age.length === 1 ? '' : 's'}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  export default PatientList;