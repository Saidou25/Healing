import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../utils/email.js";
import "./index.css";

const AppointmentReview = ({ reviewData }) => {
  const navigate = useNavigate();
  const profile = reviewData.me.profile;
  const me = reviewData.me;
  const addBookingdate = reviewData.addBookingdate;
  const [finalize, setFinalize] = useState(false);

  const cancelApp = () => {
    console.log("cancelled");
    navigate("/Dashboard");
  };
  const confirmation = () => {
    console.log("confirmed");
    sendEmail(reviewData);
    setFinalize(true);
    setTimeout(() => {
      navigate("/Dashboard");
    }, 3000);
  };

  if (finalize === true) {
    return (
      <main className="row container-success">
        <div className="col-12 d-flex appointment-success mb-2">
          <i className="fa-solid fa-check d-flex"></i>
        </div>
        <h2 className="col-12 signup-success d-flex justify-content-center">
          Success!
        </h2>
        <p className="col-12 signup-success d-flex justify-content-center">
          Your appointment is booked...
        </p>
      </main>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header app-review-header">
          <h4 className="header-text mt-3 mb-3">
            Please review your appointment information
          </h4>
        </div>
        <div className="card-body mt-4">
          <p className="app-review-p">
            Appointment for: {profile.patientfirstname}{" "}
            {profile.patientlastname}
          </p>
          <p className="app-review-p">
            On: {addBookingdate.digitalAppointment} at: {addBookingdate.appTime}
          </p>
          <p className="app-review-p">Reason: {addBookingdate.reason}</p>
          <br />
          <div className="app-review-t">
            <p className="app-review-p p-3">Contact:</p>
          </div>
          <p className="app-review-p">Email {me.email}</p>
          <p className="app-review-p">Phone number: {profile.patientnumber}</p>
          <br />
          <div className="app-review-t">
            <p className="app-review-p p-3">Address: </p>
          </div>
          <p className="app-review-p">address: {profile.patientaddress}</p>
          <p className="app-review-p">city: {profile.patientcity} </p>
          <p className="app-review-p">state: {profile.patientState} </p>
          <p className="app-review-p">zip: {profile.patientzip} </p>
        </div>
        <div className="card-footer">
          <div className="row mb-3 p-3 d-flex justify-content-between">
            <button
              className="col-6 btn btn-app-review btn-secondary fs-5"
              type="button"
              onClick={cancelApp}
            >
              cancel
            </button>
            <button
              className="col-6 btn btn-app-review btn-primary fs-5"
              type="button"
              onClick={confirmation}
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppointmentReview;
