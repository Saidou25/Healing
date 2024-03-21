import React from "react";
import { NavLink } from "react-router-dom";

import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileIcon.png";
import SideMenu from "../../components/SideMenu";
// import "./index.css";

const BookingNav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("logout success!");
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <main className="container-fluid g-0">
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
                <NavLink to="/About" className="nav-item show-hide fs-3">
                  about
                </NavLink>
                <NavLink to="/Dashboard" className="nav-item show-hide fs-3">
                  dashboard
                </NavLink>
                <NavLink to="/Book" className="nav-item show-hide fs-3">
                  book
                </NavLink>
                <button className="btt-logout show-hide fs-3" onClick={logout}>
                  logout
                </button>
                <NavLink
                  className="profile-icon nav-item show-hide fs-3"
                  to="/Profile"
                >
                  <img src={profileIcon} alt="profile icon" height={43} />
                </NavLink>
              </ul>
            </div>
          </nav>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="main-nav">
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
              <NavLink to="/About" className="nav-item show-hide text-light fs-3">
                About
              </NavLink>
              <NavLink to="/Book" className="nav-item show-hide text-light fs-3">
                book
              </NavLink>
              <NavLink to="/Login" className="nav-item show-hide  text-light fs-3">
                login
              </NavLink>
              <NavLink to="/Signup" className="nav-item show-hide text-light fs-3">
                signup
              </NavLink>
            </ul>
          </div>
        </nav>
      </main>
    </>
  );
};

export default BookingNav;
