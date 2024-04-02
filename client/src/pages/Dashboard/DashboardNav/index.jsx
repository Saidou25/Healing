import React from "react";
import { NavLink } from "react-router-dom";
import ContactModal from "../ContactModal";
import "./index.css";

const DashboardNav = ({ username, myReviews, email }) => {
  return (
    <>
      <div className="container-fluid bookingnav1 g-0">
        <div className="row mb-5">
          <div className="col-4 top-nav-item">
            <NavLink
              to="AppointmentHistory"
              className="dashboard-text text-white d-flex align-items-center"
              state={{ username, myReviews }}
            >
              history
            </NavLink>
          </div>
          <div className="col-4 top-nav-item">
            <NavLink
              to="ReviewHistory"
              className="dashboard-text text-white"
              state={{ username, myReviews }}
            >
              my reviews
            </NavLink>
          </div>
          <div
            className="col-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ContactModal username={username} email={email} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardNav;
