import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner";
import AllReviews from "../../features/Reviews/AllReviews";
import ReviewForm from "../../features/Reviews/ReviewForm";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UpcomingAppointments from "../../features/Appointments/UpcomingAppointments";
import auth from "../../utils/auth";
import DashboardNav from "./DashboardNav";
import DashboardMediaNav from "./DashboardMediaNav";
import useMonitorWidth from "./useMonitorWidth";
import "./index.css";

const Dashboard = () => {
  const [me, setMe] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [myAppointments, setMyAppointments] = useState("");
  const [futureAppointments, setFutureAppointments] = useState("");
  const [mediaNav, setMediaNav] = useState(false);

  const scrollDemoRef = useRef(null);

  const { data: meData, loading } = useQuery(QUERY_ME);
  const username = me.username;

  const { showDashboardMediaNav, vw } = useMonitorWidth();

  const date = new Date();
  const todaysDate = date.getDate();
  const todaysYear = date.getFullYear();
  const todaysMonth = date.getMonth() + 1;
  const todaysMonthStr = todaysMonth.toString();
  const todaysDateStr = todaysDate.toString();

  // building today's date string to compare with myAppointments and figure out past and upcoming ones
  let newMonth;
  let newDay;

  if (todaysMonthStr.length === 1) {
    newMonth = `0${todaysMonth}`;
  } else {
    newMonth = todaysMonth;
  }
  if (todaysDateStr.length === 1) {
    newDay = `0${todaysDate}`;
  } else {
    newDay = todaysDate;
  }

  const today = `${newMonth}/${newDay}/${todaysYear}`;

  const handleScroll = () => {
    if (scrollDemoRef?.current) {
      const { scrollTop } = scrollDemoRef.current;
      // setScrollPosition({ scrollTop });
      if (scrollTop >= 124) {
        setMediaNav(true);
      }
    } else {
      setMediaNav(false);
    }
  };

  useEffect(() => {
    if (myAppointments) {
      const myFutureAppointments = myAppointments?.filter(
        (bookingdate) => bookingdate.digitalAppointment > today
      );

      setFutureAppointments(myFutureAppointments);
    }
  }, [myAppointments, today]);

  const handleSubmit = (e) => {
    if (e === "review") {
      setIsShown((current) => !current);
    }
  };

  useEffect(() => {
    if (meData) {
      const myData = meData?.me || [];
      setMe(myData);
      setMyAppointments(myData.bookingdates);
    }
  }, [meData]);

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  if (loading) {
    return <Spinner />;
  }

  if (auth.loggedIn()) {
    return (
      <div
        className={auth.loggedIn() ? "logged" : "media-login"}
        ref={scrollDemoRef}
        onScroll={handleScroll}
        style={{
          minHeight: "100vh",
          width: "100vw",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Navbar />
        {showDashboardMediaNav ? <DashboardMediaNav /> : <DashboardNav />}
        <div className="dashboard-main">
          <div className="pt-5">
            <Outlet />
          </div>
          <div className="row review-row mt-4">
            <div className="col-lg-8 col-sm-10">
              <UpcomingAppointments
                futureAppointments={futureAppointments}
                today={today}
              />
            </div>
            {futureAppointments?.length ? (
              <div className="col-lg-4 col-sm-12 my-5 right-window dashb-border py-0">
                <div className="card suggestion p-3 text-light">
                  <br />
                  <h4 className="note mb-2" style={{ fontWeight: "200" }}>
                    Notes
                  </h4>
                  <br />
                  <p>
                    We suggest arriving 15 minutes prior to your appointment.{" "}
                    <br />
                  </p>
                  <p>
                    Use direct message to provide additional information about
                    your upcoming visit. <br />
                  </p>
                  <p>
                    For appointment cancelation please provide a 48 hours
                    notice. Book a new appointment if you would like to
                    reschedule.
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="row review-row mt-4">
            <div className="col-lg-8 col-sm-12">
              <AllReviews />
            </div>
            <div className="col-lg-4 col-sm-12 right-window dashb-border mb-5">
              <div className="row top-box">
                <div className="col-12">
                  <h3
                    className="write-review-title pt-5 text-light"
                    style={{ fontWeight: "200" }}
                  >
                    Write a review
                  </h3>
                </div>
                <div className="col-12 d-flex justify-content-center p-2">
                  <button
                    type="button"
                    className="btn m-4 col-12 review-button d-flex bg-black rounded-0 justify-content-center "
                    onClick={() => handleSubmit("review")}
                  >
                    start/close
                  </button>
                </div>
              </div>
              {isShown ? (
                <ReviewForm username={username} today={today} />
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Dashboard;
