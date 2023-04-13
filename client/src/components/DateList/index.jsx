import React from 'react';



const DateList = ({ bookingdates }) => {
    if (!bookingdates.length) {
        return <h3>No appointments Yet</h3>;
    }
    return (
        <div>
            <h3 className="text">Appointment List</h3>
            <div className="flex-row justify-space-between my-4">
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
            </div>
        </div>
    )
};
export default DateList;
