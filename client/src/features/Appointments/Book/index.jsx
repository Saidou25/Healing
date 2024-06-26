import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { QUERY_BOOKINGDATES, QUERY_ME } from "../../../utils/queries.js";
import { parseISO, setHours, setMinutes } from "date-fns";
import { formatTime } from "../../../utils/dateUtil.js";
import { chooseStartDate } from "../../../utils/chooseStartDate.js";
import auth from "../../../utils/auth.js";
import Footer from "../../../components/Footer/index.jsx";
import BookingForm from "../BookingForm.jsx";
import Navbar from "../../../components/Navbar/index.jsx";
import useMonitorWidth from "../../../pages/Dashboard/useMonitorWidth.js";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const Book = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );

  const [error, setError] = useState("");
  const [errorHook, setErrorHook] = useState("");
  const [loading, setLoading] = useState(false);
  const [templateParams, setTemplateParams] = useState("");
  const [reason, setReason] = useState("");
  const [showNavNav, setShowNavNav] = useState(true);

  const { showDashboardMediaNav } = useMonitorWidth();

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
    setError("");
    setErrorHook("");
    setLoading(false);

    const { name, value } = e.target;

    if (name === "reason") {
      setReason(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!reason || !startDate) {
      setError("All are required!");
      setLoading(false);
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
      setLoading(false);
      navigate("ProfileForm", { state: { appInfo } });
    } else {
      setShowNavNav(false);
      setLoading(false);
      showDashboardMediaNav && !profile
        ? navigate("/Dashboard/Book/AppointmentReview", {
            state: {
              appInfo,
              templateParams,
              me,
              appString,
              reason,
              profile,
              // loading,
            },
          })
        : navigate("AppointmentReview", {
            state: {
              appInfo,
              templateParams,
              me,
              appString,
              reason,
              profile,
              // loading,
            },
          });
    }
    // 'confirm' gives user an opportunity to verify and correct info if needed bifore finalizing appointment booking
    setTemplateParams(appInfo);
  };

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="media">
      {showDashboardMediaNav ? null : <Navbar />}
      <>
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
      </>
      <div
        className={
          window.location.pathname.includes("/Book/ProfileForm")
            ? ""
            : "footer-appointment-book"
        }
      >
        {showDashboardMediaNav ? null : <Footer />}
       
      </div>
    </div>
  );
};

export default Book;
