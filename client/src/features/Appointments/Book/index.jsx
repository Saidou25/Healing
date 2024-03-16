import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Outlet, useNavigate } from "react-router-dom";
import { QUERY_BOOKINGDATES, QUERY_ME, QUERY_PETS } from "../../../utils/queries.js";
// import { useUser } from "../../../context/userContext.jsx";
import { parseISO, setHours, setMinutes } from "date-fns";
import { formatTime } from "../../../utils/dateUtil.js";
import { chooseStartDate } from "../../../utils/chooseStartDate.js";
import Footer from "../../../components/Footer/index.jsx";
import BookingForm from "../BookingForm.jsx";
import BookingNav from "../BookingNav.jsx";
import practitioner from "../../../assets/images/practitioner.jpeg";
import SideText from "../SideText.jsx";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const Book = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );
  // const [me, setMe] = useState("");
  const [mepet, setMePet] = useState("");
  const [showPetName, setShowPetName] = useState("");
  const [petForm, setPetForm] = useState("");
  const [templateParams, setTemplateParams] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [showNavNav, setShowNavNav] = useState(true);
  const [showCorrect, setShowCorrect] = useState(false);

  // const { me } = useUser();
  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
 
  const { appTime } = formatTime(startDate);
  const { finalDateISO, digitalAppointment, appString } = chooseStartDate(
    startDate,
    appTime
  );

  const profile = me.profile;

  const username = me.username;
  const email = me.email;
  const myPets = me.profile?.pets;

  // query data about pets
  const { data: petsData } = useQuery(QUERY_PETS);
  const pets = petsData?.pets || [];
  const existingPet = pets.filter((petNames) => petNames.petName === petForm);

  // collecting all appointments that we push into [allAppointments] to block already taken dates in calendar.
  //  we use parsISO for supported format
  const { data: bookingdatesData } = useQuery(QUERY_BOOKINGDATES);

  const allAppointments = useMemo(() => [], []);

  useEffect(() => {
    const bookingdates = bookingdatesData?.bookingdates || [];

    if (!bookingdates) {
      return;
    } else {
      for (let bookingdate of bookingdates) {
        const result = parseISO(bookingdate.startDate);
        allAppointments.push(result);
      }
    }
  }, [bookingdatesData, allAppointments]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mepet || !reason || !startDate) {
      setError("All fields need filled!");
      return;
    }
    allAppointments.push(finalDateISO);

    // building appinfo object to pass appointment data to next components via useNavigate
    let appInfo = {
      username: username,
      email: email,
      startDate: startDate,
      digitalAppointment: digitalAppointment,
      appointmentString: appString,
      reason: reason,
      mepet: mepet,
      profile: profile,
      petForm: petForm,
      myPets: myPets,
      appTime: appTime,
    };


    // conditionally redirecting the user to next operation based on if user or user's pet are returning patients
    if (mepet === "me" && !profile) {
      console.log("appInfo from Book", appInfo);

      setShowNavNav(false);
      setShowCorrect(true);
      navigate("ProfileForm", { state: { appInfo } });
    } else if (mepet === "me" && profile) {
      setShowNavNav(false);
      navigate("AppointmentReview", {
        state: {
          appInfo,
          templateParams,
          me,
          petForm,
          appString,
          reason,
          mepet,
          profile
          // loading,
        },
      });
    } else if (mepet === "mypet" && profile && !myPets) {
      navigate("/PetProfileForm", {
        state: { appInfo, petForm, existingPet },
      });
    } else if (mepet === "mypet" && profile && myPets && existingPet.length) {
    } else if (mepet === "mypet" && profile && myPets && !existingPet.length) {
      navigate("/PetProfileForm", {
        state: { appInfo, petForm, existingPet, myPets },
      });
    } else if (mepet === "mypet" && !profile) {
      navigate("/PetOwnerProfileForm", {
        state: { appInfo, petForm, existingPet },
      });
    }
    // 'confirm' gives user an opportunity to verify and correct info if needed bifore finalizing appointment booking
    setTemplateParams(appInfo);
  };

  return (
    <>
      <BookingNav />
      <>
        <div className="container-appointment">
          <div className="img-appointment" src={practitioner} alt="care">
            {showNavNav ? (
              <BookingForm
                mepet={mepet}
                petForm={petForm}
                showPetName={showPetName}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formatTime={formatTime}
                setStartDate={setStartDate}
                allAppointments={allAppointments}
                startDate={startDate}
                reason={reason}
                error={error}
                showNavNav={showNavNav}
                me={me}
              />
            ) : (
              <>
                <Outlet />
              </>
            )}
          </div>
          <SideText />
        </div>
      </>
      <div className="footer-appointment">
        <Footer />
      </div>
    </>
  );
};

export default Book;
