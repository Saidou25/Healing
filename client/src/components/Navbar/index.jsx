import React from "react";
import { NavLink } from "react-router-dom";
import SideMenu from "../SideMenu";
import Auth from "../../utils/auth";
// import profileIcon from "../../assets/images/profileIcon.png";

import "./index.css";
import useMonitorWidth from "../../pages/Dashboard/useMonitorWidth";

const Navbar = () => {
  const { showDashboardMediaNav } = useMonitorWidth();

  const logout = () => {
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <>
        {showDashboardMediaNav ? null : (
          <main className="main-nav ">
            <div className="bg-img">
              <nav className="row g-0">
                <div className="one">
                  <div className="healing-title">
                    <NavLink className="landing text-light p-5 m-5" to="/">
                      Healing
                    </NavLink>
                  </div>
                  <ul className="nav d-flex">
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
                        {/* <img src={profileIcon} alt="profile icon" height={43} /> */}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </main>
        )}
      </>
    );
  }

  return (
    <main className="main-nav">
      <div className="bg-img">
        <nav className="row">
          <div className="col-12 d-flex justify-content-end">
            <SideMenu />
          </div>
          <div className="one">
            <div className="landing-title">
              <NavLink className="landing text-light" to="/">
                Healing
              </NavLink>
            </div>
            <ul className="nav d-flex p-2">
              <li>
                <NavLink
                  to="/About"
                  className="nav-item text-light show-hide fs-3"
                >
                  about
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/Login"
                  className="nav-item text-light show-hide fs-3"
                >
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
          </div>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
