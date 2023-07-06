import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE, ADD_BOOKINGDATE } from "../../utils/mutations";
import {
  QUERY_ME,
  QUERY_PROFILES,
  QUERY_BOOKINGDATES,
} from "../../utils/queries";
import { Regex } from "../../utils/Regex";
import { sendEmail } from "../../utils/email.js";
import SelectUSState from "react-select-us-states";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "react-phone-number-input/style.css";
import "./index.css";

const PetOwnerProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appInfo = location.state.appInfo;
  const username = appInfo.username;
  const petForm = location.state.petForm;
  const existingPet = location.state.existingPet;
  // templateParams object contains data for sending email confirmation
  const templateParams = {
    username: appInfo.username,
    digitalAppointment: appInfo.digitalAppointment,
    appTime: appInfo.appTime,
  };
  const [patientState, setNewValue] = useState("");
  const [patientnumber, setPatientNumber] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [patientfirstname, setPatientFirstName] = useState("");
  const [patientlastname, setPatientLastName] = useState("");
  const [patientaddress, setPatientAddress] = useState("");
  const [patientcity, setPatientCity] = useState("");
  const [patientzip, setPatientZip] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [transition, setTransition] = useState(false);

  const [addProfile] = useMutation(ADD_PROFILE, {
    // variables: { username, patientState, patientnumber, patientfirstname, patientgender, patientaddress, patientlastname, patientcity, birthdate, patientzip },
    update(cache, { data: { addProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: { profiles: [addProfile, ...profiles] },
        });
        console.log(`success adding ${patientfirstname} appointment`);
      } catch (e) {
        console.error(e);
      }
    },
  });

  // Updating the cache with newly created appointment
  const [addBookingdate] = useMutation(ADD_BOOKINGDATE, {
    update(cache, { data: { addBookingdate } }) {
      try {
        const { bookingdates } = cache.readQuery({ query: QUERY_BOOKINGDATES });

        cache.writeQuery({
          query: QUERY_BOOKINGDATES,
          data: { bookingdates: [addBookingdate, ...bookingdates] },
        });
      } catch (e) {
        console.error(e);
      }
      // Updating me object in cache with new appointment
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: { ...me, bookingdates: [...me.bookingdates, addBookingdate] },
        },
      });
    },
  });

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
    navigate("/Dashboard");
  };

  const appBooking = async () => {
    try {
      const { data } = await addBookingdate({
        variables: {
          username: username,
          startDate: appInfo.startDate,
          digitalAppointment: appInfo.digitalAppointment,
          appointmentString: appInfo.appointmentString,
          reason: appInfo.reason,
        },
      });
      if (data) {
        console.log(`success booking a date for ${appInfo.digitalAppointment}`);
      }
    } catch (err) {
      console.error(err);
    }
    sendEmail(templateParams);
    setTransition(true);
    setTimeout(() => {
      navigate("/PetProfileForm", { state: { appInfo, petForm, existingPet } });
    }, 3000);

    // clearing form inputs
    setPatientFirstName("");
    setPatientLastName("");
    setPatientAddress("");
    setPatientZip("");
    setPatientCity("");
    setNewValue("");
    setPatientNumber("");
  };

  const confirmation = async () => {
    try {
      const { data } = await addProfile({
        variables: {
          username: username,
          patientState: patientState,
          patientnumber: patientnumber,
          patientfirstname: patientfirstname,
          patientaddress: patientaddress,
          patientlastname: patientlastname,
          patientcity: patientcity,
          patientzip: patientzip,
        },
      });
      if (data) {
        console.log(`success adding ${petForm}`);
      }
    } catch (err) {
      console.error(err);
    }
    appBooking();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !patientfirstname ||
      !patientaddress ||
      !patientlastname ||
      !patientcity ||
      !patientState
    ) {
      setError("All fields need to be filled!");
      return;
    }
    if (!Regex.zipRegex.test(patientzip) || !patientzip) {
      setError("zip code needs to be a five digit number!");
      return;
    }
    if (!Regex.checkphone.test(numberValue) || !patientnumber) {
      setError("10 digits phone number is missing!");
      return;
    }
    setError("");
    setConfirm(true);
  };

  if (transition === true) {
    return (
      <main className="row container-success">
        <div className="col-12 d-flex appointment-success mb-2">
          <i className="fa-solid fa-check d-flex"></i>
        </div>
        <h2 className="col-12 signup-success d-flex justify-content-center">
          Success booking!
        </h2>
        <p className="col-12 signup-success d-flex justify-content-center">
          Lets now get few information about {petForm}.
        </p>
      </main>
    );
  }
  return (
    <>
      <Navbar />
      <main className="main-petOwner">
        <div>
          <div className="container-owner">
            <p>
              Our practitioner will be driving to the address provided in the
              form below. Please don't hesitate to add any useful information in
              the address field.
            </p>
            <br />
            {confirm === true ? (
              <>
                <h4 className="card-header-profile bg-primary rounded-0 text-white p-4">
                  Review your appointment info
                </h4>
              </>
            ) : (
              <>
                <h4 className="card-header-profile bg-primary rounded-0 text-light p-4 mt-3">
                  Please answer few questions about yourself
                </h4>
              </>
            )}
            <div className="card-body">
              {confirm === true ? (
                <div className="info-review mt-5">
                  <p className="app-review-profile mt-4">
                    Appointment for: {petForm}
                  </p>
                  <p className="app-review-profile mt-4">
                    On: {appInfo.appointmentString}
                  </p>
                  <p className="app-review-profile mt-4">
                    Reason: {appInfo.reason}
                  </p>
                  <br />
                </div>
              ) : (
                <></>
              )}
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row mt-4">
                  <div className="col-lg-6 col-sm-12 owner-fields">
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
                  <div className="col-lg-6 col-sm-12 owner-fields">
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
                  <div className="col-lg-6 col-sm-12 owner-fields">
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
                  <div className="col-lg-6 col-sm-12 owner-fields">
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
                  <div className="col-lg-6 col-sm-12 owner-fields">
                    <label className="form-label1">Select a state</label>
                    <SelectUSState
                      id="myId"
                      className="myClassName"
                      onChange={setNewValue}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 owner-fields">
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
                  <div className="col-lg-6 col-sm-12 owner-fields">
                    <label className="form-label1">Phone number</label>
                    <div>
                      <PatternFormat
                        className="phone-update mb-5"
                        format="(###) ### ####"
                        allowEmptyFormatting
                        mask="_"
                        name="patientnumber"
                        onValueChange={(values, sourceInfo) => {
                          setPatientNumber(values.formattedValue);
                          setNumberValue(values.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {error && (
                      <div className="bg-danger text-white mb-5">
                        <p className="owner-error m-2">{error}</p>
                      </div>
                    )}
                  </div>
                  {confirm === true ? (
                    <div className="card-footer confirm-appointmen">
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
                  ) : (
                    <div className="col-12 d-flex justify-content-center mt-4">
                      <button
                        className="btn button-profile btn-primary rounded-0"
                        type="submit"
                        value="Send"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PetOwnerProfileForm;
