import React from "react";

const BookingSuccess = ({ style, message }) => {
  return (
    <main className="row" style={{ paddingTop: "50px" }}>
      <div className="col-12 d-flex appointment-success mb-2 mt-5">
        <i className="fa-solid fa-check d-flex"></i>
      </div>
      <h2 className="col-12 signup-success d-flex justify-content-center text-light ">
        Success!
      </h2>
      <p className="col-12 d-flex justify-content-center mt-4 text-light" style={style}>
        {message}
      </p>
    </main>
  );
};
export default BookingSuccess;
