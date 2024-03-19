import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate, useLocation } from "react-router-dom";
import { Regex } from "../../../utils/Regex.js";
import SelectUSState from "react-select-us-states";
import "react-phone-number-input/style.css";
import "./index.css";

const ProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [patientState, setNewValue] = useState("");
  const [patientnumber, setPatientNumber] = useState("");
  const [patientgender, setPatientGender] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
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

    if (!Regex.ageRegex.test(formState.birthdate)) {
      setError(
        "Age in needs to be a number with the following format: MM/DD/YYYY !"
      );
      return;
    }
    if (!Regex.zipRegex.test(formState.patientzip)) {
      setError("zip code needs to be a five digit number!");
      return;
    }
   
    setError("");
    navigate("/Book/AppointmentReview", {
      state: { formState: formState, appInfo: appInfo },
    });
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="card-appointment">
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
                    value={formState.birthdate}
                    onChange={(e) => handleChange(e)}
                    placeholder="MM/DD/YYYY..."
                  />
                </div>
                <div className="col-lg-6 col-sm-12 p-2">
                  <label className="form-label1"> First name</label>
                  <input
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
                  <label className="form-label1"> Last name</label>
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
                  <label className="form-label1">Address</label>
                  <input
                    className="form-control"
                    value={formState.patientaddress}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    name="patientaddress"
                    placeholder="address..."
                  />
                </div>
                <div className="col-lg-6 col-sm-12 p-2">
                  <label className="form-label1">City</label>
                  <input
                    className="form-control"
                    value={formState.patientcity}
                    type="text"
                    name="patientcity"
                    onChange={(e) => handleChange(e)}
                    placeholder="enter city..."
                  />
                </div>
                <div className="col-lg-6 col-sm-12 p-2">
                  <label className="form-label1">Select a state</label>
                  <SelectUSState
                    id="myId"
                    className="myClassName"
                    name="patientstate"
                    onChange={setNewValue}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 p-2">
                  <label className="form-label1">Zip code</label>
                  <input
                    className="form-control"
                    name="patientzip"
                    value={formState.patientzip}
                    onChange={(e) => handleChange(e)}
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
                        setFormState({
                          ...formState,
                          patientnumber: values.formattedValue,
                        });
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
                  <button
                    className="btn button-profile btn-primary rounded-0"
                    onClick={(e) => handleFormSubmit(e)}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
export default ProfileForm;
