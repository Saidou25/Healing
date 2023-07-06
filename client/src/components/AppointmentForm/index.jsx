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
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [mepet, setMePet] = useState("");
  const [appointmentDay, setAppointmentDay] = useState("");
  const [appointmentMonth, setAppointmentMonth] = useState("");
  const [appYear, setAppYear] = useState("");
  const [appTime, setAppTime] = useState("");
  const [dateSuffixed, setDateSuffixed] = useState("");
  const [showPetName, setShowPetName] = useState("");
  const [petForm, setPetForm] = useState("");
  const [appointmentString, setAppointmentString] = useState("");
  const [digitalAppointment, setDigitalAppointment] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [finalize, setFinalize] = useState(false);

  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const profile = me.profile;
  const username = me.username;
  const email = me.email;

  const { data: profilesData, profileDataLoading } = useQuery(QUERY_PROFILES);
  const profiles = profilesData?.profiles || [];
  const myProfileInfo = profiles.filter(
    (profile) => profile.username === username
  );
  const userProfile = myProfileInfo[0];

  const { data, loading } = useQuery(QUERY_BOOKINGDATES);

  const { data: petsData, petsDataLoading } = useQuery(QUERY_PETS);
  const pets = petsData?.pets || [];
  const myPets = pets.filter((pet) => pet.username === username);
  const petNames = myPets.map((myPets) => myPets.petName);
  const existingPet = pets.filter((petNames) => petNames.petName === petForm);

  // collecting all appointments that we push into [allAppointments] to block already taken dates in calendar.
  //  we use parsISO for supported format
  const bookingdates = data?.bookingdates || [];
  const allAppointments = [];
  for (let bookingdate of bookingdates) {
    const result = parseISO(bookingdate.startDate);
    allAppointments.push(result);
  }

  // building templateParams for emailing appointment confirmation
  const templateParams = {
    digitalAppointment: digitalAppointment,
    username: username,
    email: email,
    appTime: appTime,
    profile: profile,
    myPets: myPets,
    petForm: petForm,
  };

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

      console.log(`success booking a date ${digitalAppointment}`);
    } catch (err) {
      console.error(err);
    }
    sendEmail(templateParams);
    setFinalize(true);
    setTimeout(() => {
      navigate("/Dashboard");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mepet || !reason || !startDate) {
      setError("All fields need filled!");
      return;
    }

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
    setAppointmentDay(appDay);

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
    setAppointmentMonth(appMonth);

    const year = startDate.getFullYear();
    setAppYear(year.toString());

    // formating time which misses a "0"
    let time;
    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();

    if (minutes === 0) {
      time = `${hours}:${minutes}0`;
      setAppTime(time);
    } else {
      time = `${hours}:${minutes}`;
      setAppTime(`${hours}:${minutes}`);
    }

    // adding a suffixe to day's date ex: 1st, 2nd, 3rd or 4th...

    let dateStr = startDate.getDate().toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === "1" && dateStr !== "11") {
      dateStr = `${dateStr}st`;
      setDateSuffixed(`${dateStr}st`);
    } else if (lastChar === "2" && dateStr !== "12") {
      dateStr = `${dateStr}nd`;
      setDateSuffixed(`${dateStr}nd`);
    } else if (lastChar === "3" && dateStr !== "13") {
      dateStr = `${dateStr}rd`;
      setDateSuffixed(`${dateStr}rd`);
    } else {
      dateStr = `${dateStr}th`;
      setDateSuffixed(`${dateStr}th`);
    }
    const appString = `${appDay}, ${appMonth} ${dateStr}, ${year} at ${time}`;
    setAppointmentString(appString);

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
    };

    if (mepet === "me" && !userProfile) {
      navigate("/ProfileForm", { state: { appInfo, templateParams } });
      console.log("case 4");
    } else if (mepet === "me" && userProfile) {
      setConfirm(true);
      console.log("case 5");
    } else if (mepet === "mypet" && userProfile && !myPets) {
      navigate("/PetProfileForm", {
        state: { appInfo, petForm, existingPet, templateParams },
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
        state: { appInfo, petForm, existingPet, myPets, templateParams },
      });
      console.log("case 1bis");
    } else if (mepet === "mypet" && !userProfile) {
      navigate("/PetOwnerProfileForm", {
        state: { appInfo, petForm, existingPet, templateParams },
      });
      console.log("case 3");
    }
    setConfirm(true);
  };

  if (loading) return <Spinner />;

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
            <p className="app-review-p">
              {appointmentDay}, {appointmentMonth} {dateSuffixed}, {appYear} at{" "}
              {appTime}
            </p>
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
      <Navbar />
      <div className="container-appointment">
        <h4 className="card-header-appointment bg-primary rounded-0 text-light p-4 mt-4 mb-5">
          Book your appointment
        </h4>
        <div className="card-body">
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
                    <label className="form-label mb-4">
                      What is your pet name
                    </label>
                    <input
                      className="form-control type-your-text mt-4 mb-5"
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
              <div className="col-12 date-picker mb-2">
                <label className="form-label">
                  Choose your appointment date
                </label>
                <div className="choose-date mt-5 mb-3">
                  <DatePicker
                    id="user_date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                    maxTime={setHours(setMinutes(new Date(), 0), 19)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    excludeDates={allAppointments}
                    // footer={footer};
                  />
                </div>
              </div>
              <div className="col-12 appointment-column">
                <div>
                  <label className="form-label mb-4">
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
                {error && (
                  <div className="bg-danger text-white mb-4">
                    <p className="appoitment-error m-2">{error}</p>
                  </div>
                )}
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="btn btn-primary mt-4 rounded-0"
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
      <Footer />
    </>
  );
};

export default AppointmentForm;
