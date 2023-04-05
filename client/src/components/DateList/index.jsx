import React from 'react';



const DateList = ({ dates }) => {
    if (!dates.length) {
        return <h3>No appointments Yet</h3>;
    }
    return (
        <div>
            <h3 className="text">Appointment List</h3>
            <div className="flex-row justify-space-between my-4">
                {dates &&
                    dates.map((date) => (
                        <div key={date._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">
                                    {date.startDate.toString()} <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        appointment: {date.startDate.toString()}</span>
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};
export default DateList;
