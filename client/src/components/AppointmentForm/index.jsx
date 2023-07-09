import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import {
  QUERY_BOOKINGDATES,
  QUERY_ME,
  QUERY_PETS,
  QUERY_PROFILES,
} from "../../utils/queries";
import { sendEmail } from "../../utils/email.js";
import { parseISO, setHours, setMinutes } from "date-fns";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import practitioner from "../../assets/images/practitioner.jpeg";
// import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );
  // console.log("start date", startDate);
  const [mepet, setMePet] = useState("");
  // const [appointmentDay, setAppointmentDay] = useState("");
  // const [appointmentMonth, setAppointmentMonth] = useState("");
  // const [appYear, setAppYear] = useState("");
  const [appTime, setAppTime] = useState("");
  // const [dateSuffixed, setDateSuffixed] = useState("");
  const [showPetName, setShowPetName] = useState("");
  const [petForm, setPetForm] = useState("");
  const [appointmentString, setAppointmentString] = useState("");
  const [digitalAppointment, setDigitalAppointment] = useState("");
  const [templateParams, setTemplateParams] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [finalize, setFinalize] = useState(false);
  // query data about user
  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const profile = me.profile;
  const username = me.username;
  const email = me.email;

  // query data about profiles
  const { data: profilesData, profileDataLoading } = useQuery(QUERY_PROFILES);
  const profiles = profilesData?.profiles || [];
  const myProfileInfo = profiles.filter(
    (profile) => profile.username === username
  );
  const userProfile = myProfileInfo[0];

  // query data about pets
  const { data: petsData, petsDataLoading } = useQuery(QUERY_PETS);
  const pets = petsData?.pets || [];
  const myPets = pets.filter((pet) => pet.username === username);
  // const petNames = myPets.map((myPets) => myPets.petName);
  const existingPet = pets.filter((petNames) => petNames.petName === petForm);

  // collecting all appointments that we push into [allAppointments] to block already taken dates in calendar.
  //  we use parsISO for supported format
  const { data, loading } = useQuery(QUERY_BOOKINGDATES);
  const bookingdates = data?.bookingdates || [];
  const allAppointments = [];
  for (let bookingdate of bookingdates) {
    const result = parseISO(bookingdate.startDate);
    allAppointments.push(result);
  }

  // Updating the cache with newly created appointment
  const [addBookingdate] = useMutation(ADD_BOOKINGDATE, {
    update(cache, { data: { addBookingdate } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { ...me, bookingdates: [...me.bookingdates, addBookingdate] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mepet") {
      setMePet(value);
      setShowPetName(value);
    }
    if (name === "petForm") {
      // Changing pet's name first letter to upper case
      const upperCase = value.charAt(0).toUpperCase();
      const toAdd = value.split("").slice(1).join("");
      const UpperCaseName = upperCase.concat("", toAdd);
      setPetForm(UpperCaseName);
    }
    if (name === "me") {
      setMePet(value);
      setShowPetName("");
      setPetForm("");
    }
    if (name === "reason") {
      setReason(value);
    }
  };

  const cancelApp = () => {
    setMePet("");
    setStartDate("");
    setReason("");
    setShowPetName("");
    setPetForm("");
    navigate("/Dashboard");
  };

  const confirmation = async () => {
    try {
      const { data } = await addBookingdate({
        variables: {
          username: username,
          startDate: startDate,
          digitalAppointment: digitalAppointment,
          appointmentString: appointmentString,
          reason: reason,
        },
      });
      if (data) {
        console.log(`success booking a date ${digitalAppointment}`);
      }
    } catch (err) {
      console.error(err);
    }
    sendEmail(templateParams);
    setFinalize(true);
    setTimeout(() => {
      navigate("/Dashboard");
    }, 3000);
  };
  // Format the time for friendly and clear reading
  const formatTime = (date) => {
    let hours =
      date.getHours() > 12 ? Math.floor(date.getHours() - 12) : date.getHours();
    // if hour is 0 (12:00am), change it to 12
    if (hours === 0) {
      hours = 12;
    }
    // set `am` or `pm`
    const periodOfDay = date.getHours() >= 12 ? "pm" : "am";

    let formattedTime;
    // formating time which misses a "0" in the minutes field when :00
    const minutes = date.getMinutes();
    minutes === 0
      ? (formattedTime = `${hours}:${minutes}0 ${periodOfDay}`)
      : (formattedTime = `${hours}:${minutes} ${periodOfDay}`);

    if ("09" < date.getHours() < "19") {
      console.log(date.getHours());
      console.log("office hours");
      console.log("formatted time", formattedTime);
      setAppTime(formattedTime);
    } else {
      console.log("office is closed");
      setError("Office is closed at this time...");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mepet || !reason || !startDate) {
      setError("All fields need filled!");
      return;
    }
    console.log("app time", appTime);
    // Updating [allAppointments] with new appointment
    const isBooked = JSON.stringify(startDate);
    const dateArr = isBooked.replaceAll('"', "").split(":");
    const finalDate = dateArr[0].slice(0, 10);
    const finalDateISO = parseISO(finalDate);
    allAppointments.push(finalDateISO);

    // fomating a short date called digitalAppointment which will be used later to compare past or future appointments
    const digitMonth = isBooked.slice(6, 8);
    const digitYear = isBooked.slice(1, 5);
    const digitDate = isBooked.slice(9, 11);
    const shortAppointment = `${digitMonth}/${digitDate}/${digitYear}`;
    setDigitalAppointment(shortAppointment);

    // formating user's appointment date for display in cards
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const appDay = day[startDate.getDay()];
    // setAppointmentDay(appDay);

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const appMonth = month[startDate.getMonth()];
    // setAppointmentMonth(appMonth);

    const year = startDate.getFullYear();
    // setAppYear(year.toString());

    // adding a suffixe to day's date ex: 1st, 2nd, 3rd or 4th... dateStr will exported to next component and dateSuffixed used for booking appointment data
    let dateStr = startDate.getDate().toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === "1" && dateStr !== "11") {
      dateStr = `${dateStr}st`;
      // setDateSuffixed(`${dateStr}st`);
    } else if (lastChar === "2" && dateStr !== "12") {
      dateStr = `${dateStr}nd`;
      // setDateSuffixed(`${dateStr}nd`);
    } else if (lastChar === "3" && dateStr !== "13") {
      dateStr = `${dateStr}rd`;
      // setDateSuffixed(`${dateStr}rd`);
    } else {
      dateStr = `${dateStr}th`;
      // setDateSuffixed(`${dateStr}th`);
    }

    // 'appString' for display appointment info in cards and confirmations
    const appString = `${appDay}, ${appMonth} ${dateStr}, ${year} at ${appTime}`;
    setAppointmentString(appString);

    // building appinfo object to pass appointment data to next components via useNavigate
    const appInfo = {
      username: username,
      email: email,
      startDate: startDate,
      digitalAppointment: shortAppointment,
      appointmentString: appString,
      reason: reason,
      mepet: mepet,
      profile: profile,
      petForm: petForm,
      myPets: myPets,
      appTime: appTime,
    };

    // conditionally redirecting the user to next operation based on if user or user's pet are returning patients
    if (mepet === "me" && !userProfile) {
      navigate("/ProfileForm", { state: { appInfo } });
      console.log("case 4");
    } else if (mepet === "me" && userProfile) {
      setConfirm(true);
      console.log("case 5");
    } else if (mepet === "mypet" && userProfile && !myPets) {
      navigate("/PetProfileForm", {
        state: { appInfo, petForm, existingPet },
      });
      console.log("case 2");
    } else if (
      mepet === "mypet" &&
      userProfile &&
      myPets &&
      existingPet.length
    ) {
      setConfirm(true);
      console.log("case 1");
    } else if (
      mepet === "mypet" &&
      userProfile &&
      myPets &&
      !existingPet.length
    ) {
      navigate("/PetProfileForm", {
        state: { appInfo, petForm, existingPet, myPets },
      });
      console.log("case 1bis");
    } else if (mepet === "mypet" && !userProfile) {
      navigate("/PetOwnerProfileForm", {
        state: { appInfo, petForm, existingPet },
      });
      console.log("case 3");
    }
    // 'confirm' gives user an opportunity to verify and correct info if needed bifore finalizing appointment booking
    setTemplateParams(appInfo);
    setConfirm(true);
  };

  if (loading || petsDataLoading || profileDataLoading) return <Spinner />;

  if (finalize === true) {
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

  if (confirm === true) {
    return (
      <div className="container mt-5">
        <div className="card appointment-review-card mt-5 mb-5">
          <div className="card-header bg-primary app-review-header pb-4 pt-4">
            <h4 className="header-text text-light mt-3 mb-3">
              Please review your appointment information
            </h4>
          </div>
          <div className="card-body mt-4">
            <p className="app-review-p text-primary">Appointment for:</p>
            {petForm ? (
              <p className="app-review-p"> {petForm}</p>
            ) : (
              <p className="app-review-p">
                {" "}
                {userProfile.patientfirstname} {userProfile.patientlastname}
              </p>
            )}
            <p className="app-review-p text-primary">On:</p>
            <p className="app-review-p">{appointmentString}</p>
            <p className="app-review-p text-primary">Reason:</p>
            <p className="app-review-p">{reason}</p>
            <br />
            <div className="app-review-t">
              <p className="app-review-p p-3 text-primary">Contact:</p>
            </div>
            <p className="app-review-p">Email {me.email}</p>
            <p className="app-review-p">
              Phone number: {userProfile.patientnumber}
            </p>
            <br />
            <div className="app-review-t">
              <p className="app-review-p p-3 text-primary">Address: </p>
            </div>
            <p className="app-review-p">
              address: {userProfile.patientaddress}
            </p>
            <p className="app-review-p">city: {userProfile.patientcity} </p>
            <p className="app-review-p">state: {userProfile.patientState} </p>
            <p className="app-review-p">zip: {userProfile.patientzip} </p>
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
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="goback-appointment d-flex justify-content-center">
        <Link to="/Dashboard">
          <button type="btn" className="btn-goback-appointment text-white">
            go back
          </button>
        </Link>
      </div>
      <div className="container-appointment">
        <div className="img-appointment" src={practitioner} alt="care">
          <div className="card-appointment">
            <h4 className="card-header-appointment text-primary mt-5 mb-4">
              Book your appointment
            </h4>
            <div className="card-body-appointment">
              <form id="appointment-form">
                <div className="row">
                  <div className="col-12 appointment-column">
                    <label className="form-label">
                      Who is the appointment for?
                    </label>
                  </div>
                  <div></div>
                  <div className="col-12 visit">
                    <div>
                      <input
                        className="radio m-2 ms-4"
                        type="radio"
                        name="mepet"
                        value="me"
                        checked={mepet === "me"}
                        onChange={handleChange}
                      />{" "}
                      me
                      <input
                        className="radio m-2 ms-4"
                        type="radio"
                        name="mepet"
                        value="mypet"
                        checked={mepet === "mypet"}
                        onChange={handleChange}
                      />{" "}
                      my pet
                    </div>
                  </div>
                  {showPetName === "mypet" ? (
                    <div className="col-12 appointment-column">
                      <div>
                        <label className="form-label">
                          What is your pet name
                        </label>
                        <input
                          className="form-control type-your-text mt-2 mb-2"
                          name="petForm"
                          value={petForm}
                          placeholder="name..."
                          type="text"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="col-12 date-picker">
                    <label className="form-label">
                      Choose your appointment date
                    </label>
                    <div className="choose-date mt-3 mb-2">
                      <DatePicker
                        id="user_date"
                        timeIntervals={15}
                        // set to today for past appointment demo purpose. Will be set to new Date + 1 in future.
                        minDate={new Date()}
                        excludeDates={allAppointments}
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          formatTime(date);
                        }}
                        showTimeSelect
                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 19)}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        withPortal
                        // footer={footer};
                      />
                    </div>
                  </div>
                  <div className="col-12 appointment-column">
                    <div>
                      <label className="form-label mb-3">
                        What is your reason for visiting?
                      </label>
                      <textarea
                        className="form-control type-your-text mt-4 mb-5"
                        name="reason"
                        value={reason}
                        type="text"
                        placeholder="type your text here..."
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <div className="app-error">
                      {error && (
                        <div className="bg-warning text-white mb-4">
                          <p className="appoitment-error m-2">{error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      className="btn btn-submitapp text-white mt-2 mb-4 rounded-0"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-container">
          <p className="text-app">
            sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
            falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
            lakjshfdaksdjhf aks dflakjshdflakjshdfkajs
            dfkajhskdfhaadfasdfasdfasdfasfdasdfs ksjdhf
          </p>
          <p className="text-app">
            1sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
            falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
            lakjshfdaksdjhf aks dflakjshdflakjshdfkajs dfkajhskdfha ksjdhf
          </p>
          <p className="text-app">
            2sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
            falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
            lakjshfdaksdjhf aks dflakjshdflakjshdfkajs dfkajhskdfha ksjdhf
          </p>
        </div>
      </div>
      <div className="footer-appointment">
        <Footer />
      </div>
    </>
  );
};

export default AppointmentForm;
