import { React } from "react";
import { NavLink } from "react-router-dom";
import ContactModal from "../ContactModal";
import authServiceInstance from "../../../utils/auth"
import "../DashboardNav/index.css"

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
      <div className="bookingnav media-nav-fixed">
        <ul
          className="p-0 m-0 text-light"
          style={{
            display: "flex",
            alignItems: "center",
            listStyleType: "none",
          }}
        >
          <li className="media-nav">
            <NavLink
              to="AppointmentHistory"
              className="dashboard-text text-white d-flex align-items-center mx-2"
            >
              history
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="MyReviews"
              className="dashboard-text text-white px-2"
            >
              reviews
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard/Book"
              className="dashboard-text text-white px-2"
            >
              book
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard"
              className="dashboard-text text-white px-2"
            >
              home
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard/About"
              className="dashboard-text text-white px-2"
            >
              about
            </NavLink>
          </li>
          <li className="media-nav">
            <NavLink
              to="/Dashboard/Profile"
              className="dashboard-text text-white px-2"
            >
              profile
            </NavLink>
          </li>
          <li className="media-nav">
            <ContactModal />
          </li>
          <li className="media-nav">
            <button
            style={{
              background: "transparent", fontWeight: "200", borderStyle: "none"
            }}
              to="/Dashboard/Profile"
              className="dashboard-text  text-white px-2"
              onClick={() => authServiceInstance.logout()}
            >
              logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default DashboardMediaNav;
