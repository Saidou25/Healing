import React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";
import "./index.css";

const SideMenu = () => {
  const logout = () => {
    Auth.logout();
  };

  return (
    <main className="side-menu show">
      <div>
        <NavLink
          className="btn btn-side"
          height={43}
          data-bs-toggle="offcanvas"
          to="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
        >
          <i className="fa-solid fa-bars text-light fs-2"></i>
        </NavLink>
      </div>
      <div
        className="offcanvas offcanvas-start bg-primary"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header text-white">
          <NavLink className="landing-title-side text-white" to="/">
            Healing
          </NavLink>
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="row offcanvas-body">
          <div className="col-6 col-top d-flex align-items-center">
            <h5
              className="offcanvas-title text-white fs-2"
              id="offcanvasExampleLabel"
            >
              Menu
            </h5>
          </div>
          {Auth.loggedIn() && (
            <div className="col-6 col-top">
              <NavLink
                className="profile-icon-side d-flex justify-content-end align-items-center mb-2 p-3"
                to="/UserProfile"
              >
                {/* <img src={profileIcon} alt="profile icon" height={43} /> */}
                profile
              </NavLink>
            </div>
          )}
        </div>
        <div className="scroll">
          <div className="row row-items">
            <nav className="nav side-nav">
              <ul className="nav links-side">
                <li className="col-12 col-items mt-4 pb-4">
                  <NavLink className="nav-item-side fs-3" to="/About">
                    about
                  </NavLink>
                </li>
                {Auth.loggedIn() && (
                  <>
                    <li className="col-12 col-items mt-4 pb-4">
                      <NavLink className="nav-item-side fs-3" to="/Book">
                        book
                      </NavLink>
                    </li>
                    <li className="col-12 col-items mt-4 pb-4">
                      <NavLink className="nav-item-side fs-3" to="/Dashboard">
                        dashboard
                      </NavLink>
                    </li>
                    <li className="col-12 col-items mt-4 pb-4">
                      <NavLink className="nav-item-side fs-3" to="/Profile">
                        profile
                      </NavLink>
                    </li>
                  </>
                )}
                {Auth.loggedIn() ? (
                  <li className="col-12 col-items mt-4 pb-4">
                    <NavLink
                      className="btn-logout nav-item-side fs-3"
                      to="/"
                      onClick={logout}
                    >
                      logout
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li className="col-12 col-items mt-4 pb-4">
                      <NavLink
                        className="btn-logout nav-item-side fs-3"
                        to="/Login"
                      >
                        login
                      </NavLink>
                    </li>
                    <li className="col-12 col-items mt-4 pb-4">
                      <NavLink
                        className="btn-logout nav-item-side fs-3"
                        to="/Signup"
                      >
                        signup
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SideMenu;
