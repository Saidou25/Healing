import React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";
import useMonitorWidth from "../../pages/Dashboard/useMonitorWidth";
import "./index.css";

const Navbar = () => {
  const { showDashboardMediaNav } = useMonitorWidth();

  const logout = () => {
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <>
        {showDashboardMediaNav ? null : (
          <nav className="d-flex title-nav-logged">
            <div className="healing-title g-0">
              <NavLink className="landing land-navi text-light" to="/">
                Healing
              </NavLink>
            </div>
            <ul className="nav d-flex p-2">
              <li>
                <NavLink
                  to="/About"
                  className="nav-item show-hide fs-3 text-light"
                >
                  about
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Book"
                  className="nav-item show-hide fs-3 text-light"
                >
                  book
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Dashboard"
                  className="nav-item show-hide fs-3 text-light"
                >
                  dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-item show-hide fs-3 text-light bg-transparent"
                  onClick={logout}
                >
                  logout
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="profile-icon nav-item show-hide fs-3"
                  to="/Profile"
                >
                  profile
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </>
    );
  }

  return (
    // <div className="main-nav">
      <nav className="d-flex title-nav">
        <div className="landing-title g-0">
          <NavLink className="landing text-light" to="/">
            Healing
          </NavLink>
        </div>
        <ul className="nav d-flex p-2">
          <li>
            <NavLink to="/About" className="nav-item text-light show-hide fs-3">
              about
            </NavLink>
          </li>
          <li>
            <NavLink to="/Login" className="nav-item text-light show-hide fs-3">
              login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Signup"
              className="nav-item text-light show-hide fs-3"
            >
              signup
            </NavLink>
          </li>
        </ul>
      </nav>
    // </div>
  );
};

export default Navbar;
