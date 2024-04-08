import React from "react";
import "./Success.css";

const Success = ({ message }) => {
  return (
    <div className="success-background">
      <div className="row py-4">
        <div className="col-12 d-flex appointment-success">
          <i className="fa-solid fa-check d-flex"></i>
        </div>
        <h3 className="col-12 signup-success d-flex justify-content-center py-3">
          Success!
        </h3>
        <p
        style={{ padding: "2%", textAlign: "center" }}>{message}</p>
      </div>
    </div>
  );
};
export default Success;
