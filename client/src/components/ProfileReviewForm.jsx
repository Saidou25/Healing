import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useLocation, NavLink, Outlet } from "react-router-dom";
import { Regex } from "../utils/Regex.js";
import SelectUSState from "react-select-us-states";
// import { sendEmail } from "../utils/email.js";
import "react-phone-number-input/style.css";
import BookingSuccess from "../features/Appointments/BookingSuccess.jsx";
// import "./index.css";

const ProfileReviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [patientState, setNewValue] = useState("");
  const [patientnumber, setPatientNumber] = useState("");
  const [patientgender, setPatientGender] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [patientfirstname, setPatientFirstName] = useState("");
  const [patientlastname, setPatientLastName] = useState("");
  const [patientaddress, setPatientAddress] = useState("");
  const [patientcity, setPatientCity] = useState("");
  const [patientzip, setPatientZip] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [finalize, setFinalize] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(true);

  const appInfo = location.state.appInfo;
  const username = appInfo.username;
  // templateParams object contains data for sending email confirmation
  const templateParams = {
    username: appInfo.username,
    digitalAppointment: appInfo.digitalAppointment,
    appTime: appInfo.appTime,
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    // making sure first letter of first name and last name are capital letters
    if (name === "patientfirstname") {
      const upperCase = value.charAt(0).toUpperCase();
      const toAdd = value.split("").slice(1).join("");
      const UpperCaseName = upperCase.concat("", toAdd);
      setPatientFirstName(UpperCaseName);
    }
    if (name === "patientlastname") {
      const upperCase = value.charAt(0).toUpperCase();
      const toAdd = value.split("").slice(1).join("");
      const UpperCaseName = upperCase.concat("", toAdd);
      setPatientLastName(UpperCaseName);
    }
  };

  const cancelApp = () => {
    setNewValue("");
    setPatientNumber("");
    setPatientGender("");
    setBirthDate("");
    setPatientFirstName("");
    setPatientLastName("");
    setPatientAddress("");
    setPatientCity("");
    setPatientZip("");
    setFinalize(false);
    navigate("/Dashboard");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("appoointment information from profile review form", e);
    console.log("appInfo", appInfo);
    console.log("e target", e.target)
    
    
    if (
      !patientfirstname ||
      !patientgender ||
      !patientnumber ||
      !patientaddress ||
      !patientlastname ||
      !patientcity ||
      !patientzip ||
      !patientState
    ) {
      setError("All fields need to be filled!");
      return;
    }
    if (!Regex.ageRegex.test(birthdate) || !birthdate) {
      setError(
        "Age in needs to be a number with the following format: MM/DD/YYYY !"
      );
      return;
    }
    if (!Regex.zipRegex.test(patientzip) || !patientzip) {
      setError("zip code needs to be a five digit number!");
      return;
    }
    setError("");
    setConfirm(true);
  };

  if (finalize === true) {
    return (
      <>
        <BookingSuccess message="Your profile has been created and your appointment booked." />
      </>
    );
  }
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="card-appointment">
            <div className="card-body card-body-appointment">
              <h4 className="card-header-appointment text-primary mt-5 mb-4">
                Please review your appointment information
              </h4>
              {confirm === true ? (
                <div className="info-review mt-5">
                  <p className="app-review-profile mt-4">
                    Appointment for: {patientfirstname} {patientlastname}
                  </p>
                  <p className="app-review-profile mt-4">
                    On {appInfo.appointmentString}
                  </p>
                  <p className="app-review-profile mt-4">
                    Reason: {appInfo.reason}
                  </p>
                  <br />
                </div>
              ) : (
                <></>
              )}
              {!success ? (
                <>
                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-sm-12 p-2">
                        <div>
                          <label className="form-label1">Gender</label>
                          <br />
                          <input
                            className="radio"
                            type="radio"
                            name="patientgender"
                            value="male"
                            checked={patientgender === "male"}
                            onChange={(e) => setPatientGender(e.target.value)}
                          />{" "}
                          male
                          <input
                            className="radio"
                            type="radio"
                            name="patientgender"
                            value="female"
                            checked={patientgender === "female"}
                            onChange={(e) => setPatientGender(e.target.value)}
                          />{" "}
                          female
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1">Age</label>
                        <br />
                        <input
                          className="age"
                          type="text"
                          name="birthdate"
                          value={birthdate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          placeholder="MM/DD/YYYY..."
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1"> First name</label>
                        <input
                          className="form-control"
                          onChange={handleChange}
                          type="text"
                          value={patientfirstname}
                          name="patientfirstname"
                          placeholder="first name..."
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1"> Last name</label>
                        <input
                          className="form-control"
                          onChange={handleChange}
                          type="text"
                          name="patientlastname"
                          value={patientlastname}
                          placeholder="last name..."
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1">Address</label>
                        <input
                          className="form-control"
                          value={patientaddress}
                          onChange={(e) => setPatientAddress(e.target.value)}
                          type="text"
                          name="patientaddress"
                          placeholder="address..."
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1">City</label>
                        <input
                          className="form-control"
                          value={patientcity}
                          type="text"
                          name="patientcity"
                          onChange={(e) => setPatientCity(e.target.value)}
                          placeholder="enter city..."
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1">Select a state</label>
                        <SelectUSState
                          id="myId"
                          className="myClassName"
                          onChange={setNewValue}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1">Zip code</label>
                        <input
                          className="form-control"
                          name="patientzip"
                          value={patientzip}
                          onChange={(e) => setPatientZip(e.target.value)}
                          type="text"
                          placeholder="zip code..."
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label1">Phone number</label>
                        <div>
                          <PatternFormat
                            className="phone-update mb-5"
                            format="(###) ### ####"
                            allowEmptyFormatting
                            mask="_"
                            name="patientnumber"
                            onValueChange={(values, sourceappInfo) => {
                              setPatientNumber(values.formattedValue);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        {error && (
                          <div className="bg-danger text-white mb-5">
                            <p className="profile-error m-2">{error}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-12 d-flex justify-content-center mt-4">
                        <NavLink
                          to="AppointmentReview"
                          className="btn button-profile btn-primary rounded-0"
                          type="submit"
                          value={appInfo}
                          onSubmit={(e) => handleFormSubmit(e)}
                          state={appInfo}
                        >
                          Submit
                        </NavLink>
                      </div>
                      {/* )} */}
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <Outlet />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ProfileReviewForm;
