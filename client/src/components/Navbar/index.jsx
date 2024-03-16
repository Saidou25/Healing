import React from "react";
import { NavLink } from "react-router-dom";
import SideMenu from "../SideMenu";
import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileIcon.png";
import "./index.css";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  
  if (Auth.loggedIn()) {
    return (
      <main className="main-nav">
        <div className="bg-img">
          <nav className="row">
            <div className="col-12 d-flex justify-content-end">
              <SideMenu />
            </div>
            <div className="one">
              <div className="landing-title">
                <NavLink className="landing" to="/">
                  Healing
                </NavLink>
              </div>
              <ul className="nav d-flex">
                <li>
                  <NavLink to="/About" className="nav-item show-hide fs-3">
                    about
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Dashboard" className="nav-item show-hide fs-3">
                    dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Book"
                    className="nav-item show-hide fs-3"
                  >
                    book
                  </NavLink>
                </li>
                <li>
                  <button
                    className="btt-logout show-hide fs-3"
                    onClick={logout}
                  >
                    logout
                  </button>
                </li>
                <li>
                  <NavLink
                    className="profile-icon nav-item show-hide fs-3"
                    to="/UserProfile"
                  >
                    <img src={profileIcon} alt="profile icon" height={43} />
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </main>
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
              <NavLink className="landing" to="/">
                Healing
              </NavLink>
            </div>
            <ul className="nav d-flex p-2">
              <li>
                <NavLink to="/About" className="nav-item show-hide fs-3">
                  About
                </NavLink>
              </li>

              <li>
                {" "}
                <NavLink to="/Visit" className="nav-item show-hide fs-3">
                  Visit
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/Login" className="nav-item show-hide fs-3">
                  login
                </NavLink>
              </li>
              <li>
                <NavLink to="/Signup" className="nav-item show-hide fs-3">
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
