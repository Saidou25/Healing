import React, { useEffect, useState } from "react";
import { useUser } from "../../context.js/userContext";

import Spinner from "../../components/Spinner";
import AllReviews from "../../features/Reviews/AllReviews";
import ReviewForm from "../../features/Reviews/ReviewForm";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UpcomingAppointments from "../../features/Appointments/UpcomingAppointments";
import auth from "../../utils/auth";
import { Outlet } from "react-router-dom";
import BookingNav from "../../components/Booking";
import "./index.css";

const Dashboard = () => {
  const [isShown, setIsShown] = useState(false);
  const [myAppointments, setMyAppointments] = useState("");
  const [futureAppointments, setFutureAppointments] = useState("");

  const { me, loading } = useUser();
  const username = me.username;

  useEffect(() => {
    if (me) {
      setMyAppointments(me.bookingdates);
    }
  }, [me]);

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

  if (loading) return <Spinner />;
  if (auth.loggedIn()) {
    return (
      <>
        <Navbar />
        <BookingNav />
        <main className="dashboard-main">
          <Outlet />
          <div className="row row-width">
            <div className="col-lg-8 col-sm-10">
              <UpcomingAppointments
                futureAppointments={futureAppointments}
                today={today}
              />
            </div>
            {futureAppointments?.length ? (
              <div className="col-lg-4 col-sm-12 mt-5 mb-5 right-window dashb-border">
                <div className="card suggestion p-3">
                  <br />
                  <h4 className="note mb-2">Notes</h4>
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
            <div className="col-lg-4 col-sm-12 right-window dashb-border">
              <h3 className="write-review-title mt-4">Write a review</h3>
              <button
                type="button"
                className="btn col-12 d-flex btn-primary rounded-0 justify-content-center mt-5 mb-5"
                onClick={() => handleSubmit("review")}
              >
                start/close
              </button>
              {isShown ? (
                <ReviewForm username={username} today={today} />
              ) : null}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
};

export default Dashboard;
