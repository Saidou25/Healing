import React from "react";
import { NavLink } from "react-router-dom";
import authServiceInstance from "../../utils/auth";
import "./index.css";

const LandingPage = () => {
  return (
    <>
      <div className="landing-title">
        <NavLink className="landing text-light" to="/">
          Healing
        </NavLink>
      </div>
      <div className="row landing-row py-5">
        <div className="col-12 landing-column">
          <NavLink to="/Login" className="landing-item-hilight">
            Login
          </NavLink>
        </div>
        <div className="col-12 landing-column mt-4">
          <NavLink to="/Signup" className="landing-item-hilight">
            Signup
          </NavLink>
        </div>
        <div className="col-12 landing-column mt-4">
          <NavLink
            to={authServiceInstance.loggedIn() ? "/Dashboard" : "/About"}
            className="landing-item-hilight"
          >
            Site
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
