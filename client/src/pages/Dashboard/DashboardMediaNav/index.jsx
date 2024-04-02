import { React } from "react";
import ContactModal from "../ContactModal";
import { NavLink } from "react-router-dom";

const DashboardMediaNav = () => {
  return (
    <>
      <div className="healing-title my-4">
        <NavLink
          className="landing text-light"
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Healing
        </NavLink>
      </div>
      <div className="bookingnav">
        <ul
          className="my-ul p-0"
          style={{
            display: "flex",
            alignItems: "center",
            listStyleType: "none",
          }}
        >
          <li className="media-nav">
            <NavLink
              to="AppointmentHistory"
              className="dashboard-text  text-white d-flex align-items-center mx-2"
            >
              history
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="ReviewHistory"
              className="dashboard-text text-white px-2"
            >
              reviews
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard/Book"
              className="dashboard-text  text-white px-2"
            >
              book
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard"
              className="dashboard-text  text-white px-2"
            >
              dashboard
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard/About"
              className="dashboard-text  text-white px-2"
            >
              about
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard/profile"
              className="dashboard-text  text-white px-2"
            >
              profile
            </NavLink>
          </li>
          <li className="media-nav">
            <ContactModal />
          </li>
        </ul>
      </div>
    </>
  );
};
export default DashboardMediaNav;
