import React from 'react'

const BookingSuccess = () => {
    return (
        <main className="row container-success">
          <div className="col-12 d-flex appointment-success mb-2">
            <i className="fa-solid fa-check d-flex"></i>
          </div>
          <h2 className="col-12 signup-success d-flex justify-content-center">
            Success!
          </h2>
          <p className="col-12 d-flex justify-content-center mt-4">
            Your appointment is booked.
          </p>
          <p className="col-12 d-flex justify-content-center align-items-center">
            We just sent you a confitmation email...
          </p>
        </main>
      );
}
export default BookingSuccess;