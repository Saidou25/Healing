import React from "react";
import ButtonSpinner from "../../../components/ButtonSpinner";
import "./index.css";

const Confirm = ({
  petForm,
  profile,
  appString,
  reason,
  me,
  confirmation,
  cancelApp,
  loading,
}) => {
  return (
    <div className="container-fluid mt-5">
      <div className="card appointment-review-card mt-5 mb-5">
        <div className="card-header bg-primary pb-4 pt-4">
          <h4 className="header-text text-light mt-3 mb-3">
            Please review your appointment information
          </h4>
        </div>
        <div className="card-body review-body mt-4 p-0">
          <p className="app-review text-primary">Appointment for:</p>
          {petForm ? (
            <p> {petForm}</p>
          ) : (
            <p>
              {" "}
              {profile.patientfirstname} {profile.patientlastname}
            </p>
          )}
          <p className="app-review-p text-primary">On:</p>
          <p>{appString}</p>
          <p className="grey-title text-primary">Reason:</p>
          <p>{reason}</p>
          <br />
          <div>
            <p className="grey-title p-3 text-primary">Contact:</p>
          </div>
          <p>Email {me.email}</p>
          <p>Phone number: {profile.patientnumber}</p>
          <br />
          <div>
            <p className="grey-title p-3 text-primary">Address: </p>
          </div>
          <p>address: {profile.patientaddress}</p>
          <p>city: {profile.patientcity} </p>
          <p>state: {profile.patientState} </p>
          <p>zip: {profile.patientzip} </p>
        </div>
        <div className="card-footer mt-4">
          <div className="row mb-3 p-3 mt-4">
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
              {loading ? <ButtonSpinner /> : <>confirm</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Confirm;
