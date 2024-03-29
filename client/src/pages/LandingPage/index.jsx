import React from "react";
import { NavLink } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import "./index.css";

const LandingPage = () => {
  return (
    <div className="mainlandingpage">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <SideMenu />
        </div>
      </div>
      <div className="landing-title">
        <NavLink className="col-12 landing text-light" to="/">
          Healing
        </NavLink>
      </div>
      <div className="row landing-row py-5">
        <div className="col-12 landing-column">
          <NavLink to="/Login" className="landing-item-hilight"
          >
            Login
          </NavLink>
        </div>
        <div className="col-12 landing-column mt-4">
          <NavLink to="/Signup" className="landing-item-hilight">
            Signup
          </NavLink>
        </div>
        <div className="col-12 landing-column mt-4">
          <NavLink to="/About" className="landing-item-hilight">
            Site
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
