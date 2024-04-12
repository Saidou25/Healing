import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import auth from "../../utils/auth";
import logo from "../../assets/images/github-white.png";
import "./index.css";

const Footer = () => {
  return (
    <footer className="main-footer mt-5">
      <div
        className={
          auth.loggedIn()
            ? "row loggedInFooter bg-black text-white pb-3"
            : "row footer bg-black text-white mb-3"
        }
      >
        <div className="col-12 col-footer text-footer">
          <FaEnvelope className="icon m-2" />
          healing@demo.com
        </div>
        <div className="col-12 col-footer number">
          <FaPhone className="icon m-2" />
          +1 (123) 456 7891
        </div>
        <div className="container-fluid d-flex justify-content-center mt-2">
          <a className="minicat" href="https://github.com/Saidou25/Healing">
            <img src={logo} className="github" alt="minicat"></img>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
