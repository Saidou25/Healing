import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Outlet, useNavigate } from "react-router-dom";
import { QUERY_BOOKINGDATES, QUERY_ME } from "../../../utils/queries.js";
import { parseISO, setHours, setMinutes } from "date-fns";
import { formatTime } from "../../../utils/dateUtil.js";
import { chooseStartDate } from "../../../utils/chooseStartDate.js";
import Footer from "../../../components/Footer/index.jsx";
import BookingForm from "../BookingForm.jsx";
import practitioner from "../../../assets/images/practitioner.jpeg";
// import SideText from "../SideText.jsx";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../../components/Navbar/index.jsx";
import "./index.css";

const Book = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );

  const [templateParams, setTemplateParams] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [showNavNav, setShowNavNav] = useState(true);
  // const [showCorrect, setShowCorrect] = useState(false);

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
    if (name === "reason") {
      setReason(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason || !startDate) {
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
      profile: profile,
      appTime: appTime,
    };


    // conditionally redirecting the user to next operation based on if user is a returning patient
    if (!profile) {
      setShowNavNav(false);
      // setShowCorrect(true);
      navigate("ProfileForm", { state: { appInfo } });
    } else {
      setShowNavNav(false);
      navigate("AppointmentReview", {
        state: {
          appInfo,
          templateParams,
          me,
          appString,
          reason,
          profile
          // loading,
        },
      });
    }  
    // 'confirm' gives user an opportunity to verify and correct info if needed bifore finalizing appointment booking
    setTemplateParams(appInfo);
  };

  return (
    <>
      <Navbar />
      <>
        <div className="container-appointment p-5">
          <div className="img-appointment" src={practitioner} alt="care">
            {showNavNav ? (
              <BookingForm
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
          {/* <SideText /> */}
        </div>
      </>
      <div className="footer-appointment">
        <Footer />
      </div>
    </>
  );
};

export default Book;
