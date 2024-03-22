import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import ContactModal from "../ContactModal";

const BookingNav = ({ username, myReviews, email }) => {
  return (
    <div className="container-fluid bookingnav g-0">
      <div className="row mb-5">
        <div className="col-4 top-nav-item">
          <NavLink
            to="AppointmentHistory"
            className="dashboard-text text-white d-flex align-items-center"
            state={{ username, myReviews }}
          >
            History
          </NavLink>
        </div>
        <div className="col-4 top-nav-item">
          <NavLink
            to="ReviewHistory"
            className="dashboard-text text-white"
            state={{ username, myReviews }}
          >
            My reviews
          </NavLink>
        </div>
        <div className="col-4"
          style={{ display: "flex", justifyContent: "center" }}> 
        <ContactModal username={username} email={email} />
       </div>
      </div>
    </div>
  );
};
export default BookingNav;
