import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendEmail } from "../../../utils/email.js";
import useAddBooking from "../useAddBooking.js";
import useAddProfile from "../../Profile/useAddProfile.js";
import ButtonSpinner from "../../../components/ButtonSpinner";
import ErrorComponent from "../../../components/ErrorComponent.jsx";
import Success from "../../../components/Success.jsx";
import "./index.css";

const AppointmentReview = () => {
  const [appInformation, setAppInformation] = useState("");
  const [profileInformation, setProfileInformation] = useState("");
  const [finalize, setFinalize] = useState(false);
  const [showAppointmentInfo, setShowAppointmentInfo] = useState("");
  const [showPatientInfo, setPatientInfo] = useState("");

  const location = useLocation();
  const formState = location.state.formState;
  const appInfo = location.state.appInfo;
  const profile = location.state.profile;
  const {
    successAddingBooking,
    loading: loadingAddBooking,
    errorAddingBooking,
  } = useAddBooking(appInformation);
  const {
    errorAddingProfile,
    successAddingProfile,
    loading: addingProfileLoading,
  } = useAddProfile(profileInformation);

  const navigate = useNavigate();

  const cancelApp = () => {
    setAppInformation("");
    setProfileInformation("");
    setShowAppointmentInfo("");
    setPatientInfo("");
    navigate("/Dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppInformation(appInfo);
    setProfileInformation(formState);
  };

  useEffect(() => {
    if (!successAddingBooking) {
      return;
    } else {
      const templateParams = {
        username: appInfo.username,
        email: appInfo.email,
        message: `Your appointment on ${appInfo.appointmentString} has been confirmed. Thank you.`,
      };
      sendEmail(templateParams);
      setFinalize(true);
      setTimeout(() => {
        setAppInformation("");
        setProfileInformation("");
        setShowAppointmentInfo("");
        setPatientInfo("");
        setFinalize(false);
        navigate("/Dashboard");
      }, 2500);
    }
  }, [successAddingBooking, navigate, appInfo]);

  useEffect(() => {
    if (!successAddingProfile) {
      return;
    } else {
      setAppInformation("");
      setProfileInformation("");
    }
  }, [successAddingProfile, navigate]);

  useEffect(() => {
    if (!profile && formState) {
      setPatientInfo(formState);
    } else {
      setPatientInfo(profile);
    }
  }, [formState, profile]);

  useEffect(() => {
    if (appInfo) {
      setShowAppointmentInfo(appInfo);
    }
  }, [appInfo]);

  if (errorAddingBooking) {
    return (
      <main className="container-fluid mt-5">
        <div className="card review-list card-appointment">
          <ErrorComponent message={errorAddingBooking} />
        </div>
      </main>
    );
  }
  if (errorAddingProfile) {
    return (
      <main className="container-fluid mt-5">
        <div className="card review-list card-appointment">
          <ErrorComponent message={errorAddingProfile} />
        </div>
      </main>
    );
  }

  return (
    <div
      className="container-fluid cont-review mt-5"
      style={{ margin: "auto", display: "flex", alignItems: "center" }}
    >
      {finalize ? (
        <div className="card bg-transparent" style={{ margin: "auto" }}>
          <Success message={successAddingBooking} />
        </div>
      ) : (
        <>
          <div className="card global-card card-app-review text-light">
            <div className="card-header app-review-header">
              <h5
                className="header-text bg-black text-light my-3 p-4"
                style={{ fontWeight: "300" }}
              >
                Please review your appointment information
              </h5>
            </div>
            <div className="card-body mt-4">
              <p className="app-review-t p-3 fs-4">Appointment details</p>
              {profile ? (
                <p className="app-review-p">
                  {profile?.patientfirstname} {profile?.patientlastname}
                </p>
              ) : (
                <p className="app-review-p">
                  {showPatientInfo?.patientfirstname}{" "}
                  {showPatientInfo?.patientlastname}
                </p>
              )}

              <p className="app-review-p p-3">
                {showAppointmentInfo.appointmentString}
              </p>
              <p className="app-review-t p-3 fs-4">Reason </p>
              <p className="app-review-p">{showAppointmentInfo.reason}</p>
              <br />

              {!profile ? (
                <>
                  <div className="app-review-t">
                    <p className="app-review-p p-3 fs-4">Contact</p>
                  </div>
                  <p className="app-review-p">
                    Email {showPatientInfo.email || appInfo.email}
                  </p>
                  <p className="app-review-p">
                    Phone number: {showPatientInfo?.patientnumber}
                  </p>
                  <br />
                  <div className="app-review-t">
                    <p className="app-review-p p-3 fs-4">Address </p>
                  </div>
                  <p className="app-review-p">
                    address: {showPatientInfo?.patientaddress}
                  </p>
                  <p className="app-review-p">
                    city: {showPatientInfo?.patientcity}{" "}
                  </p>
                  <p className="app-review-p">
                    state: {showPatientInfo?.patientState}{" "}
                  </p>
                  <p className="app-review-p">
                    zip: {showPatientInfo?.patientzip}{" "}
                  </p>
                </>
              ) : (
                <>
                  <div className="app-review-t">
                    <p className="app-review-p p-3 fs-4">Contact</p>
                  </div>
                  <p className="app-review-p">
                    Email {showPatientInfo.email || appInfo.email}
                  </p>
                  <p className="app-review-p">
                    Phone number: {showPatientInfo?.patientnumber}
                  </p>
                  <br />
                  <div className="app-review-t">
                    <p className="app-review-p p-3 fs-4">Address </p>
                  </div>
                  <p className="app-review-p">
                    address: {showPatientInfo.patientaddress}
                  </p>
                  <p className="app-review-p">
                    city: {showPatientInfo.patientcity}{" "}
                  </p>
                  <p className="app-review-p">
                    state: {showPatientInfo.patientState}{" "}
                  </p>
                  <p className="app-review-p">
                    zip: {showPatientInfo.patientzip}{" "}
                  </p>
                </>
              )}
            </div>
            <div className="row card-footer">
              <button
                className="col-lg-5 col-sm-12 btn btn-app-review bg-black m-3"
                type="button"
                onClick={handleSubmit}
                disabled={loadingAddBooking || addingProfileLoading}
              >
                {loadingAddBooking || addingProfileLoading ? (
                  <ButtonSpinner />
                ) : (
                  <>confirm</>
                )}
              </button>
              <button
                className="col-lg-5 col-sm-12 btn btn-app-review btn-secondary m-3"
                type="button"
                onClick={cancelApp}
              >
                cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default AppointmentReview;
