import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Regex } from "../../../utils/Regex.js";
import SelectUSState from "react-select-us-states";
import auth from "../../../utils/auth.js";
import ErrorComponent from "../../../components/ErrorComponent.jsx";
import ButtonSpinner from "../../../components/ButtonSpinner/index.jsx";
import useMonitorWidth from "../../../pages/Dashboard/useMonitorWidth.js";
import Button from "../../../components/Button.jsx";
import "react-phone-number-input/style.css";
import "./index.css";

const ProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { showDashboardMediaNav } = useMonitorWidth();

  const appInfo = location.state.appInfo;

  const [formState, setFormState] = useState({
    username: appInfo.username,
    patientemail: appInfo.email,
    patientState: "",
    patientnumber: "",
    patientfirstname: "",
    patientgender: "",
    patientaddress: "",
    patientlastname: "",
    patientcity: "",
    birthdate: "",
    patientzip: "",
  });
  const [loading, setLoading] = useState(false);
  const [patientState, setNewValue] = useState("");
  const [patientnumber, setPatientNumber] = useState("");
  const [patientgender, setPatientGender] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setLoading(false);
    const { name, value } = e.target;
    // making sure first letter of first name and last name are capital letters
    if (name === "patientfirstname") {
      setFormState({
        ...formState,
        patientfirstname: value.charAt(0).toUpperCase() + value.slice(1),
      });
    }
    if (name === "patientlastname") {
      setFormState({
        ...formState,
        patientlastname: value.charAt(0).toUpperCase() + value.slice(1),
      });
    }

    setFormState({
      ...formState,
      [name]: value,
      patientState: patientState,
      patientgender: patientgender,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!Regex.ageRegex.test(formState.birthdate)) {
      setError(
        "Age in needs to be a number with the following format: MM/DD/YYYY !"
      );
      setLoading(false);
      return;
    }

    if (!Regex.zipRegex.test(formState.patientzip)) {
      setError("zip code needs to be a five digits number!");
      setLoading(false);
      return;
    }
    if (
      !formState.username ||
      !formState.patientemail ||
      !formState.patientState ||
      // !formState.patientnumber ||
      !formState.patientfirstname ||
      !formState.patientgender ||
      !formState.patientaddress ||
      !formState.patientlastname ||
      !formState.patientcity ||
      !formState.birthdate ||
      !formState.patientzip
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }
    setError("");
    navigate("/Book/AppointmentReview", {
      state: { formState: formState, appInfo: appInfo },
    });
  };

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <main>
        <div
          className={
            showDashboardMediaNav
              ? "create-profile-container py-5"
              : "profile-container py-5"
          }
        >
          <div className="card global-card card-app-review mt-5">
            <div className="card-header app-review-header">
              <h4 className="card-header-update bg-black rounded-0 p-4">
                Create your profile
              </h4>
              <form className="bg-transparent">
                <div className="row mt-5">
                  <div className="col-lg-12 col-sm-12 gender-label">
                    <label className="p-1">Gender</label>
                  </div>
                  <br />
                  <div className="col-lg-12 col-sm-12 genre my-3">
                    <div style={{ display: "flex" }}>
                      <input
                        className="radio mx-2 my-0"
                        type="radio"
                        name="patientgender"
                        value="male"
                        checked={patientgender === "male"}
                        onChange={(e) => setPatientGender(e.target.value)}
                      />
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        male
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        className="radio mx-2 my-0"
                        type="radio"
                        name="patientgender"
                        value="female"
                        checked={patientgender === "female"}
                        onChange={(e) => setPatientGender(e.target.value)}
                      />
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        female
                      </span>
                    </div>
                  </div>
                  <br />
                  <div htmlFor="birth-date" className="col-lg-6 col-sm-12 p-2">
                    <label className="label-label">Age</label>
                    <br />
                    <input
                      id="birth-date"
                      className="age"
                      type="text"
                      name="birthdate"
                      value={formState.birthdate}
                      onChange={(e) => handleChange(e)}
                      placeholder="MM/DD/YYYY..."
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="firstname" className="label-label">
                      First name
                    </label>
                    <br />
                    <input
                      id="firstname"
                      className="form-control"
                      type="text"
                      value={formState.patientfirstname}
                      name="patientfirstname"
                      placeholder="first name..."
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="lastname" className="label-label">
                      Last name
                    </label>
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      name="patientlastname"
                      value={formState.patientlastname}
                      placeholder="last name..."
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="address" className="label-label">
                      Address
                    </label>
                    <br />
                    <input
                      id="address"
                      className="form-control"
                      value={formState.patientaddress}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="patientaddress"
                      placeholder="address..."
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="city" className="label-label">
                      City
                    </label>{" "}
                    <br />
                    <input
                      id="city"
                      className="form-control"
                      value={formState.patientcity}
                      type="text"
                      name="patientcity"
                      onChange={(e) => handleChange(e)}
                      placeholder="enter city..."
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="myId" className="label-label">
                      Select a state
                    </label>{" "}
                    <br />
                    <SelectUSState
                      id="myId"
                      className="myClassName"
                      name="patientstate"
                      onChange={setNewValue}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="zip" className="label-label">
                      Zip code
                    </label>{" "}
                    <br />
                    <input
                      id="zip"
                      className="form-control"
                      name="patientzip"
                      value={formState.patientzip}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      placeholder="zip code..."
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2">
                    <label htmlFor="phone" className="label-label">
                      Phone number
                    </label>{" "}
                    <br />
                    <div>
                      <PatternFormat
                        id="phone"
                        className="phone-update mb-5"
                        format="(###) ### ####"
                        allowEmptyFormatting
                        mask="_"
                        name="patientnumber"
                        onValueChange={(values, sourceappInfo) => {
                          setPatientNumber(values.formattedValue);
                          setError("");
                          setFormState({
                            ...formState,
                            patientnumber: values.formattedValue,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="col-lg-12 col-sm-12 d-flex justify-content-center mb-4">
                    {error && <ErrorComponent message={error} />}
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2 d-flex justify-content-center">
                    <Button
                      className="btn button-profile bg-black text-light"
                      onClick={(e) => handleFormSubmit(e)}
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        fontWeight: "200",
                        letterSpacing: "2px",
                      }}
                    >
                      {loading ? <ButtonSpinner /> : <>Submit</>}
                    </Button>
                  </div>
                  <div className="col-lg-6 col-sm-12 p-2 d-flex justify-content-center">
                    <Button
                      className="btn button-profile bg-transparent"
                      onClick={(e) => {
                        setFormState(
                          {
                            username: appInfo.username,
                            patientemail: appInfo.email,
                            patientState: "",
                            patientnumber: "",
                            patientfirstname: "",
                            patientgender: "",
                            patientaddress: "",
                            patientlastname: "",
                            patientcity: "",
                            birthdate: "",
                            patientzip: "",
                          },
                          setLoading(false),
                          setError(""),
                          setPatientGender(""),
                          setPatientNumber(""),
                          setNewValue(""),
                          navigate("/Dashboard")
                        );
                      }}
                      type="button"
                      style={{
                        width: "100%",
                        fontWeight: "200",
                        letterSpacing: "2px",
                      }}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ProfileForm;
