import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./index.css";

const Footer = () => {
  return (
    <main className="main-footer">
      <div className="row footer bg-primary text-white">
        <div className="col-12 d-flex justify-content-center text-footer">
          <FaEnvelope className="icon m-2" />
          healing@healing.com
        </div>
        <div className="col-12 d-flex justify-content-center number mb-2">
          <FaPhone className="icon m-2" />
          +1 (123) 456 7891
        </div>
        <br />
      </div>
    </main>
  );
};

export default Footer;
