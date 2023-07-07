import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../assets/images/github-white.png";
import "./index.css";

const Footer = () => {
  return (
    <main className="main-footer">
      <div className="row footer bg-primary text-white">
        <div className="col-12 col-footer text-footer">
          <FaEnvelope className="icon m-2" />
          healing@demo.com
        </div>
        <div className="col-12 col-footer number">
          <FaPhone className="icon m-2" />
          +1 (123) 456 7891
        </div>
        <div className="col-12 col-footer mt-2 mb-4">
          <a href="https://github.com/Saidou25/Healing">
            <img src={logo} className="github" alt="minicat"></img>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Footer;
