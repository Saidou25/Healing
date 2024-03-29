import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../utils/mutations";
import { Regex } from "../../utils/Regex";
import Navbar from "../Navbar";
import Footer from "../Footer";
import auth from "../../utils/auth";
import ButtonSpinner from "../ButtonSpinner";
import SelectUSState from "react-select-us-states";
import Success from "../Success";
import ErrorComponent from "../ErrorComponent";
import "react-phone-number-input/style.css";
import "./index.css";

const UpdateMyProfileForm = (props) => {
  const profileId = props.profileId;

  const navigate = useNavigate();
  const location = useLocation();

  const userProfile = location.state.userProfile;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorHook, setErrorHook] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [patientState, setNewValue] = useState(userProfile.patientState);
  const [patientnumber, setPatientNumber] = useState("");
  const [patientfirstname, setPatientFirstName] = useState(
    userProfile.patientfirstname
  );
  const [patientlastname, setPatientLastName] = useState(
    userProfile.patientlastname
  );
  const [patientaddress, setPatientAddress] = useState(
    userProfile.patientaddress
  );
  const [patientcity, setPatientCity] = useState(userProfile.patientcity);
  const [patientzip, setPatientZip] = useState(userProfile.patientzip);
  const [numberValue, setNumberValue] = useState("");

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleChange = () => {
    setError("");
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrorHook("");

    if (
      !patientfirstname ||
      !patientlastname ||
      !patientnumber ||
      !patientState ||
      !patientcity ||
      !patientaddress ||
      !patientzip ||
      !patientnumber
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }
    if (!Regex.zipRegex.test(patientzip) || !patientzip) {
      setError("zip code needs to be a five digit number!");
      setLoading(false);
      return;
    }
    if (!Regex.checkphone.test(numberValue) || !numberValue) {
      setError("Invalid phone format");
      setLoading(false);
      return;
    }
    if (!patientaddress || !patientlastname || !patientcity || !patientzip) {
      setError("All fields need to be filled!");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await updateProfile({
        variables: {
          id: profileId,
          patientlastname: patientlastname,
          patientfirstname: patientfirstname,
          patientaddress: patientaddress,
          patientnumber: patientnumber,
          patientcity: patientcity,
          patientzip: patientzip,
          patientState: patientState,
        },
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return;
    } finally {
      setShowSuccess(true);
      setLoading(false);
      setError("");
      setErrorHook("");
      setNewValue("");
      setPatientCity("");
      setPatientAddress("");
      setPatientZip("");
      setPatientNumber("");
      setPatientFirstName("");
      setPatientLastName("");
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/Profile");
      }, 2000);
    }
  };

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
        <div className="container-update py-5"
         style={{ display: "flex", alignItems: "center" }}
         >
          {!showSuccess && (
            <p className="mb-5 modify-media">
              Please modify the fields you would like to update with your new
              information.
            </p>
          )}
          <div className="card global-card bg-0 update-profile-card my-5"
           >
            {showSuccess ? (
              <Success message={"Profiles updated!"} />
            ) : (
              <div className="card bg-transparent p-4">
                <h4 className="card-header-update bg-black rounded-0 text-light p-4">
                  Update profile
                </h4>
                <div className="card-update">
                  <form className="profile-update">
                    <div className="row mt-5 text-light">
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label"> First name</label>
                        <input
                          className="form-control update-control"
                          onChange={(e) => {
                            setPatientFirstName(e.target.value);
                            handleChange();
                          }}
                          type="text"
                          value={patientfirstname}
                          name="patientfirstname"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label"> Last name</label>
                        <input
                          className="form-control update-control"
                          onChange={(e) => {
                            setPatientLastName(e.target.value);
                            handleChange();
                          }}
                          type="text"
                          value={patientlastname}
                          name="patientlastname"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label">Address</label>
                        <input
                          className="form-control"
                          value={patientaddress}
                          onChange={(e) => {
                            setPatientAddress(e.target.value);
                            handleChange();
                          }}
                          type="text"
                          name="patientaddress"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label">City</label>
                        <input
                          className="form-control"
                          value={patientcity}
                          type="text"
                          name="patientcity"
                          onChange={(e) => {
                            setPatientCity(e.target.value);
                            handleChange();
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label">Select a state</label>
                        <SelectUSState
                          id="myId"
                          className="myClassName"
                          onChange={(e) => {
                            setNewValue(e);
                            handleChange();
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label">zip code</label>
                        <input
                          className="form-control"
                          name="patientzip"
                          value={patientzip}
                          type="text"
                          onChange={(e) => {
                            setPatientZip(e.target.value);
                            handleChange();
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12 p-2">
                        <label className="form-label">Phone number</label>
                        <PatternFormat
                          className="phone-update"
                          format="(###) ### ####"
                          allowEmptyFormatting
                          mask="_"
                          name="patientnumber"
                          onValueChange={(values, sourceInfo) => {
                            setPatientNumber(values.formattedValue);
                            setNumberValue(values.value);
                            handleChange();
                          }}
                        />
                      </div>
                      <br />
                      {error && <ErrorComponent message={error} />}
                      <div className="col-12">
                        <button
                          className="btn btn-update bg-black rounded-0"
                          type="submit"
                          disabled={loading}
                          onClick={(e) => handleSubmit(e)}
                        >
                          {loading ? <ButtonSpinner /> : <>Submit</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      <Footer />
    </>
  );
};

export default UpdateMyProfileForm;
